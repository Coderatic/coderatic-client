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
        const res: any = await useNitroFetch("/api/login", {
          method: "POST",
          body: {
            username: username,
            password: password,
          },
        });
        const { token } = res;
        if (token) {
          const user = await res.user;
          this.user = user;
          this.isLoggedIn = true;
          this.activationToken = token;
        } else {
          this.user = null;
          this.isLoggedIn = false;
          this.activationToken = null;
        }
      } catch (err) {
        alert(err);
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
      const res: any = await useAPIFetch(`/api/auth/signup`, {
        method: "POST",
        params: {
          token: this.activationToken,
        },
      }).catch((err) => {
        alert(err);
      });
      //TODO: Fix this
      if (res.message) {
        alert(res.message);
      }
    },
  },
  persist: true,
});
