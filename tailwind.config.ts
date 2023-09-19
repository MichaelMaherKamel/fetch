// tailwind.config.js
import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // ...
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: '#0072f5',
          },
        },
        dark: {
          colors: {
            primary: '#0072f5',
          },
        },
      },
    }),
  ],
}

export default config
