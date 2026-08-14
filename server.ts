import express from "express";
import path from "path";
import cors from "cors";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";
import 'dotenv/config';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

  app.use(cors({
    origin: (origin, callback) => {
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Origem não permitida pelo CORS'));
    }
  }));

  // Rate Limiting (Simple In-Memory)
  const rateLimitWindowMs = parseInt(process.env.CONTACT_FORM_RATE_LIMIT_WINDOW_MINUTES || '10') * 60 * 1000;
  const maxRequests = parseInt(process.env.CONTACT_FORM_RATE_LIMIT_MAX_REQUESTS || '5');
  const ipRequests = new Map<string, { count: number, resetTime: number }>();

  const checkRateLimit = (ip: string) => {
    const now = Date.now();
    const record = ipRequests.get(ip);

    if (!record || now > record.resetTime) {
      ipRequests.set(ip, { count: 1, resetTime: now + rateLimitWindowMs });
      return true;
    }

    if (record.count < maxRequests) {
      record.count += 1;
      return true;
    }

    return false;
  };

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/manifest.json", (req, res) => {
    res.json({
      name: process.env.VITE_COMPANY_NAME || "Consult Services Tecnologia",
      short_name: process.env.VITE_PUBLIC_APP_SHORT_NAME || "Consult",
      description: process.env.VITE_COMPANY_DESCRIPTION || "Tecnologia, processos, integrações, automações e IA aplicada a negócios.",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: process.env.VITE_COMPANY_PRIMARY_COLOR || "#003B73",
      icons: [
        {
          src: process.env.VITE_COMPANY_ICON_URL || "/icons/icon-192.png",
          sizes: "192x192 512x512",
          type: "image/png"
        }
      ]
    });
  });

  app.get("/api/vcard", (req, res) => {
    const vcfFileName = process.env.VCF_FILE_NAME || "contato.vcf";
    const fullName = process.env.VCF_FULL_NAME || "";
    const lastName = process.env.VCF_LAST_NAME || "";
    const firstName = process.env.VCF_FIRST_NAME || "";
    const org = process.env.VCF_ORG || "";
    const title = process.env.VCF_TITLE || "";
    const phone = process.env.VCF_PHONE || "";
    const whatsapp = process.env.VCF_WHATSAPP || "";
    const email = process.env.VCF_EMAIL || "";
    const site = process.env.VCF_SITE || "";
    const linkedin = process.env.VCF_LINKEDIN || "";
    const github = process.env.VCF_GITHUB || "";
    const instagram = process.env.VCF_INSTAGRAM || "";

    const vcard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${fullName}
ORG:${org}
TITLE:${title}
TEL;TYPE=CELL,VOICE:${phone}
TEL;TYPE=CELL,WHATSAPP:${whatsapp}
EMAIL:${email}
URL:${site}
URL;TYPE=LinkedIn:${linkedin}
${github ? `URL;TYPE=GitHub:${github}\n` : ''}${instagram ? `URL;TYPE=Instagram:${instagram}\n` : ''}END:VCARD`;

    res.setHeader('Content-Type', 'text/vcard; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${vcfFileName}"`);
    res.send(vcard);
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
      if (!checkRateLimit(clientIp)) {
         res.status(429).json({ error: "Muitas requisições. Tente novamente mais tarde." });
         return;
      }

      const { name, email, phone, company, interest, message, website } = req.body;

      // Honeypot check
      if (website) {
        res.status(400).json({ error: "Spam detectado." });
        return;
      }

      if (!name || !email || !message) {
         res.status(400).json({ error: "Nome, e-mail e mensagem são obrigatórios." });
         return;
      }

      const maxLength = parseInt(process.env.CONTACT_FORM_MAX_MESSAGE_LENGTH || '2000');
      if (message.length > maxLength) {
        res.status(400).json({ error: `A mensagem excedeu o limite de ${maxLength} caracteres.` });
        return;
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const appUrl = process.env.APP_URL || process.env.VITE_PUBLIC_APP_URL || 'App URL not set';

      const mailOptions = {
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
        to: process.env.CONTACT_RECEIVER_EMAIL,
        cc: process.env.CONTACT_COPY_EMAIL || undefined,
        subject: `Novo contato pelo cartão digital - ${process.env.COMPANY_NAME || process.env.VITE_COMPANY_NAME || 'Consult Services Tecnologia'}`,
        text: `
Você recebeu uma nova mensagem pelo cartão digital.

Nome: ${name}
E-mail: ${email}
Telefone: ${phone || '-'}
Empresa: ${company || '-'}
Interesse: ${interest || '-'}

Mensagem:
${message}

Origem:
${appUrl}
        `,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Mensagem enviada com sucesso." });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Não foi possível enviar sua mensagem agora. Tente novamente ou fale pelo WhatsApp." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
