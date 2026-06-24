import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation primitives.
 *
 * These are drop-in replacements for the equivalents in `next/link` /
 * `next/navigation`, except they automatically keep the active locale in the
 * URL (and apply localized pathnames once they're configured in `routing.ts`).
 *
 * ALWAYS import navigation from here — never from `next/navigation` directly —
 * so locale handling can never be accidentally bypassed:
 *
 *   import { Link, useRouter, usePathname } from "@/i18n/navigation";
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
