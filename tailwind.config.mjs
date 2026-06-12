import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        ink: "#181715",
        "ink-muted": "#5f5a52",
        paper: "#f6f1e8",
        "paper-soft": "#fbf8f2",
        line: "#d8cec0",
        accent: "#6f5d45"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"]
      },
      maxWidth: {
        readable: "68ch"
      }
    }
  },
  plugins: [typography]
};
