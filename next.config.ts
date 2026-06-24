import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * Wire next-intl into the build.
 *
 * `createNextIntlPlugin` points at our request-scoped i18n config so that
 * server components, metadata, and the proxy all resolve the same messages
 * and locale. Passing the path explicitly keeps the config discoverable even
 * though we use a `src/` directory.
 */
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Surface common foot-guns early in a bilingual app.
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
