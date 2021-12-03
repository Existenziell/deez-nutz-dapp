module.exports = {
  purge: [
    "./pages/**/*.js",
    "./pages/**/*.ts",
    "./pages/**/*.jsx",
    "./pages/**/*.tsx",
    "./components/**/*.js",
    "./components/**/*.ts",
    "./components/**/*.jsx",
    "./components/**/*.tsx"
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Nunito'],
      'serif': ['Nunito'],
      'mono': ['Monospace'],
      'display': ['Nunito'],
      'body': ['Nunito']
    },
    extend: {
      colors: {
        // 'brand': '#00A6D7',
        'brand': '#A630A9',
      },
      backgroundImage: {
        'gradient': "url('/gradient.svg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
