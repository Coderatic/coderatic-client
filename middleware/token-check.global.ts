import { useUserStore } from "../store/auth.js";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const userStore = useUserStore();
	if (to.path.includes("/auth/account/OAuth")) return;
	userStore.verifyToken();
});
