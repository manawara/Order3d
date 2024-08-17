import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['var(--font-manrope)'],
        montserrat: ['var(--font-montserrat)'],
      },
      colors: {
        greenLight: '#36A8B7',
        greenDark: '#051212',
        green: '#0B3338',
      },
    },
  },
  plugins: [],
}
export default config
