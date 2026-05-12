import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "Inter", "ui-sans-serif", "system-ui"],
        display: ["var(--font-heading)", "Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};
export default config;
