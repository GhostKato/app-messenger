import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        one: 'var(--bg-one)',
        two: 'var(--bg-two)', 
        transparent: 'var(--bg-transparent)',
        hover: 'var(--hover)',
        button: 'var(--text-button)', 
        text: 'var(--text)',
        gray: 'var(--border-gray)',
        red: 'var(--border-red)',     
              
      },
      backgroundImage: {
        'cool-gradient': 'linear-gradient(to right, #ff7e5f, #feb47b, #6a11cb, #2575fc)',
      },
      animation: {
        'gradient-move': 'gradientMove 30s ease infinite', 
      },
      keyframes: {
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
