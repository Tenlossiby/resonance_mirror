/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      }
    },
  },
  safelist: [
    {
      pattern: /(bg|text|border|ring|caret)-(red|purple|sky|orange|pink|yellow|slate|green|cyan)-(200|300|400|500|600|700|900)/,
      variants: ['hover', 'focus', 'dark', 'group-hover'],
    },
    {
      pattern: /from-(red|pink|sky|orange|yellow|slate|purple|green)-(300|400|500|600|900)/,
    },
    {
      pattern: /via-(yellow|purple|pink|white|green|blue|orange|slate)-(200|300|400|500|600|900)/,
    },
    {
      pattern: /to-(purple|blue|sky|pink|cyan|slate|green)-(300|400|500|600|700|900)/,
    },
    {
      pattern: /bg-(.*)\/(5|10|20)/,
      variants: ['dark'],
    }
  ],
  plugins: [],
}