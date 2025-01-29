import plugin from 'tailwind-scrollbar';
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
        text: 'var(--text)',
        sidebar: 'var(--sidebar)',
        form: 'var(--form)',
        border: 'var(--border)',        
        interaction: 'var(--interaction)', 
        sending: 'var(--sending)',
        receiving: 'var(--receiving)',       
          
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
      boxShadow: {
        'custom-inset': 'inset 0px 0px 10px 5px rgba(0, 0, 0, 0.5)',
        'custom': '0px 0px 10px 5px rgba(0, 0, 0, 0.5)',
      }, 
      textShadow: {        
        'custom': '5px 5px 10px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [plugin ],
} satisfies Config;
