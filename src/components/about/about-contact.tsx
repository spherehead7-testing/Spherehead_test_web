"use client";

export default function ContactSection() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0b2a5b] to-[#2f5fb3] flex items-center">

      <div className="max-w-7xl mx-auto w-full px-10 grid grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div className="text-white">
          <h2 className="text-[56px] leading-tight font-light">
            Let’s Build Something <br />
            Awesome together
          </h2>

          {/* Socials */}
          <div className="flex gap-6 mt-16 text-xl opacity-80">
            <span>f</span>
            <span>◎</span>
            <span>𝕏</span>
            <span>in</span>
          </div>

          {/* Footer text */}
          <p className="text-sm mt-6 opacity-70">
            Legal Policies / Terms of Services / Privacy Policies
          </p>

          <p className="text-xs mt-3 opacity-50">
            © 2026 All Rights Reserved. Designed and Developed by Spherehead
          </p>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="flex justify-end">
          <div className="bg-[#F3F3F3] rounded-lg p-10 w-[420px] shadow-lg">

            <input
              placeholder="Name"
              className="w-full bg-transparent border-b border-gray-400 mb-8 pb-2 outline-none"
            />

            <input
              placeholder="Email Address"
              className="w-full bg-transparent border-b border-gray-400 mb-8 pb-2 outline-none"
            />

            <input
              placeholder="Phone Number"
              className="w-full bg-transparent border-b border-gray-400 mb-8 pb-2 outline-none"
            />

            <textarea
              placeholder="Message"
              className="w-full bg-transparent border-b border-gray-400 mb-8 pb-2 outline-none resize-none"
            />

            <button className="bg-blue-600 text-white px-6 py-2 rounded">
              Submit
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}