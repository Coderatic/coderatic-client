import { defineStore } from "pinia";
import { Cookies } from "quasar";
import { useNitroFetch } from "~/composables/useNitroFetch";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as Object | null,
    activationToken: null as string | null,
    isLoggedIn: false as boolean,
  }),

  actions: {
    async logIn(username: string, password: string) {
      try {
        const { data, error } = await useNitroFetch("/api/login", {
          method: "POST",
          body: {
            username: username,
            password: password,
          },
        });
        console.log("data", data);
        console.log("error", error);
        if (error.value) {
          console.log("error", error);
          throw error.value;
        }
        const { token } = data.value;
        if (token) {
          const user = await data.value.user;
          this.user = user;
          this.isLoggedIn = true;
          this.activationToken = token;
        } else {
          this.user = null;
          this.isLoggedIn = false;
          this.activationToken = null;
        }
      } catch (err: any) {
        notifyUser({
          type: "negative",
          message: err.message,
        });
      }
    },

    setToken(token: string | null) {
      this.activationToken = token;
      this.isLoggedIn = token ? true : false;
    },

    setUser(user: Object) {
      this.user = user;
    },

    async activateAccount() {
      try {
        const { data, error } = await useAPIFetch(`/api/auth/signup`, {
          method: "POST",
          params: {
            token: this.activationToken,
          },
        });
        // @ts-ignore
        data.value.user = this.user;
        if (error.value) {
          throw error.value;
        }
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
