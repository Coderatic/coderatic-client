import { defineStore } from "pinia";
import { IUser, IAuthState } from "./types/auth.types";

export const useUserStore = defineStore("user", {
	state: (): IAuthState => ({
		user: null,
		isLoggedIn: false,
	}),

	actions: {
		async logIn(username: string, password: string) {
			try {
				const result = await useAPIFetch("/api/auth/login", {
					method: "POST",
					body: {
						username: username,
						password: password,
					},
					credentials: "include",
				});
				const { user } = result;
				this.storeSession(user);
			} catch (err: any) {
				this.deleteSession();
				notifyUser({
					type: "negative",
					message: err.message,
				});
			}
		},

		async verifyToken() {
			const route = useRoute();
			if (!document.cookie.includes("token_set")) {
				this.deleteSession();
				return;
			}
			try {
				const result = await useAPIFetch(`/api/auth/verify-token`, {
					method: "POST",
					credentials: "include",
				});
				this.storeSession(result.user);
			} catch (err: any) {
				this.deleteSession();
				showDialog({
					type: "warning",
					title: "Session Expired",
					message: "Your session has expired. Please log in again.",
					confirmText: "Log In",
					cancelText: "Dismiss",
					onOk: async () => {
						await navigateTo(
							`/auth/login?redirect=${route.fullPath}`
						);
					},
				});
			}
		},

		storeSession(user: IUser) {
			this.user = user;
			this.isLoggedIn = true;
		},

		async deleteSession() {
			if (this.user) {
				await useAPIFetch(`/api/auth/logout`, {
					method: "POST",
					credentials: "include",
				});
			}
			this.user = null;
			this.isLoggedIn = false;
		},

		async activateAccount(presignup_token: string) {
			try {
				const result = await useAPIFetch(`/api/auth/signup`, {
					method: "POST",
					params: {
						token: presignup_token,
					},
				});
			} catch (err: any) {
				notifyUser({
					type: "negative",
					message: err.data.message,
				});
			}
		},
	},
	persist: true,
});
