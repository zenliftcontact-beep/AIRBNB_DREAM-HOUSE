import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        luxury: {
          bg: "#0B0C0E",
          surface: "#121418",
          card: "#181B20",
          cardHover: "#20242B",
          border: "rgba(212, 175, 55, 0.18)",
          borderLight: "rgba(255, 255, 255, 0.08)",
        },
        gold: {
          50: "#FCF9EE",
          100: "#F7F0D4",
          200: "#EEDCA4",
          300: "#E3C572",
          400: "#D4AF37", // Primary Luxury Champagne Gold
          500: "#B89228",
          600: "#9A751F",
          700: "#75561A",
          800: "#543C16",
          900: "#36260F",
        },
        sand: {
          50: "#FAF8F5",
          100: "#F4EFEA",
          200: "#E9DFD4",
          300: "#D8C7B5",
          400: "#C3AB93",
          500: "#A88D73",
        },
        charcoal: {
          950: "#090A0C",
          900: "#101216",
          800: "#1A1D23",
          700: "#272B33",
          600: "#383E49",
        },
        sage: {
          400: "#8FA382",
          500: "#6B805E",
          600: "#4D6042",
        }
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-manrope)", "var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F7F0D4 0%, #D4AF37 50%, #B89228 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.2) 50%, transparent 100%)",
        "dark-radial": "radial-gradient(circle at 50% 0%, #1A1D23 0%, #090A0C 75%)",
        "card-glass": "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        "luxury-glow": "0 0 35px -5px rgba(212, 175, 55, 0.2)",
        "gold-subtle": "0 4px 20px -2px rgba(212, 175, 55, 0.15)",
        "glass-elevated": "0 20px 40px rgba(0, 0, 0, 0.45)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
