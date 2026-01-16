/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          light: "#93C5FD",
        },
        success: "#22C55E",
        danger: "#EF4444",
        muted: "#6B7280",
        border: "#E5E7EB",
        surface: "#F9FAFB",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
        ],
      },
    },
  },
  plugins: [],
}

export default config
