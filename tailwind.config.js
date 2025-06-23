/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px", // Small screens (Mobile) → `p-4` (16px padding)
      md: "768px", // Medium screens (Tablets) → `p-6` (24px padding)
      lg: "1024px", // Large screens (Laptops) → `p-8` (32px padding)
      xl: "1280px", // Extra-large screens (Desktops) → `p-10` (40px padding)
      "2xl": "1536px", // Very large screens (Wide desktops) → `p-12` (48px padding)
      "3xl": "1736px", // Very large screens (Wide desktops) → `p-12` (48px padding)
    },
    extend: {
      colors: {
        "primary-gold": "#8898aa",
        "dark-gold": "#C3AB79",
        "primary-light": "#F3F4F6",
        "primary-grey": "#D9D9D9",
        "primary-dark": "#0E0E0E",
        "secondary-light": "#E2E2E2",
        "secondary-extra-light": "#EFEFEF",
        "secondary-dark": "#0F0F0F",
        "primary-purple": "#200053",
        "layerd-bg": "#7B00FF",
        "from-purple": "#9D00FF",
        "from-blue": "#CC00FF",
        "from-dark-blue": "#6200FF",
        "bg-blue": "#4000FF",
        "text-white": "#BBBABA",
        "gold-button": "#C3AB79",
        "primary-foreground": "#FDF9F3",
        "primary-fore": "#FDF9F3",
        muted: {
          DEFAULT: "#F6F6F6",
          foreground: "#000000",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
