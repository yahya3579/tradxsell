const nodemailer = require('nodemailer');

// Prefer real SMTP if creds are present; else fall back to Mailtrap; else Ethereal
async function createTransporter() {
  try {
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT || 587),
        secure: Number(process.env.EMAIL_PORT) === 465,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
        tls: { rejectUnauthorized: false },
      });
      await transporter.verify();
      console.log('SMTP transporter ready (EMAIL_HOST)');
      return transporter;
    }

    if (process.env.MAILTRAP_USER && process.env.MAILTRAP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io',
        port: Number(process.env.MAILTRAP_PORT || 2525),
        auth: { user: process.env.MAILTRAP_USER, pass: process.env.MAILTRAP_PASSWORD },
      });
      await transporter.verify();
      console.log('Mailtrap transporter ready');
      return transporter;
    }

    // Ethereal test account (emails go to ethereal inbox preview)
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
    await transporter.verify();
    console.log('Ethereal transporter ready:', testAccount.user);
    return transporter;
  } catch (err) {
    console.error('Failed to initialize email transporter:', err);
    throw err;
  }
}

let transporterPromise = createTransporter();

module.exports = {
  transporter: {
    sendMail: async (options) => {
      const transporter = await transporterPromise;
      const info = await transporter.sendMail(options);
      if (nodemailer.getTestMessageUrl && nodemailer.getTestMessageUrl(info)) {
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      }
      return info;
    },
    verify: async () => {
      const transporter = await transporterPromise;
      return transporter.verify();
    }
  }
};



// const Sib = require('sib-api-v3-sdk');

// // Initialize Brevo client
// const client = Sib.ApiClient.instance;
// const apiKey = client.authentications['api-key'];
// apiKey.apiKey = process.env.BREVO_API_KEY;

// // Create transactional email instance
// const transactionalEmailApi = new Sib.TransactionalEmailsApi();

// module.exports = { transactionalEmailApi };
