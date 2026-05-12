import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 20px 70px rgba(0,0,0,0.14)",
      },
    },
  },
  plugins: [],
};
export default config;
