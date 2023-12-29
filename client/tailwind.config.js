/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './index/**/*.{js,ts,jsx,tsx,mdx}',
    './articles/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
      },
      colors: {
        customBlueGreen: '#509ea5',
        customBlue: '#5082a5',
        customLightBlue: '#7fadc8',

        'dark-background': '#121212',
        'dark-text': '#f0f0f0',
        'dark-accent': '#335e7a',
      },
    },
  },
  plugins: [],
};
