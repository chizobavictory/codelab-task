/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        degularregular: ["degularregular", "sans-serif"],
        degularbold: ["degularbold", "sans-serif"],
        degularmedium: ["degularmedium", "sans-serif"],
        degularlight: ["degularlight", "sans-serif"],
        degularsemibold: ["degularsemibold", "sans-serif"],
        degularthin: ["degularthin", "sans-serif"],
      },
    },
    animation: {
      "slide-in-slow": "slide-in-slow 1s ease-in-out",
    },
    keyframes: {
      "slide-in-slow": {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0)" },
      },
    },
  },
  plugins: [],
};
