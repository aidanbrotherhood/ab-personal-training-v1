import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        "ink-muted": "#5B6472",
        "ink-soft": "#7A8493",
        paper: "#F7F8FA",
        "paper-soft": "#FFFFFF",
        "paper-tint": "#F1F5F9",
        line: "#E2E8F0",
        "line-strong": "#CBD5E1",
        accent: "#007AFF",
        "accent-strong": "#0066D6",
        "accent-soft": "#EAF4FF"
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-heading)", "var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      maxWidth: {
        readable: "68ch",
        editorial: "74ch"
      },
      boxShadow: {
        card: "0 1px 2px rgba(17, 24, 39, 0.04)"
      },
      borderRadius: {
        brand: "0.5rem"
      }
    }
  },
  plugins: [typography]
};
