import { Primary } from "@/components/Button/Button.stories";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        info: {
          DEFAULT: colors.blue[400],
          text: colors.blue[700],
          background: colors.blue[100],
          border: colors.blue[500],
        },
        error: {
          DEFAULT: colors.red[400],
          text: colors.red[700],
          background: colors.red[100],
          border: colors.red[500],
        },
        success: {
          DEFAULT: colors.green[400],
          text: colors.green[700],
          background: colors.green[100],
          border: colors.green[500],
        },
        warning: {
          DEFAULT: colors.yellow[300],
          text: colors.yellow[700],
          background: colors.yellow[100],
          border: colors.yellow[500],
        },
        neutral: {
          dark: colors.neutral[700],
        },
        stroke: {
          secondary: colors.neutral[500],
          tertiary: colors.gray[100],
        },
        icon: {
          primary: colors.neutral[400],
          active: colors.zinc[600],
        },
      },
      textColor: {
        primary: colors.neutral[700],
        success: colors.green[700],
        warning: colors.yellow[700],
        danger: colors.red[700],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Archivo: ["Archivo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
