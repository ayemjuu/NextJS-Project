// import bcrypt from "bcryptjs";
// import nodemailer from "nodemailer";

// export async function hashOTP(otp: string) {
//   return bcrypt.hash(otp, 10);
// }

// export async function compareOTP(otp: string, hash: string) {
//   return bcrypt.compare(otp, hash);
// }

// export function generateOTP(): string {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: false,
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS,
//   },
// });

import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT || 587),
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function sendInviteEmail(to: string, token: string) {
  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/register?token=${token}`;

  const mailOptions = {
    from: `"Coffee Shop Inventory" <${process.env.SMTP_USER}>`,
    to,
    subject: "You're invited to join Coffee Shop Inventory",
    html: `
      <p>Hello,</p>
      <p>You have been invited to join the Coffee Shop Inventory Management System.</p>
      <p>Click the link below to accept the invite and set up your account:</p>
      <a href="${inviteUrl}">${inviteUrl}</a>
      <p>This invite expires in 7 days.</p>
      <p>Thanks!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendResetPasswordEmail(to: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/resetPassword?token=${token}`;

  const mailOptions = {
    from: `"Coffee Shop Inventory" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Reset your password",
    html: `
      <p>Hello,</p>

      <p>We received a request to reset your password.</p>

      <p>Click the link below to set a new password:</p>

      <p>
        <a href="${resetUrl}">${resetUrl}</a>
      </p>

      <p>This link will expire in <strong>30 minutes</strong>.</p>

      <p>If you didn’t request this, you can safely ignore this email.</p>

      <br />
      <p>— Coffee Shop Inventory Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
