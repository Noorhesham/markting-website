/**
 * Tailwind CSS v4 is configured entirely through PostCSS — there is no
 * `tailwind.config.js`. Design tokens live in `src/app/globals.css` under
 * the `@theme` block instead.
 */
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
