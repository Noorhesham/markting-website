import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * The ONE place GSAP plugins are registered.
 *
 * Registering the same plugin from multiple components is the classic GSAP
 * foot-gun in React (double-registration warnings, inconsistent behavior across
 * Fast Refresh). A module-level guard makes this safe to call from anywhere —
 * subsequent calls are no-ops.
 *
 * `useGSAP` is registered as a plugin per the @gsap/react guidance so GSAP can
 * track its context; `ScrollTrigger` powers scroll-driven reveals.
 */
let registered = false;

export function registerGsapPlugins(): void {
  if (registered) return;
  // GSAP touches `window`; never register during SSR.
  if (typeof window === "undefined") return;

  gsap.registerPlugin(useGSAP, ScrollTrigger);
  registered = true;
}
