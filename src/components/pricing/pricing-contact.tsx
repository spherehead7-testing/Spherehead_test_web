"use client";

import { useEffect, useRef, useState } from "react";
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
      // Reduced py-20 to py-12 on smaller screens to help fit the viewport
      className="min-h-[100svh] w-full snap-start bg-white py-12 lg:flex lg:items-center lg:py-20"
    >
      <SiteContainer>
        <div className="mx-auto w-full max-w-5xl text-center">
          {/* LABEL */}
          <div className="mb-2 flex items-center justify-center gap-2">
            <RotatingDots variant="light" />
            <span className="body-small">Let’s Start the Conversation</span>
          </div>

          {/* HEADING */}
          <p className="heading-2 mx-auto mb-8 max-w-[820px] !text-black lg:mb-8">
            Choose the option that fits your needs, share your details, and our
            team will get back shortly.
          </p>

          {/* FORM CARD */}
          <div className="mx-auto h-auto max-w-4xl border border-gray-200 bg-white p-5 text-left md:p-8">
            {/* TOGGLE */}
            <div className="mb-4 flex justify-center">
              <div className="flex gap-2 rounded-md bg-[#F2F2F2] p-2">
                <button
                  onClick={() => setMode("consultation")}
                  className={`body-extra-small rounded px-5 py-1.5 ${
                    mode === "consultation"
                      ? "bg-[#0D54CA] text-white"
                      : "!bg-white text-black"
                  }`}
                >
                  Free Consultation
                </button>

                <button
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
                  {/* GRID - Reduced gap-y-10 to gap-y-6 */}
                  <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
                    <Input label="Name" />

                    <Input label="Phone Number" type="tel" />

                    <Input label="Email Address" type="email" />

                    <Select label="Area of Interest" />

                    <div className="md:col-span-2">
                      <Textarea label="Let’s talk about your idea" />
                    </div>
                  </div>

                  {/* CHECKBOX + BUTTON */}
                  <div className="space-y-5 pt-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <input type="checkbox" />
                      <span>
                        I confirm that the details provided are accurate and
                        complete.
                      </span>
                    </div>

                    <button className="body-medium rounded bg-animated-gradient px-6 py-2 text-white">
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* GRID - Reduced gap-y-10 to gap-y-6 */}
                  <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
                    <Input label="Company Name" />

                    <Input label="Full Name" />

                    <Input label="Email Address" type="email" />

                    <Input label="Phone Number" type="tel" />

                    <Select label="Project Type" />

                    <Select label="Project Timeline" />

                    <div className="md:col-span-2">
                      <Input label="Estimated Budget Range" />
                    </div>

                    <div className="md:col-span-2">
                      <Textarea label="Describe your project requirements in detail" />
                    </div>
                  </div>

                  {/* CHECKBOX + BUTTON */}
                  <div className="space-y-5 pt-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <input type="checkbox" />
                      <span>
                        I confirm that the details provided are accurate and
                        complete.
                      </span>
                    </div>

                    <button className="body-medium rounded bg-animated-gradient px-6 py-2 text-white">
                      Submit
                    </button>
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
}: {
  label: string;
  full?: boolean;
  hidden?: boolean;
  type?: string;
}) {
  return (
    <div
      className={`${full ? "md:col-span-2" : ""} ${
        hidden ? "pointer-events-none invisible" : ""
      }`}
      aria-hidden={hidden}
    >
      <input
        type={type}
        placeholder={label}
        className="body-small w-full border-b border-gray-200 bg-transparent pb-4 pt-2 text-[#01030B] placeholder:text-gray-500 focus:border-[#0D54CA] focus:outline-none"
      />
    </div>
  );
}

// SELECT COMPONENT

function Select({ label }: { label: string }) {
  return (
    <div>
      <select
        required
        defaultValue=""
        className="body-small w-full border-b border-gray-200 bg-transparent pb-4 pt-2 text-[#01030B] invalid:text-gray-500 focus:border-[#0D54CA] focus:outline-none"
      >
        <option value="" disabled hidden>
          {label}
        </option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
    </div>
  );
}

// TEXTAREA COMPONENT

function Textarea({ label }: { label: string }) {
  return (
    <div>
      <textarea
        rows={1}
        placeholder={label}
        className="body-small w-full resize-none border-b border-gray-200 bg-transparent pb-4 pt-2 text-[#01030B] placeholder:text-gray-500 focus:border-[#0D54CA] focus:outline-none"
      />
    </div>
  );
}
