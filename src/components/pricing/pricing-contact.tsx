"use client";

import { useState } from "react";
import RotatingDots from "@/components/ui/rotating-dots";

export default function ContactSection() {
  const [mode, setMode] = useState<"consultation" | "quotation">("consultation");

  return (
    <section className="w-full bg-[#F6F6F6] py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* LABEL */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <RotatingDots />
          <span className="text-sm text-gray-500">
            Let’s Start the Conversation
          </span>
        </div>

        {/* HEADING */}
        <h2 className="text-[26px] md:text-[32px] lg:text-[36px] font-medium max-w-[900px] mx-auto leading-[1.4] mb-10">
          Choose the option that fits your needs, share your details, and our
          team will get back shortly.
        </h2>

        {/* FORM CARD */}
        <div className="bg-white border border-gray-200 rounded-md p-8 md:p-10 text-left">

          {/* TOGGLE */}
          <div className="flex justify-center mb-10">
            <div className="bg-gray-100 p-1 rounded-md flex gap-2">
              <button
                onClick={() => setMode("consultation")}
                className={`px-5 py-2 text-sm rounded ${
                  mode === "consultation"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
              >
                Free Consultation
              </button>

              <button
                onClick={() => setMode("quotation")}
                className={`px-5 py-2 text-sm rounded ${
                  mode === "quotation"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
              >
                Get a Quotation
              </button>
            </div>
          </div>

          {/* FORM */}
          <form className="space-y-6">

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-6">

              {mode === "consultation" ? (
                <>
                  <Input label="Name" />
                  <Input label="Phone Number" />
                  <Input label="Email Address" />
                  <Select label="Area of Interest" />
                </>
              ) : (
                <>
                  <Input label="Company Name" />
                  <Input label="Full Name" />
                  <Input label="Email Address" />
                  <Input label="Phone Number" />
                  <Select label="Project Type" />
                  <Select label="Project Timeline" />
                </>
              )}
            </div>

            {/* FULL WIDTH */}
            {mode === "quotation" && (
              <Input label="Estimated Budget Range" full />
            )}

            {/* TEXTAREA */}
            <Textarea
              label={
                mode === "consultation"
                  ? "Let’s talk about your idea"
                  : "Describe your project requirements in detail"
              }
            />

            {/* CHECKBOX */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <input type="checkbox" />
              <span>
                I confirm that the details provided are accurate and complete.
              </span>
            </div>

            {/* BUTTON */}
            <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

//////////////////////////////
// INPUT COMPONENT
//////////////////////////////

function Input({
  label,
  full = false,
}: {
  label: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type="text"
        className="w-full border-b border-gray-300 focus:outline-none py-2 bg-transparent"
      />
    </div>
  );
}

//////////////////////////////
// SELECT COMPONENT
//////////////////////////////

function Select({ label }: { label: string }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <select className="w-full border-b border-gray-300 focus:outline-none py-2 bg-transparent">
        <option value="">Select</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </select>
    </div>
  );
}

//////////////////////////////
// TEXTAREA COMPONENT
//////////////////////////////

function Textarea({ label }: { label: string }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <textarea
        rows={3}
        className="w-full border-b border-gray-300 focus:outline-none py-2 bg-transparent resize-none"
      />
    </div>
  );
}