<template>
	<div>
		<h1>Activate Account</h1>
		<!-- Add your activation logic here -->
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/auth";
import { onMounted } from "vue";

onMounted(async () => {
	const { token } = useRoute().params;

	if (token) {
		const userStore = useUserStore();
		userStore.activateAccount(token as string);
		navigateTo("/auth/login");
		notifyUser({
			type: "positive",
			message: "Account activated",
			caption: "Please log in to continue",
		});
	}
});

definePageMeta({
	title: "Activate Account",
	description: "Activate your account",
	layout: "empty",
});
</script>
