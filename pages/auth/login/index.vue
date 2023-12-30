<template>
	<div class="flex justify-center items-center h-screen">
		<q-card class="max-w-md w-full p-5 rounded-xl ml-4 mr-4" flat>
			<h1 class="text-3xl text-center mb-5 mt-4 text-bold">Login</h1>
			<q-form
				@submit.prevent="logIn"
				class="flex flex-row justify-center items-center"
			>
				<q-input
					v-model="username"
					unmasked-value
					label="Username *"
					lazy-rules
					class="max-w-xs w-full mt-5"
					:rules="[validation.empty, validation.username as any]"
				/>
				<q-input
					v-model="password"
					label="Password *"
					type="password"
					lazy-rules
					class="max-w-xs w-full"
					:rules="[validation.empty, validation.password]"
				/>
				<q-btn
					label="Log In"
					type="submit"
					color="secondary"
					class="w-[80%] rounded-full mt-6"
				/>
				<div
					class="flex flex-col flex-nowrap justify-center items-center mt-3 mb-12 w-[80%]"
				>
					<div
						class="flex flex-row flex-nowrap justify-center items-center"
					>
						<span
							class="flex-grow border-t border-gray-300 min-w-full"
						/>
						<h4 class="px-4 text-center">OR</h4>
						<span
							class="flex-grow border-t border-gray-300 min-w-full"
						/>
					</div>
					<q-btn
						v-for="provider in providers"
						:key="provider.name"
						:label="provider.name"
						:color="provider.color"
						:icon="provider.icon"
						:class="provider.class"
						:href="provider.loginUrl"
						target="_blank"
						class="rounded-full min-w-full mb-3"
						no-caps
					/>
				</div>
			</q-form>
		</q-card>
	</div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
import { useUserStore } from "../../../store/auth.js";

const username = ref("");
const password = ref("");

const validation = {
	empty: (val: string) =>
		(val && val.length > 0) || "This field can't be left empty",

	username: (val: string) =>
		val.match(/^[a-zA-Z0-9_]{3,16}$/) ||
		"Must be 3-16 characters. Alphanumeric and underscores only.",
	password: (val: string) =>
		val.length >= 8 || "Must be at least 8 characters long",
};
const providers = [
	{
		name: "Google",
		icon: "fab fa-google",
		class: "google-btn",
		loginUrl: `${config.public.APIBaseURL}/api/oauth/google`,
	},
	{
		name: "GitHub",
		icon: "fab fa-github",
		color: "black",
		loginUrl: `${config.public.APIBaseURL}/api/oauth/github`,
	},
	{
		name: "Discord",
		icon: "fab fa-discord",
		class: "discord-btn",
		loginUrl: `${config.public.APIBaseURL}/api/oauth/discord`,
	},
];

const logIn = async () => {
	const userStore = useUserStore();
	await userStore.logIn(username.value, password.value);
	if (userStore.isLoggedIn) {
		navigateTo((route.query.redirect as string) || "/");
	}
};

definePageMeta({
	layout: "empty",
	middleware: ["guest"],
});
</script>

<style scoped>
.google-btn {
	background-color: #dd4b39;
	color: white;
}
.discord-btn {
	background-color: #7289da;
	color: white;
}
.custom-line {
	color: #000;
	height: 1px;
	width: 50%;
	margin: 0 auto;
}
</style>
