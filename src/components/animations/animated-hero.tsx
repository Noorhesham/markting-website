"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Client hero with an on-load GSAP timeline.
 *
 * Demonstrates the production pattern:
 *   - text comes from `useTranslations` (no hardcoded copy, works in both
 *     locales and directions automatically),
 *   - the timeline targets *scoped* selectors (`useGSAP({ scope })`), so the
 *     `[data-animate]` lookups can never escape this component — this is the
 *     idiomatic @gsap/react alternative to threading a ref per element,
 *   - reduced-motion users get the final state with no movement,
 *   - cleanup is automatic via `useGSAP`.
 */
export function AnimatedHero() {
  const t = useTranslations("HomePage.hero");
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-animate]", { autoAlpha: 1, y: 0 });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
        .from("[data-animate='badge']", { autoAlpha: 0, y: 16 })
        .from("[data-animate='title']", { autoAlpha: 0, y: 28 }, "-=0.5")
        .from("[data-animate='subtitle']", { autoAlpha: 0, y: 20 }, "-=0.6")
        .from("[data-animate='actions']", { autoAlpha: 0, y: 16 }, "-=0.6");
    },
    { scope: root },
  );

  return (
    <div ref={root} className="mx-auto max-w-3xl text-center">
      <span
        data-animate="badge"
        className="inline-flex items-center gap-2 rounded-full border border-lavender bg-white/60 px-4 py-1.5 text-sm font-medium text-violet"
      >
        <span className="size-2 rounded-full bg-magenta" aria-hidden />
        {t("badge")}
      </span>

      <h1
        data-animate="title"
        className="mt-6 font-display text-4xl font-black leading-tight text-ink sm:text-6xl"
      >
        {t("title")}{" "}
        <span className="bg-gradient-to-r from-violet via-cobalt to-magenta bg-clip-text text-transparent">
          {t("titleHighlight")}
        </span>
      </h1>

      <p
        data-animate="subtitle"
        className="mx-auto mt-6 max-w-2xl text-lg text-ink/70"
      >
        {t("subtitle")}
      </p>

      {/* Logical flex direction + `gap` work in both LTR and RTL without changes. */}
      <div
        data-animate="actions"
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#contact"
          className="rounded-full bg-violet px-7 py-3 text-base font-semibold text-cloud transition-colors hover:bg-cobalt"
        >
          {t("ctaPrimary")}
        </a>
        <a
          href="#features"
          className="rounded-full border border-lavender px-7 py-3 text-base font-semibold text-ink transition-colors hover:border-violet hover:text-violet"
        >
          {t("ctaSecondary")}
        </a>
      </div>
    </div>
  );
}
