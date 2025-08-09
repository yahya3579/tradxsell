const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // smtp.gmail.com for Gmail
  port: process.env.EMAIL_PORT, // 465 (SSL) or 587 (TLS)
  secure: process.env.EMAIL_PORT == 465, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendMail({ to, subject, text, html, attachments }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
    attachments: attachments || [],
  };
  return transporter.sendMail(mailOptions);
}

module.exports = sendMail;