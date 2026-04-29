import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendConfirmationEmail(email: string, token: string) {
  const appUrl = process.env.APP_URL || "http://localhost:3000";
  const verifyUrl = `${appUrl}/api/waitlist/verify?token=${token}`;

  const html = `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background-color: #f5fbf5; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="color: #006948; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; margin: 0;">PulseRelay</h1>
      </div>
      <div style="background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 8px; padding: 32px 24px;">
        <h2 style="color: #171d19; font-size: 20px; font-weight: 600; margin: 0 0 16px;">Confirm your email</h2>
        <p style="color: #3d4a42; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
          Thanks for signing up for the PulseRelay waiting list! Click the button below to confirm your email address and secure your spot.
        </p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${verifyUrl}" style="background-color: #006948; color: #ffffff; display: inline-block; font-size: 15px; font-weight: 600; padding: 12px 32px; border-radius: 4px; text-decoration: none;">
            Confirm my email
          </a>
        </div>
        <p style="color: #6d7a72; font-size: 13px; line-height: 1.5; margin: 24px 0 0;">
          If the button doesn't work, copy and paste this link into your browser:<br/>
          <a href="${verifyUrl}" style="color: #006948; word-break: break-all;">${verifyUrl}</a>
        </p>
      </div>
      <p style="color: #6d7a72; font-size: 12px; text-align: center; margin: 24px 0 0;">
        &copy; 2024 PulseRelay Systems. All rights reserved.
      </p>
    </div>
  `;

  const text = `
PulseRelay - Confirm your email

Thanks for signing up for the PulseRelay waiting list!

Click the link below to confirm your email address:
${verifyUrl}

If you didn't sign up, you can safely ignore this email.

© 2024 PulseRelay Systems. All rights reserved.
  `.trim();

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || '"PulseRelay" <noreply@pulserelay.com>',
    to: email,
    subject: "Confirm your email — PulseRelay Waiting List",
    html,
    text,
  });
}