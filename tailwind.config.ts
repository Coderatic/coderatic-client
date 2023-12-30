module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
	],
	theme: {
		darkSelector: ".dark-mode",
		extend: {
			screens: {
				sm: "360px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
			},
			colors: {
				white: "#FFFDFA",
				black: "#1F1F1F",
				primary: "#626ee3",
				secondary: "#e26a6a",
				accent: "#47b89c",
				dialog: "#f8fafc",
				dark: "#00001e",
				"dark-page": "#161832",
				positive: "#21BA45",
				negative: "#C10015",
				info: "#edc1bb",
				warning: "#F2C037",
			},
		},
	},
	variants: {
		backgroundColor: [
			"dark",
			"dark-hover",
			"dark-group-hover",
			"dark-even",
			"dark-odd",
			"hover",
			"responsive",
		],
		borderColor: [
			"dark",
			"dark-focus",
			"dark-focus-within",
			"hover",
			"responsive",
		],
		textColor: ["dark", "dark-hover", "dark-active", "hover", "responsive"],
	},
	plugins: [require("tailwindcss-dark-mode")()],
};
