import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  const vcfFileName = process.env.VCF_FILE_NAME || 'contato.vcf';
  const fullName = process.env.VCF_FULL_NAME || '';
  const lastName = process.env.VCF_LAST_NAME || '';
  const firstName = process.env.VCF_FIRST_NAME || '';
  const org = process.env.VCF_ORG || '';
  const title = process.env.VCF_TITLE || '';
  const phone = process.env.VCF_PHONE || '';
  const whatsapp = process.env.VCF_WHATSAPP || '';
  const email = process.env.VCF_EMAIL || '';
  const site = process.env.VCF_SITE || '';
  const linkedin = process.env.VCF_LINKEDIN || '';
  const github = process.env.VCF_GITHUB || '';
  const instagram = process.env.VCF_INSTAGRAM || '';

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
  return res.status(200).send(vcard);
}
