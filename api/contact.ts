import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const ipRequests = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string) {
  const windowMinutes = parseInt(process.env.CONTACT_FORM_RATE_LIMIT_WINDOW_MINUTES || '10');
  const maxRequests = parseInt(process.env.CONTACT_FORM_RATE_LIMIT_MAX_REQUESTS || '5');
  const windowMs = windowMinutes * 60 * 1000;

  const now = Date.now();
  const record = ipRequests.get(ip);

  if (!record || now > record.resetTime) {
    ipRequests.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count < maxRequests) {
    record.count += 1;
    return true;
  }

  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Ou defina a origem correta
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  try {
    const clientIp =
      req.headers['x-forwarded-for']?.toString().split(',')[0] ||
      req.socket.remoteAddress ||
      'unknown';

    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        error: 'Muitas requisições. Tente novamente mais tarde.',
      });
    }

    const { name, email, phone, company, interest, message, website } = req.body || {};

    if (website) {
      return res.status(400).json({ error: 'Spam detectado.' });
    }

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Nome, e-mail e mensagem são obrigatórios.',
      });
    }

    const maxLength = parseInt(process.env.CONTACT_FORM_MAX_MESSAGE_LENGTH || '2000');
    if (String(message).length > maxLength) {
      return res.status(400).json({
        error: `A mensagem excedeu o limite de ${maxLength} caracteres.`,
      });
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

    const appUrl = process.env.APP_URL || process.env.VITE_PUBLIC_APP_URL || '';

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      cc: process.env.CONTACT_COPY_EMAIL || undefined,
      subject: `Novo contato pelo cartão digital - ${
        process.env.COMPANY_NAME || process.env.VITE_COMPANY_NAME || 'Consult Services Tecnologia'
      }`,
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
    });

    return res.status(200).json({
      success: true,
      message: 'Mensagem enviada com sucesso.',
    });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);

    return res.status(500).json({
      error: 'Não foi possível enviar sua mensagem agora. Tente novamente ou fale pelo WhatsApp.',
    });
  }
}
