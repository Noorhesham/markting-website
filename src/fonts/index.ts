import localFont from "next/font/local";

/**
 * Self-hosted fonts via `next/font/local`.
 *
 * Each family is exposed as a CSS variable rather than a class, so the locale
 * layout can attach all variables once on `<html>` and `globals.css` decides
 * which one `--font-sans` / `--font-display` resolve to per direction. This is
 * what makes the typography locale-aware without any runtime branching in JSX.
 *
 * `display: "swap"` avoids invisible text while fonts load; `next/font` also
 * self-hosts and preloads them, so there's no layout shift or external request.
 */

/** English body font — Inter (variable). */
const inter = localFont({
  src: "./inter-variable.ttf",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

/** English display/heading font — Raleway. */
const raleway = localFont({
  src: [
    { path: "./raleway-light.ttf", weight: "300", style: "normal" },
    { path: "./raleway-regular.ttf", weight: "400", style: "normal" },
    { path: "./raleway-medium.ttf", weight: "500", style: "normal" },
    { path: "./raleway-bold.ttf", weight: "700", style: "normal" },
    { path: "./raleway-black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-raleway",
  display: "swap",
});

/** Arabic body + display font — DIN Next Arabic. */
const dinNextArabic = localFont({
  src: [
    { path: "./din-next-arabic-ultralight.otf", weight: "200", style: "normal" },
    { path: "./din-next-arabic-light.otf", weight: "300", style: "normal" },
    { path: "./din-next-arabic-regular.otf", weight: "400", style: "normal" },
    { path: "./din-next-arabic-medium.otf", weight: "500", style: "normal" },
    { path: "./din-next-arabic-bold.otf", weight: "700", style: "normal" },
    { path: "./din-next-arabic-black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-din-next",
  display: "swap",
});

/**
 * All font variables, ready to drop onto `<html className={fontVariables}>`.
 * Both locales' fonts are declared; only the bytes actually used by the active
 * locale are requested by the browser, so this costs nothing extra.
 */
export const fontVariables = [
  inter.variable,
  raleway.variable,
  dinNextArabic.variable,
].join(" ");
