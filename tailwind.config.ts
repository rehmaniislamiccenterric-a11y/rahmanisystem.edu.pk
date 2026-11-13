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
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#1B2A47',
          900: '#0E1726',
          950: '#070C15',
        },
        gold: {
          50: '#FCF9F0',
          100: '#F7F0DC',
          200: '#EEDFB6',
          300: '#E4CE90',
          400: '#D9BC6A',
          500: '#C5A059',
          600: '#A6823B',
          700: '#846325',
          800: '#654A18',
          900: '#47320D',
        },
        ivory: {
          50: '#FDFAF4',
          100: '#FAF6ED',
          200: '#F4ECE0',
          300: '#EDE2D0',
        },
        academic: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          500: '#0284C7',
          600: '#0369A1',
          700: '#075985',
        }
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'Inter', 'sans-serif'],
        urdu: ['var(--font-noto-urdu)', 'var(--font-amiri)', 'serif'],
        amiri: ['var(--font-amiri)', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
