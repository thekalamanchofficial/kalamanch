import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        "brand-primary": "#260EB9",
        "brand-secondary": "#F5F7FE",
        "font-secondary": "#4D5565",
        "font-primary": "#101828",
      },
    },
  },
  plugins: [],
} satisfies Config;
