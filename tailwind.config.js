/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0A0A",
          secondary: "#111111",
          card: "#161616",
        },
        text: {
          primary: "#F5F0E8",
          secondary: "#9A9488",
          muted: "#4A4640",
        },
        accent: {
          yellow: "#FFD60A",
          red: "#FF4D1C",
          green: "#00FF85",
        },
        border: {
          DEFAULT: "rgba(245, 240, 232, 0.08)",
          light: "rgba(245, 240, 232, 0.15)",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        mono: ["'DM Mono'", "monospace"],
        sans: ["'Syne'", "sans-serif"],
      },
      fontSize: {
        "fluid-hero": "clamp(3.5rem, 10vw, 9rem)",
        "fluid-h2": "clamp(2rem, 5vw, 4.5rem)",
        "fluid-h3": "clamp(1.25rem, 3vw, 2rem)",
      },
      animation: {
        "cursor-pulse": "pulse 1.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        grain: "grain 0.5s steps(1) infinite",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-2%, -3%)" },
          "50%": { transform: "translate(3%, 2%)" },
          "75%": { transform: "translate(-1%, 4%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      spacing: {
        "section": "clamp(5rem, 10vw, 9rem)",
      },
      maxWidth: {
        "site": "1400px",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in": "cubic-bezier(0.7, 0, 0.84, 0)",
        "expo-in-out": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
