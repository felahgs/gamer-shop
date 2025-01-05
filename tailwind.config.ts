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
        neutral: {
          dark: colors.neutral[700],
        },
        stroke: {
          secondary: colors.neutral[400],
          tertiary: colors.gray[100],
        },
        icon: {
          primary: colors.neutral[400],
          active: colors.zinc[600],
        },
      },
      textColor: {
        primary: colors.neutral[700],
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
