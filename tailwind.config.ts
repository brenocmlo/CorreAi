import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        accent: '#0ea5e9',
        success: '#10b981',
        background: '#f8fafc',
      },
    },
  },
  plugins: [],
}
export default config
