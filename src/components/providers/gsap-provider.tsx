"use client";

import type { ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, registerGsapPlugins } from "@/lib/gsap";

/**
 * App-wide GSAP bootstrap.
 *
 * Mounted once near the root (in the locale layout) so plugin registration and
 * global GSAP configuration happen in a single, predictable place inside the
 * React tree. It renders no DOM of its own — animation logic stays in the
 * individual animation components.
 */
export function GsapProvider({ children }: { children: ReactNode }) {
  useGSAP(() => {
    // Defensive: registration already ran on import of `@/lib/gsap`, but calling
    // again is a no-op and keeps the contract explicit.
    registerGsapPlugins();

    // Conditional rendering across locales can momentarily detach targets;
    // silence the resulting noise rather than guarding every tween.
    gsap.config({ nullTargetWarn: false });

    // Web fonts (Latin vs Arabic) settle after first paint and change element
    // heights — refresh ScrollTrigger once everything has loaded so pinned and
    // scrubbed positions stay accurate.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh, { once: true });
    }

    return () => window.removeEventListener("load", refresh);
  });

  return <>{children}</>;
}
