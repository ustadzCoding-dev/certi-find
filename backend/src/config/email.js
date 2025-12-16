const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
    // If no SMTP credentials, return null (skip email sending)
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log('⚠️ Email service not configured. Emails will be skipped.');
        return null;
    }

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

const transporter = createTransporter();

module.exports = transporter;
