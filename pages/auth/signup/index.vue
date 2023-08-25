<template>
	<div class="flex justify-center items-center h-screen">
		<q-card
			flat
			class="max-w-md w-full p-5 drop-shadow-xl rounded-xl ml-4 mr-4"
		>
			<h1 class="text-3xl text-center mb-5 mt-4 text-bold">Sign Up</h1>
			<q-form
				@submit.prevent="signUp"
				class="flex flex-row justify-center items-center"
			>
				<q-input
					v-model="username"
					unmasked-value
					label="Username *"
					hint="This should be unique"
					hide-hint
					class="max-w-xs w-full mt-5"
					lazy-rules
					:rules="[validation.empty, validation.username as any]"
				/>
				<q-input
					v-model="email"
					label="Email *"
					type="email"
					hint="It should previously have not been registered with"
					hide-hint
					class="max-w-xs w-full"
					lazy-rules
					:rules="[
          				validation.empty,
          				validation.email as any
        			]"
				/>
				<q-input
					v-model="pass"
					label="Password *"
					type="password"
					hint="A password of length above 8 is recommended"
					hide-hint
					class="max-w-xs w-full"
					lazy-rules
					:rules="[validation.empty]"
				/>
				<q-input
					v-model="conf_pass"
					label="Confirm Password *"
					type="password"
					hint="It should match with the password above"
					hide-hint
					class="max-w-xs w-full"
					:rules="[validation.empty, validation.match_pass]"
					:reactive-rules="true"
				/>
				<q-toggle
					v-model="accept"
					label="I accept the license and terms"
					color="secondary"
				/>
				<q-btn
					label="Sign Up"
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

const username = ref("");
const email = ref("");
const pass = ref("");
const conf_pass = ref("");
const accept = ref(false);

const validation = {
	empty: (val: string) =>
		(val && val.length > 0) || "This field can't be left empty",

	username: (val: string) =>
		val.match(/^[a-zA-Z0-9_]{3,16}$/) ||
		"Must be 3-16 characters. Alphanumeric and underscores only.",

	email: (val: string): any =>
		val.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ||
		"Not a valid email address",

	match_pass: (val: string): any =>
		val === pass.value || "The passwords do not match",
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

const signUp = async () => {
	try {
		const result = await useAPIFetch("/api/auth/pre-signup", {
			method: "POST",
			body: {
				username: username.value,
				email: email.value,
				password: pass.value,
			},
		});
		notifyUser({
			type: "positive",
			message: "Email sent",
			caption: result.message,
		});
	} catch (err: any) {
		notifyUser({
			type: "negative",
			message: err.message,
		});
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
