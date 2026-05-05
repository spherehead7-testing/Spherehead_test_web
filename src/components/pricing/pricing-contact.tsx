"use client";

import { useEffect, useRef, useState } from "react";
import RotatingDots from "@/components/ui/rotating-dots";

export default function ContactSection() {
  const [mode, setMode] = useState<"consultation" | "quotation">("consultation");
  const sectionRef = useRef<HTMLElement | null>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }

      snapTimerRef.current = setTimeout(() => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const shouldLock =
          rect.top < viewportHeight * 0.38 && rect.top > 8;

        if (shouldLock) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-[100svh] w-full snap-start overflow-hidden bg-[#F6F6F6] py-8 lg:flex lg:items-center lg:py-10"
    >
      <div className="mx-auto w-full max-w-5xl px-6 text-center">

        {/* LABEL */}
        <div className="mb-2 flex items-center justify-center gap-2">
          <RotatingDots variant="light"/>
          <span className="body-small text-gray-500">
            Let’s Start the Conversation
          </span>
        </div>

        {/* HEADING */}
        <p className="mx-auto mb-4 max-w-[820px] text-[28px] font-[300] leading-[1.2] text-[#01030B] lg:text-[34px]">
          Choose the option that fits your needs, share your details, and our
          team will get back shortly.
        </p>

        {/* FORM CARD */}
        <div className="min-h-[520px] rounded-md border border-gray-200 bg-white p-5 text-left md:p-6">

          {/* TOGGLE */}
          <div className="mb-4 flex justify-center">
            <div className="flex gap-2 rounded-md bg-gray-100 p-1">
              <button
                onClick={() => setMode("consultation")}
                className={`rounded px-5 py-1.5 text-sm ${
                  mode === "consultation"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
              >
                Free Consultation
              </button>

              <button
                onClick={() => setMode("quotation")}
                className={`rounded px-5 py-1.5 text-sm ${
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
          <form className="space-y-4">

            {/* GRID */}
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label={mode === "consultation" ? "Name" : "Company Name"}
              />
              <Input
                label={mode === "consultation" ? "Phone Number" : "Full Name"}
              />
              <Input label="Email Address" />
              <Input
                label="Phone Number"
                hidden={mode === "consultation"}
              />
              <Select
                label={
                  mode === "consultation" ? "Area of Interest" : "Project Type"
                }
              />
              <Select
                label="Project Timeline"
                hidden={mode === "consultation"}
              />
            </div>

            {/* FULL WIDTH */}
            <Input
              label="Estimated Budget Range"
              full
              hidden={mode === "consultation"}
            />

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
            <button className="rounded bg-blue-700 px-6 py-1.5 text-white transition hover:bg-blue-800">
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
  hidden = false,
}: {
  label: string;
  full?: boolean;
  hidden?: boolean;
}) {
  return (
    <div
      className={`${full ? "md:col-span-2" : ""} ${
        hidden ? "invisible pointer-events-none" : ""
      }`}
      aria-hidden={hidden}
    >
      <label className="text-sm leading-none text-gray-500">{label}</label>
      <input
        type="text"
        className="w-full border-b border-gray-300 bg-transparent py-1.5 focus:outline-none"
      />
    </div>
  );
}

//////////////////////////////
// SELECT COMPONENT
//////////////////////////////

function Select({ label, hidden = false }: { label: string; hidden?: boolean }) {
  return (
    <div
      className={hidden ? "invisible pointer-events-none" : ""}
      aria-hidden={hidden}
    >
      <label className="text-sm leading-none text-gray-500">{label}</label>
      <select className="w-full border-b border-gray-300 bg-transparent py-1.5 focus:outline-none">
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
      <label className="text-sm leading-none text-gray-500">{label}</label>
      <textarea
        rows={2}
        className="w-full resize-none border-b border-gray-300 bg-transparent py-1.5 focus:outline-none"
      />
    </div>
  );
}
