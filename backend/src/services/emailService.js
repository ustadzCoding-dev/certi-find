const transporter = require('../config/email');

// Send email helper
const sendEmail = async (to, subject, html) => {
    // Skip if email not configured
    if (!transporter) {
        console.log(`📧 Email skipped (not configured): ${subject} -> ${to}`);
        return null;
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`📧 Email sent: ${subject} -> ${to}`);
        return info;
    } catch (error) {
        console.error(`❌ Email error: ${error.message}`);
        return null;
    }
};

// Welcome email template
const sendWelcomeEmail = async (user) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; background-color: #0f0f23; color: #ffffff; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .logo { font-size: 24px; font-weight: bold; color: #7c3aed; }
        .content { background: #1a1a2e; border-radius: 12px; padding: 30px; margin: 20px 0; }
        .button { display: inline-block; background: linear-gradient(135deg, #7c3aed, #3b82f6); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; padding: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🎓 CertiFind</div>
        </div>
        <div class="content">
          <h2>Welcome to CertiFind, ${user.name}! 🎉</h2>
          <p>Thank you for joining our platform. You now have access to our curated collection of free certifications from top providers like Google, IBM, Meta, and more.</p>
          <p>Start exploring certifications that match your interest in <strong>${user.interestField}</strong>.</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/catalog" class="button">Browse Certifications</a>
          </p>
          <p>Happy learning!</p>
          <p>— The CertiFind Team</p>
        </div>
        <div class="footer">
          <p>© 2024 CertiFind. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

    return sendEmail(user.email, 'Welcome to CertiFind! 🎓', html);
};

// Bookmark confirmation email
const sendBookmarkEmail = async (user, certification) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; background-color: #0f0f23; color: #ffffff; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .logo { font-size: 24px; font-weight: bold; color: #7c3aed; }
        .content { background: #1a1a2e; border-radius: 12px; padding: 30px; margin: 20px 0; }
        .cert-card { background: #16162a; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 20px; margin: 20px 0; }
        .button { display: inline-block; background: linear-gradient(135deg, #7c3aed, #3b82f6); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; padding: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🎓 CertiFind</div>
        </div>
        <div class="content">
          <h2>Certification Saved! 🔖</h2>
          <p>Hi ${user.name}, you've added a new certification to your bookmarks:</p>
          <div class="cert-card">
            <h3 style="margin: 0 0 10px 0; color: #7c3aed;">${certification.title}</h3>
            <p style="margin: 5px 0; color: #9ca3af;">Provider: ${certification.provider}</p>
            <p style="margin: 5px 0; color: #9ca3af;">Level: ${certification.level} • Duration: ${certification.duration}</p>
          </div>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/certification/${certification._id}" class="button">View Certification</a>
          </p>
        </div>
        <div class="footer">
          <p>© 2024 CertiFind. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

    return sendEmail(user.email, `Certification Saved: ${certification.title}`, html);
};

// Admin notification for new user
const sendAdminNewUserEmail = async (adminEmail, newUser) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; background-color: #0f0f23; color: #ffffff; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .logo { font-size: 24px; font-weight: bold; color: #7c3aed; }
        .content { background: #1a1a2e; border-radius: 12px; padding: 30px; margin: 20px 0; }
        .user-info { background: #16162a; border-radius: 8px; padding: 15px; margin: 15px 0; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; padding: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🎓 CertiFind Admin</div>
        </div>
        <div class="content">
          <h2>New User Registered! 👤</h2>
          <p>A new user has registered on CertiFind:</p>
          <div class="user-info">
            <p><strong>Name:</strong> ${newUser.name}</p>
            <p><strong>Email:</strong> ${newUser.email}</p>
            <p><strong>Interest:</strong> ${newUser.interestField}</p>
            <p><strong>Registered:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
        <div class="footer">
          <p>CertiFind Admin Notification</p>
        </div>
      </div>
    </body>
    </html>
  `;

    return sendEmail(adminEmail, 'New User Registration - CertiFind', html);
};

module.exports = {
    sendEmail,
    sendWelcomeEmail,
    sendBookmarkEmail,
    sendAdminNewUserEmail,
};
