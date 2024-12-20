/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          base: "#FF93C4",
          light: "#FFA3C9",
          dark: "#FF7EB8",
        },

        secondary: {
          base: "#FFF48B",
          light: "#FFF8BA",
          dark: "#FDF391",
        },
        tertiary: {
          base: "#EC297B",
          light: "#FF61A3",
          dark: "#C02365",
        },
        info: "#7DD3FC",
        success: "#86EFAC",
        warning: "#FCD34",
        error: "#DC2626",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
