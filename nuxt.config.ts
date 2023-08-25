// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	app: {
		head: {
			link: [
				{
					rel: "stylesheet",
					href: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.8/katex.min.css",
				},
				{
					rel: "stylesheet",
					href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css",
				},
				{
					rel: "stylesheet",
					href: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css",
				},
			],
		},
	},
	modules: [
		"@nuxtjs/tailwindcss",
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
		"@nuxtjs/color-mode",
		"nuxt-quasar-ui",
		//"@nuxtjs/google-fonts",
	],

	runtimeConfig: {
		public: {
			APIBaseURL: process.env.API_BASE_URL || "http://localhost:5000",
			NitroBaseURL: process.env.NITRO_BASE_URL || "http://localhost:3000",
		},
	},

	quasar: {
		iconSet: "mdi-v7",
		plugins: ["Notify", "Dialog"],
		config: {
			dark: "auto",
			brand: {
				primary: "#626ee3",
				secondary: "#e26a6a",
				accent: "#47b89c",
				dark: "#161832",
				positive: "#21BA45",
				negative: "#e06060",
				info: "#edc1bb",
				warning: "#F2C037",
			},
			notify: {
				position: "top",
				timeout: 2000,
				textColor: "white",
			},
		},
		extras: {
			fontIcons: ["mdi-v7", "fontawesome-v6"],
		},
	},
	// googleFonts: {
	// 	families: {
	// 		Roboto: true,
	// 		"Josefin+Sans": true,
	// 		Lato: [100, 300],
	// 		Raleway: {
	// 			wght: [100, 400],
	// 			ital: [100],
	// 		},
	// 	},
	// },
	colorMode: {
		preference: "system",
		fallback: "light",
	},
});
