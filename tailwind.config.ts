import typography from '@tailwindcss/typography'

const config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
}
export default config
