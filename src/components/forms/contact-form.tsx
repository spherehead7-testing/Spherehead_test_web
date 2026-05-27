"use client";

import { useState } from "react";
import GradientButton from "@/components/ui/gradient-button";

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
      className={`w-full flex flex-col gap-8 ${variant === "card"
        ? "md:max-w-[480px] bg-[#f7f7f7] px-8 md:px-12 pt-14 pb-[52px] rounded-t-[6px]"
        : "max-w-lg"
        }`}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="w-full border-b border-[#BFBFBF] pb-3 pt-2 text-black outline-none transition-colors placeholder:text-[#BFBFBF] focus:border-blue-600"
      />

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        type="email"
        required
        className="w-full border-b border-[#BFBFBF] pb-3 pt-2 text-black outline-none transition-colors placeholder:text-[#BFBFBF] focus:border-blue-600"
      />

      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
        className="w-full border-b border-[#BFBFBF] pb-3 pt-2 text-black outline-none transition-colors placeholder:text-[#BFBFBF] focus:border-blue-600"
      />

      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="Message"
        rows={1}
        required
        className="w-full resize-none overflow-hidden border-b border-[#BFBFBF] pb-3 pt-2 leading-relaxed text-black outline-none transition-colors placeholder:text-[#BFBFBF] focus:border-blue-600"
      />

      {/* THE FIX: Sleek custom status message UI */}
      {status && (
        <div
          className={`px-4 py-3 text-sm rounded-md transition-opacity duration-300 ${status.type === "success"
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
            }`}
        >
          {status.text}
        </div>
      )}

      <GradientButton
        type="submit"
        disabled={loading}
        animated
        className="mt-2 w-fit self-start disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Sending..." : "Submit"}
      </GradientButton>
    </form>
  );
}
