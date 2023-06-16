module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#626ee3",
        secondary: "#e26a6a",
        accent: "#47b89c",
        dialog: "#f8fafc",

        dark: "#324466",
        "dark-page": "#212a3b",

        positive: "#21BA45",
        negative: "#C10015",
        info: "#edc1bb",
        warning: "#F2C037",
      },
    },
  },
  plugins: [],
};
