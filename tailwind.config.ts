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
    extend: {
      colors: {
        sanguine: {
          DEFAULT: "#cc0000",
          glow: "#ff0033",
          deep: "#2a0003",
          dark: "#0d0001",
        },
        vantablack: "#000000",
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        tech: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        "neon-red": "0 0 25px rgba(255, 0, 51, 0.45)",
        "neon-red-strong": "0 0 45px rgba(255, 0, 51, 0.85)",
        "cyber-card": "0 10px 40px rgba(0, 0, 0, 0.9)",
      },
      animation: {
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};
