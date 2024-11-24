import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Use the "class" strategy for toggling dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html", // Include any custom HTML files
  ],
  theme: {
    extend: {
      colors: {
        // Neon colors
        neonPink: "#FF69B4",
        neonGreen: "#33CC33",
        neonBlue: "#00BFFF",
        neonYellow: "#CCFF00",
        neonOrange: "#FFA07A",
        neonPurple: "#B300FF",

        // Additional colors
        magenta: "#FF00FF",
        cyan: "#00FFFF",
        electricBlue: "#03A9F4",
        limeGreen: "#32CD32",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.800", "#333"), // Default text color
            a: {
              color: theme("colors.blue.600", "#337ab7"), // Default link color
              "&:hover": {
                color: theme("colors.blue.700", "#23527c"), // Default link hover color
              },
            },
          },
        },
      }),
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          md: "3rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        tiny: ".875rem",
        base: "1rem",
        md: "1.125rem",
        lg: "1.25rem",
        xl: "1.5rem",
        "2xl": "1.75rem",
        "3xl": "2rem",
        "4xl": "2.25rem",
        "5xl": "2.5rem",
        "6xl": "2.75rem",
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      },
      fontWeight: {
        hairline: "100",
        thin: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        none: "none",
      },
      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fade: "fade 0.5s ease-in-out",
      },
    },
  },
  plugins: [typography, forms, aspectRatio],
};
