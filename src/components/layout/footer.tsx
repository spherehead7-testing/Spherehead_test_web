"use client";

import { useState } from "react";
import RotatingDots from "../ui/rotating-dots";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  // 🔹 STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 SUBMIT HANDLER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent!");

        // 🔹 Reset form
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        alert("Failed to send");
      }
    } catch (err) {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0b2a5b] to-[#2f5fb3] flex items-start">
      <div className="max-w-[1400px] mx-auto w-full px-12 grid grid-cols-2 gap-20 pt-16">
        {/* LEFT SIDE */}
        <div className="text-white flex flex-col justify-between h-[85vh]">
          {/* TOP CONTENT */}
          <div className="mb-5">
            <div className="text-[40px] leading-[1.1]">
              <div>Let’s Build Something</div>

              <div className="flex items-center gap-2">
                <span>Awesome together</span>

                <div className="translate-x-2 translate-y-2">
                  <RotatingDots />
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div>
            <div className="flex gap-6 mt-16 text-[15px] text-white/90">
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://instagram.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://twitter.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://linkedin.com/company/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>

            <p className="text-[8px] opacity-50 mb-2 mt-3">
              Legal Policies / Terms of Services / Privacy Policies
            </p>

            <p className="text-[8px] opacity-50">
              © 2026 All Rights Reserved. Designed and Developed by Spherehead
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-end items-end h-[90vh] pb-0 mr-10 ml-1">
          <form
            onSubmit={handleSubmit}
            className="bg-[#F3F3F3] p-12 w-[460px] shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="w-full bg-transparent border-b border-gray-400 mb-5 pb-3 outline-none"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              type="email"
              required
              className="w-full bg-transparent border-b border-gray-400 mb-5 pb-3 outline-none"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full bg-transparent border-b border-gray-400 mb-5 pb-3 outline-none"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              rows={2}
              required
              className="w-full bg-transparent border-b border-gray-400 mb-5 pb-3 outline-none resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-2 hover:bg-blue-700 transition mt-5 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
