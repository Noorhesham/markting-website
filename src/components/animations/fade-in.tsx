"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  /** Stagger this reveal after the trigger (seconds). */
  delay?: number;
  /** Initial vertical offset in pixels. */
  y?: number;
};

/**
 * Reusable scroll-triggered reveal.
 *
 * Wrap any section to fade + rise it into view once on scroll. Animation is
 * self-contained: `useGSAP` scopes the tween to this element and auto-reverts it
 * (including the ScrollTrigger instance) on unmount, so there's no manual
 * cleanup. Honors `prefers-reduced-motion` by snapping straight to the final
 * state.
 *
 *   <FadeIn delay={0.1}><FeatureCard /></FadeIn>
 */
export function FadeIn({ children, className, delay = 0, y = 24 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [delay, y] },
  );

  // No inline `opacity: 0`: `useGSAP` runs in a layout effect, so `fromTo`
  // applies the hidden start state before the browser paints (no flash), while
  // SSR / no-JS users still get fully visible content.
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
