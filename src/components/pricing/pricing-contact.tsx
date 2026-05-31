"use client";

import { useEffect, useRef, useState } from "react";
import GradientButton from "@/components/ui/gradient-button";
import RotatingDots from "@/components/ui/rotating-dots";
import SiteContainer from "@/components/layout/site-container";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function ContactSection() {
  const isMobile = useIsMobile();
  const [mode, setMode] = useState<"consultation" | "quotation">(
    "consultation",
  );
  const sectionRef = useRef<HTMLElement | null>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }

      snapTimerRef.current = setTimeout(() => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const shouldLock = rect.top < viewportHeight * 0.38 && rect.top > 8;

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
  }, [isMobile]);

  return (
    <section
      id="contact-pricing"
      ref={sectionRef}
      className="w-full snap-start bg-white py-12 md:min-h-[100svh] lg:flex lg:items-center lg:py-20 rounded-md"
    >
      <SiteContainer>
        <div className="mx-auto w-full max-w-5xl text-center">
          {/* LABEL */}
          <div className="mb-2 flex items-center justify-center gap-2">
            <RotatingDots variant="light" />
            <span className="body-small">Let’s Start the Conversation</span>
          </div>

          {/* HEADING */}
          <p className="heading-2 mx-auto mb-8 mt-5 max-w-[820px] !text-black lg:mb-8">
            {/* Mobile Title */}
            <span className="block text-center md:hidden">
              Share your details, and our team will get back shortly.
            </span>
            {/* Desktop Title */}
            <span className="hidden md:inline">
              Choose the option that fits your needs, share your details, and
              our team will get back shortly.
            </span>
          </p>

          <div className="mx-auto h-auto w-full max-w-4xl rounded-xl border border-transparent bg-white p-5 text-left md:border-gray-200 md:p-8">
            {/* TOGGLE */}
            <div className="mb-4 flex justify-center">
              <div className="flex gap-2 rounded-md bg-[#F2F2F2] p-3">
                <button
                  type="button"
                  onClick={() => setMode("consultation")}
                  className={`body-extra-small rounded px-7 py-3 ${
                    mode === "consultation"
                      ? "bg-[#0D54CA] text-white"
                      : "!bg-white text-black"
                  }`}
                >
                  Free Consultation
                </button>

                <button
                  type="button"
                  onClick={() => setMode("quotation")}
                  className={`body-extra-small rounded px-5 py-1.5 ${
                    mode === "quotation"
                      ? "bg-[#0D54CA] text-white"
                      : "!bg-white text-black"
                  }`}
                >
                  Get a Quotation
                </button>
              </div>
            </div>

            {/* FORM */}
            <form className="mt-8">
              {mode === "consultation" ? (
                <div className="space-y-8">
                  {/* GRID */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-2 md:gap-x-6 md:gap-y-6">
                    <Input label="Name" className="col-span-1 md:col-span-1" />

                    <Input
                      label="Phone Number"
                      type="tel"
                      className="col-span-1 md:col-span-1"
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      className="col-span-2 md:col-span-1"
                    />

                    <Select
                      label="Area of Interest"
                      className="col-span-2 md:col-span-1"
                    />

                    <div className="col-span-2">
                      <Textarea label="Let’s talk about your idea" />
                    </div>
                  </div>

                  {/* CHECKBOX + BUTTON */}
                  <div className="space-y-5 pt-6">
                    <div className="flex items-start gap-2 text-sm text-gray-500 md:items-center">
                      <input type="checkbox" className="mt-1 md:mt-0" />
                      <span>
                        I confirm that the details provided are accurate and
                        complete.
                      </span>
                    </div>

                    <GradientButton>
                    Submit
                  </GradientButton>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* GRID */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-2 md:gap-x-6 md:gap-y-6">
                    <Input
                      label="Company Name"
                      className="col-span-2 md:col-span-1"
                    />

                    <Input
                      label="Full Name"
                      className="col-span-2 md:col-span-1"
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      className="col-span-2 md:col-span-1"
                    />

                    <Input
                      label="Phone Number"
                      type="tel"
                      className="col-span-2 md:col-span-1"
                    />

                    <Select
                      label="Project Type"
                      className="col-span-2 md:col-span-1"
                    />

                    <Select
                      label="Project Timeline"
                      className="col-span-2 md:col-span-1"
                    />

                    <div className="col-span-2">
                      <Input
                        label="Estimated Budget Range"
                        className="col-span-2"
                      />
                    </div>

                    <div className="col-span-2">
                      <Textarea label="Describe your project requirements in detail" />
                    </div>
                  </div>

                  {/* CHECKBOX + BUTTON */}
                  <div className="space-y-5 pt-6">
                    <div className="flex items-start gap-2 text-sm text-gray-500 md:items-center">
                      <input type="checkbox" className="mt-1 md:mt-0" />
                      <span>
                        I confirm that the details provided are accurate and
                        complete.
                      </span>
                    </div>

                    <GradientButton>
                    Submit
                  </GradientButton>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}

// INPUT COMPONENT
function Input({
  label,
  full = false,
  hidden = false,
  type = "text",
  className = "",
}: {
  label: string;
  full?: boolean;
  hidden?: boolean;
  type?: string;
  className?: string;
}) {
  return (
    <div
      className={`min-w-0 w-full max-w-full ${full ? "md:col-span-2" : ""} ${className} ${
        hidden ? "pointer-events-none invisible" : ""
      }`}
      aria-hidden={hidden}
    >
      <input
        type={type}
        placeholder={label}
        className="body-small w-full max-w-full overflow-hidden text-ellipsis border-b border-gray-200 bg-transparent pb-4 pt-2 text-[#01030B] placeholder:text-gray-500 focus:border-[#0D54CA] focus:outline-none"
      />
    </div>
  );
}

// SELECT COMPONENT
function Select({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={`min-w-0 w-full max-w-full ${className}`}>
      <select
        required
        defaultValue=""
        // Added text-[#01030B] to match your Input component's selected state
        className="body-small w-full max-w-full overflow-hidden text-ellipsis border-b border-gray-200 bg-transparent pb-4 pt-2 text-[#01030B] invalid:text-gray-500 focus:border-[#0D54CA] focus:outline-none"
      >
        <option
          value=""
          disabled
          hidden
          // Match the placeholder style
          className="body-small text-gray-500"
        >
          {label}
        </option>

        {/* Explicitly style the options to match the "body-small" font size */}
        <option value="option1" className="body-small text-[#01030B]">
          Option 1
        </option>
        <option value="option2" className="body-small text-[#01030B]">
          Option 2
        </option>
      </select>
    </div>
  );
}

// TEXTAREA COMPONENT
function Textarea({ label }: { label: string }) {
  return (
    <div className="min-w-0 w-full max-w-full">
      <textarea
        rows={1}
        placeholder={label}
        className="body-small w-full max-w-full resize-none overflow-hidden text-ellipsis border-b border-gray-200 bg-transparent pb-4 pt-2 placeholder:text-gray-500 focus:border-[#0D54CA] focus:outline-none"
      />
    </div>
  );
}
