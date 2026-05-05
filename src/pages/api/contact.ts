import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// Basic sanitization to prevent HTML injection in emails
const sanitize = (str: string) =>
  str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests (form submission)
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Extract form data from request body
  const { name, email, phone, message } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Email format validation (basic regex check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  // Get email credentials from environment variables
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  // Safety check for missing env variables
  if (!emailUser || !emailPass) {
    console.error("Missing EMAIL_USER or EMAIL_PASS");
    return res.status(500).json({ message: "Email config missing" });
  }

  // Create SMTP transporter using Gmail
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // false for port 587 (TLS)
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  // Sanitize user inputs to prevent HTML injection
  const safeName = sanitize(name);
  const safeEmail = sanitize(email);
  const safePhone = sanitize(phone);
  const safeMessage = sanitize(message);

  try {
    // ===========================
    // 1. EMAIL TO YOUR COMPANY
    // ===========================
    await transporter.sendMail({
      from: `"Spherehead Website" <${emailUser}>`, // Must remain your email to prevent spoofing bans
      to: emailUser, // Receive in company inbox
      replyTo: safeEmail, // Clicking 'Reply' in Gmail will reply to the customer
      subject: `Contact Message from ${safeName} | Spherehead.tech`,
      html: `
        <h3>Contact Message</h3>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Message:</strong> ${safeMessage}</p>
      `,
    });

    // ===========================
    // 2. AUTO REPLY TO USER
    // ===========================
    await transporter.sendMail({
      from: `"Spherehead Technologies" <${emailUser}>`,
      to: safeEmail, // send confirmation to user
      subject: "We received your message",
      html: `
        <p>Hi ${safeName},</p>

        <p>Thank you for reaching out to Spherehead Technologies.</p>

        <p>We’ve received your message and our team will get back to you shortly.</p>

        <br/>

        <p>Best regards,<br/>Spherehead Team</p>
      `,
    });

    // Success response
    return res.status(200).json({ success: true });
  } catch (error) {
    // Log real error for debugging (server side only)
    console.error("Email sending failed:", error);

    // Safe error response for frontend
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
}