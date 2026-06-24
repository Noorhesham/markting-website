"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { registerGsapPlugins } from "./plugins";

/**
 * Single client-side entry point for everything GSAP.
 *
 * Animation components import exclusively from `@/lib/gsap` — never from `gsap`
 * or `@gsap/react` directly — which guarantees:
 *   - plugins are registered before any animation runs (side-effect on import),
 *   - there's one consistent GSAP instance across the app,
 *   - SSR never imports GSAP (this module is `"use client"`).
 */
registerGsapPlugins();

/**
 * Honor the user's reduced-motion preference. Animation components use this to
 * fall back to a final, non-animated state instead of moving things around.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, useGSAP, ScrollTrigger, registerGsapPlugins };
