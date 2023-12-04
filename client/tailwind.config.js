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
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
    },
    colors: {
      customBlueGreen: '#509ea5',
      customBlue: '#5082a5',
      customLightBlue: '#7fadc8',
    },
  },
  },
  plugins: [],
};
