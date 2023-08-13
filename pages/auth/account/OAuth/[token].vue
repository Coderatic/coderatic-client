<template>
	<div>
		<h1>Activate Account</h1>
		<!-- TODO: Redesign -->
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/auth";
import { onMounted } from "vue";

onMounted(async () => {
	const { token } = useRoute().params;

	if (!token) {
		navigateTo("/auth/login");
		notifyUser({
			type: "negative",
			message: "There was an error signing you in.",
			caption: "Please try again",
		});
		return;
	}
	try {
		const result = await useAPIFetch("/api/auth/verify-token", {
			method: "POST",
			credentials: "include",
		});
		const userStore = useUserStore();
		userStore.storeSession(result.user, result.token);
		navigateTo("/");
	} catch (error: any) {
		navigateTo("/auth/login");
		notifyUser({
			type: "negative",
			message: "There was an error signing you in.",
			caption: "Please try again",
		});
	}
});

definePageMeta({
	title: "Activate Account",
	description: "Activate your account",
	layout: "empty",
});
</script>
