import { useUserStore } from "../store/auth.js";
export default defineNuxtRouteMiddleware(async (to, from) => {
	const userStore = useUserStore();
	if (userStore.isLoggedIn) {
		return navigateTo("/");
	}
});
