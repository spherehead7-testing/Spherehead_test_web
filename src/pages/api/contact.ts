import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Spherehead Website" <sphereheadtechnologies@gmail.com>`,
      to: "sphereheadtechnologies@gmail.com",
      replyTo: email,
      subject: "New Contact Form Submission",
      html: `
    <h3>New Message</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Message:</strong> ${message}</p>
  `,
    });

    await transporter.sendMail({
      from: `"Spherehead Technologies" <sphereheadtechnologies@gmail.com>`,
      to: email,
      subject: "We received your message",
      html: `
    <p>Hi ${name},</p>

    <p>Thank you for reaching out to Spherehead Technologies.</p>

    <p>We’ve received your message and our team will get back to you shortly.</p>

    <br/>

    <p>Best regards,<br/>Spherehead Team</p>
  `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
}
