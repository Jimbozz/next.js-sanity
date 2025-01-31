const { theme } = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
    './sanity/lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
    },
    extend: {
      colors: {
        black: '#000000', // Your preferred black color, e.g., true black
        'ot-gray': '#2b2b2b', // Cutom color for OT background mobile nav
        'ot-background': '#f5f5f5', //Background color for website
        'ot-blue': '#0F2FEA', // OT blue for buttons etc
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addUtilities }) {
      addUtilities({
        '.thin-underline': {
          'text-decoration': 'underline',
          'text-decoration-thickness': '2px',
        },
      })
    },
  ],
}
