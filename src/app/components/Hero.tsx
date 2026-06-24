"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import SplitText from "./SplitText";
import Lightfall from "./Lightfall";
import Image from "next/image";
import graphCard from "@/app/public/Graph_Card__1_.avif";

export function Hero() {
  const t = useTranslations("HomePage.hero");
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Coordinated timeline for card entrances
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.0 } });

      tl.fromTo(".hero-badge", { opacity: 0, y: 15 }, { opacity: 1, y: 0, delay: 0.1 })
        .fromTo(".hero-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "-=0.6")
        .fromTo(".hero-actions", { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, "-=0.6")
        .fromTo(".hero-portal-perspective", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 }, "-=1.0");

      // Scroll-driven 3D flip animation (pushed back and tilted initially, moving upright to front as we scroll)
      gsap.fromTo(
        ".hero-portal-wrap",
        {
          rotateX: 42,
          z: -180,
          scale: 0.85,
        },
        {
          rotateX: 0,
          z: 0,
          scale: 1.02,
          ease: "power1.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=350",
            scrub: 0.4,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative isolate min-h-[90vh]
       flex flex-col items-center justify-center  px-6 py-20 md:py-32"
    >
      {/* Lightfall background */}
      <div className="absolute inset-0 -z-10 bg-[#0d0f1a]">
        <Lightfall
          className="opacity-45"
          speed={0.15}
          streakCount={2}
          streakWidth={1.0}
          streakLength={1.0}
          density={0.3}
          zoom={3.0}
          backgroundColor="#0d0f1a"
          colors={["#80298f", "#333096", "#452e94"]}
          mouseInteraction={true}
          mouseStrength={0.4}
          mouseRadius={1.0}
        />
        {/* Gradients blending Lightfall context */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f1a]/85 via-transparent to-[#0d0f1a] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#0d0f1a_100%)] pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl w-full flex flex-col items-center justify-center text-center">
        {/* Centered Typography / Copy */}
        <div className="flex flex-col items-center text-center max-w-3xl">
          {/* Glowing Badge */}
          <div
            className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs md:text-sm font-semibold text-lavender/95 backdrop-blur-md mb-8"
            style={{ willChange: "transform, opacity" }}
          >
            <span className="size-2 rounded-full bg-magenta shadow-[0_0_8px_#80298f]" aria-hidden />
            {t("badge")}
          </div>

          {/* Title using SplitText */}
          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl select-none text-center">
            <SplitText
              text={t("title")}
              tag="span"
              splitType="lines,words"
              className="block text-white"
              from={{ yPercent: 120, opacity: 0 }}
              to={{ yPercent: 0, opacity: 1, delay: 0.2 }}
              duration={1.1}
              delay={20}
              ease="power4.out"
              textAlign="center"
            />{" "}
            <span className="block mt-0.5 pb-1">
              <SplitText
                text={t("titleHighlight")}
                tag="span"
                splitType="lines,words"
                className=" inline-block"
                from={{ yPercent: 120, opacity: 0 }}
                to={{ yPercent: 0, opacity: 1, delay: 0.4 }}
                duration={1.1}
                delay={20}
                ease="power4.out"
                textAlign="center"
              />
            </span>
          </h1>

          {/* Shortened Subtitle */}
          <p className="hero-subtitle mt-3 max-w-2xl text-base md:text-lg text-lavender/70 leading-relaxed text-center">
            {t("subtitle")}
          </p>

          {/* Action Buttons */}
          <div className="hero-actions mt-10 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-[0_4px_20px_rgba(255,255,255,0.12)] text-center cursor-pointer"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:scale-105 text-center cursor-pointer"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>

        {/* Centered Interactive Graph Card Container */}
        <div
          className="hero-portal-perspective w-full max-w-[850px] flex justify-center items-center mt-10 md:mt-12 px-4"
          style={{ perspective: 1100 }}
        >
          <div
            className="hero-portal-wrap relative w-full flex items-center justify-center transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Ambient background glow - Neon glow behind card */}
            <div
              className="absolute -inset-8 md:-inset-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 rounded-[2.5rem] opacity-50 blur-[80px] md:blur-[100px] pointer-events-none -z-10"
              style={{ transform: "translateZ(-30px)" }}
            />

            {/* Secondary intense inner glow for high peak highlights */}
            <div
              className="absolute -inset-4 bg-gradient-to-tr from-[#3b82f6]/60 via-[#8b5cf6]/60 to-[#ec4899]/60 rounded-[2rem] opacity-60 blur-[40px] pointer-events-none -z-10"
              style={{ transform: "translateZ(-15px)" }}
            />

            <div
              className="hero-portal relative w-full flex items-center justify-center transform-gpu cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Crisp Graph Card Image */}
              <Image
                src={graphCard}
                alt="Analytics Graph"
                width={850}
                height={530}
                className="relative z-10 w-full h-auto object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10"
                priority
                unoptimized
                style={{ transform: "translateZ(20px)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
