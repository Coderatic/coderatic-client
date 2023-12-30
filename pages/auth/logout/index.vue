<template></template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "../../../store/auth.js";
import notifyUser from "../../../composables/notifyUser.js";

const userStore = useUserStore();
onMounted(async () => {
	await userStore.logOut();
	notifyUser({
		type: "positive",
		message: "Logged out successfully",
	});
	await navigateTo("/");
});
</script>
