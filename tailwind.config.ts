import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#06111f",
        panel: "#0b1829",
        panelSoft: "#102235",
        line: "#23364f",
        mint: "#45d19b",
        amberSignal: "#f7bf4f",
        redSignal: "#ff6f7f"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
