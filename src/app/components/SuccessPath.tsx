"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";

export function SuccessPath() {
  const t = useTranslations("HomePage.designAgency");
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      // Coordinated timeline for card entrances on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(
        ".success-folder-card",
        { opacity: 0, x: -40, scale: 0.98 },
        { opacity: 1, x: 0, scale: 1, duration: 1.1 },
      ).fromTo(
        ".success-timeline-card",
        { opacity: 0, x: 40, scale: 0.98 },
        { opacity: 1, x: 0, scale: 1, duration: 1.1 },
        "-=0.9",
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative border-t border-white/5">
      {/* Ambient background glow */}

      <MaxWidthWrapper className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch py-16 md:py-24">
        {/* Left Side: The Deep Blue File Folder Panel */}
        <div className="success-folder-card lg:col-span-7 relative flex flex-col text-white pt-10 pb-8 px-6 md:px-10 min-h-[460px] md:min-h-[500px]">
          {/* Custom SVG folder path background */}
          <svg
            viewBox="0 0 800 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full -z-10 drop-shadow-2xl"
          >
            <path
              d="M 0,70 
                 C 0,40 30,40 30,40 
                 L 580,40 
                 C 610,40 610,10 640,10 
                 L 760,10 
                 C 790,10 790,40 790,40 
                 L 790,460 
                 C 790,490 760,490 760,490 
                 L 30,490 
                 C 0,490 0,460 0,460 
                 Z"
              fill="#2e26d9"
            />
          </svg>

          {/* Folder Content - Title Block */}
          <div className="mt-4 flex-1 flex flex-col justify-start items-start text-start">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-white max-w-xl text-start select-none">
              {t("title")}
            </h2>
            <div className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#f2be22] mt-4 select-none text-start">
              {t("titleHighlight")}
            </div>
          </div>

          {/* Divider line */}
          <div className="w-full border-t border-white/20 my-6" />

          {/* Folder Footer Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full">
            {/* Left: Flame Icon + Info */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 size-10 rounded-full bg-[#f2be22]/10 border border-[#f2be22]/30 flex items-center justify-center shadow-[0_0_12px_rgba(242,190,34,0.15)]">
                <svg viewBox="0 0 24 24" fill="none" className="size-6 text-[#f2be22]">
                  <path
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    fill="currentColor"
                    opacity="0.2"
                  />
                  <path
                    d="M15 9.5a3 3 0 00-3 3v5.82a3 3 0 005.12-2.12c0-.5-.12-1.02-.34-1.48L15 9.5z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 2c0 0-4 4.5-4 8.5C8 14.64 11.36 18 15.5 18c2.07 0 3.93-.84 5.3-2.2C19.43 14.65 18 12.5 18 10c0-4-6-8-6-8z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="text-xs md:text-sm text-white/90 max-w-[240px] text-start font-medium leading-snug">
                {t("subtitle")}
              </p>
            </div>

            {/* Right: Lightning Bolt + Yellow Action Button */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="flex-shrink-0 size-10 rounded-full bg-white flex items-center justify-center shadow-md">
                <svg viewBox="0 0 24 24" fill="none" className="size-6 text-[#2e26d9]">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
                </svg>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#f2be22] hover:bg-[#e0ab00] text-[#0d0f1a] font-bold text-xs md:text-sm px-6 py-3.5 uppercase tracking-wider transition-all duration-300 hover:scale-105 select-none shadow-lg cursor-pointer text-center"
              >
                {t("ctaPrimary")}
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Tall, Slender Success Path Flex Panel */}
        <div className="success-timeline-card lg:col-span-5 border border-white/10 bg-white/[0.03] backdrop-blur-lg rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[460px] md:min-h-[500px] shadow-2xl relative">
          {/* Gold header */}
          <h2 className="text-[#f2be22] font-black text-xs md:text-sm uppercase tracking-widest text-center mb-6 border-b border-white/5 pb-4 select-none">
            {t("successPath.title")}
          </h2>

          {/* Timeline steps */}
          <div className="relative flex-1 flex flex-col justify-between gap-6 pl-2 md:pl-4 text-start">
            {/* Dashed connector line */}
            <div className="absolute left-4 md:left-6 top-3 bottom-3 w-0 border-l border-dashed border-white/15 pointer-none pointer-events-none" />

            {/* Step 1 */}
            <div className="relative flex items-start gap-4">
              <div className="size-5 md:size-6 rounded-full bg-[#0d0f1a] border border-[#f2be22] flex items-center justify-center text-[10px] text-[#f2be22] z-10 flex-shrink-0 font-bold shadow-[0_0_8px_rgba(242,190,34,0.2)]">
                1
              </div>
              <div>
                <h3 className="font-bold text-white text-xs uppercase tracking-wider leading-none">
                  {t("successPath.step1Title")}
                </h3>
                <p className="text-[11px] text-lavender/60 mt-1 leading-snug">{t("successPath.step1Desc")}</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start gap-4">
              <div className="size-5 md:size-6 rounded-full bg-[#0d0f1a] border border-[#f2be22] flex items-center justify-center text-[10px] text-[#f2be22] z-10 flex-shrink-0 font-bold shadow-[0_0_8px_rgba(242,190,34,0.2)]">
                2
              </div>
              <div>
                <h3 className="font-bold text-white text-xs uppercase tracking-wider leading-none">
                  {t("successPath.step2Title")}
                </h3>
                <p className="text-[11px] text-lavender/60 mt-1 leading-snug">{t("successPath.step2Desc")}</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start gap-4">
              <div className="size-5 md:size-6 rounded-full bg-[#0d0f1a] border border-[#f2be22] flex items-center justify-center text-[10px] text-[#f2be22] z-10 flex-shrink-0 font-bold shadow-[0_0_8px_rgba(242,190,34,0.2)]">
                3
              </div>
              <div>
                <h3 className="font-bold text-white text-xs uppercase tracking-wider leading-none">
                  {t("successPath.step3Title")}
                </h3>
                <p className="text-[11px] text-lavender/60 mt-1 leading-snug">{t("successPath.step3Desc")}</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex items-start gap-4">
              <div className="size-5 md:size-6 rounded-full bg-[#0d0f1a] border border-[#f2be22] flex items-center justify-center text-[10px] text-[#f2be22] z-10 flex-shrink-0 font-bold shadow-[0_0_8px_rgba(242,190,34,0.2)]">
                4
              </div>
              <div>
                <h3 className="font-bold text-white text-xs uppercase tracking-wider leading-none">
                  {t("successPath.step4Title")}
                </h3>
                <p className="text-[11px] text-lavender/60 mt-1 leading-snug">{t("successPath.step4Desc")}</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative flex items-start gap-4">
              <div className="size-5 md:size-6 rounded-full bg-[#0d0f1a] border border-[#f2be22] flex items-center justify-center text-[10px] text-[#f2be22] z-10 flex-shrink-0 font-bold shadow-[0_0_8px_rgba(242,190,34,0.2)]">
                5
              </div>
              <div>
                <h3 className="font-bold text-white text-xs uppercase tracking-wider leading-none">
                  {t("successPath.step5Title")}
                </h3>
                <p className="text-[11px] text-lavender/60 mt-1 leading-snug">{t("successPath.step5Desc")}</p>
              </div>
            </div>
          </div>

          {/* Tiny footer caption */}
          <div className="text-[10px] text-lavender/40 mt-6 text-center italic select-none">
            {t("successPath.footer")}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
