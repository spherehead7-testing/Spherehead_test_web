"use client";

import { useState } from "react";

type Props = {
  variant?: "flat" | "card";
};

export default function ContactCard({ variant = "flat" }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // THE FIX: Added a custom state for success/error messages instead of using browser alerts
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null); // Clear previous messages

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ type: "success", text: "Message sent successfully! We'll be in touch." });
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus({ type: "error", text: "Failed to send message. Please try again." });
      }
    } catch {
      setStatus({ type: "error", text: "Something went wrong. Please check your connection." });
    }

    setLoading(false);

    // THE FIX: Automatically hide the message after 5 seconds
    setTimeout(() => {
      setStatus(null);
    }, 5000);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full flex flex-col gap-8 ${
        variant === "card"
          ? "max-w-[480px] bg-[#f7f7f7] px-12 pt-14 pb-[52px]"
          : "max-w-lg"
      }`}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="w-full bg-transparent border-b border-[#b8b8b8] pb-3 pt-2 text-[#6f6f6f] outline-none transition-colors placeholder:text-[#b9b9b9] focus:border-blue-600"
      />

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        type="email"
        required
        className="w-full bg-transparent border-b border-[#b8b8b8] pb-3 pt-2 text-[#6f6f6f] outline-none transition-colors placeholder:text-[#b9b9b9] focus:border-blue-600"
      />

      <input
      value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
        className="w-full bg-transparent border-b border-[#b8b8b8] pb-3 pt-2 text-[#6f6f6f] outline-none transition-colors placeholder:text-[#b9b9b9] focus:border-blue-600"
      />

      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="Message"
        rows={1}
        required
        className="w-full resize-none overflow-hidden border-b border-[#b8b8b8] bg-transparent pb-3 pt-2 leading-relaxed text-[#6f6f6f] outline-none transition-colors placeholder:text-[#b9b9b9] focus:border-blue-600"
      />

      {/* THE FIX: Sleek custom status message UI */}
      {status && (
        <div
          className={`px-4 py-3 text-sm rounded-md transition-opacity duration-300 ${
            status.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {status.text}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group relative mt-2 h-[38px] w-[88px] cursor-pointer overflow-hidden bg-[#164b9f] text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="invisible px-2">
          {loading ? "Sending..." : "Submit"}
        </span>

        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
          {loading ? "Sending..." : "Submit"}
        </span>

        <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
          {loading ? "Sending..." : "Submit"}
        </span>
      </button>
    </form>
  );
}