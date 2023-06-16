// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-quasar-ui",
    "@nuxtjs/google-fonts",
  ],
  runtimeConfig: {
    public: {
      APIBaseURL: process.env.BASE_URL || "http://localhost:5000",
    },
  },
  imports: {
    autoImport: true,
  },

  // Libs
  quasar: {
    iconSet: "material-icons",
    config: {
      brand: {
        primary: "#626ee3",
        secondary: "#e26a6a",
        accent: "#47b89c",

        dark: "#324466",
        // @ts-ignore
        "dark-page": "#212a3b",

        positive: "#21BA45",
        negative: "#C10015",
        info: "#edc1bb",
        warning: "#F2C037",
      },
    },
    extras: {
      fontIcons: ["material-icons"],
    },
  },
  googleFonts: {
    families: {
      Roboto: true,
      "Josefin+Sans": true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
    },
  },
});
