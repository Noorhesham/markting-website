import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next.js 16 network-boundary handler (formerly `middleware.ts`).
 *
 * In Next 16 the file convention was renamed `middleware.ts` -> `proxy.ts`
 * (it runs on the Node.js runtime). next-intl's `createMiddleware` plugs in
 * unchanged and is responsible for:
 *   - detecting the locale (URL prefix > cookie > `Accept-Language` header),
 *   - redirecting `/` to the default locale (`localePrefix: "always"`),
 *   - persisting the chosen locale in a cookie for return visits.
 */
export default createMiddleware(routing);

export const config = {
  // Run the proxy on application routes only. The negative lookahead skips:
  //   - `/api`, `/trpc`        -> API / RPC routes
  //   - `/_next`, `/_vercel`   -> framework internals & build assets
  //   - anything with a dot    -> static files (favicon.ico, *.png, *.svg, ...)
  // This keeps locale handling off static assets and backend endpoints.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
