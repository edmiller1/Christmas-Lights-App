/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 0.8 },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        "ch-red": "#E23737",
        "ch-red-hover": "#bc1919",
        "ch-red-shade": "#ffc1c1",
        "ch-turquoise": "#9de2c1",
        "ch-turquoise-hover": "#7fd6b1",
        "ch-turquoise-shade": "#b6e8d0",
        "ch-teal": "#5AC18A",
        "ch-yellow": "#e7b667",
        "ch-yelow-hover": "#eccb85",
        "ch-yellow-shade": "#f6d597",
        "ch-indigo": "#040043",
        "ch-pink": "#FF647F",
        "ch-light": "#ffffff",
        "ch-dark": "#202023",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss", require("tailwindcss-animate")],
};
