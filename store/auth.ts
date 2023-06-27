import { defineStore } from "pinia";
import { Cookies } from "quasar";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    activationToken: null as string | null,
    isLoggedIn: false as boolean,
  }),

  actions: {
    async logIn(username: string, password: string) {
      const res: any = await useAPIFetch(`/api/auth/signin`, {
        method: "POST",
        body: {
          username: username,
          password: password,
        },
      }).catch((err) => {
        alert(err);
      });
      const { token: res_token } = res.data._rawValue;
      if (res_token) {
        const user = await res.data._rawValue.user;
        this.user = user;
        this.isLoggedIn = true;
        this.activationToken = res_token;
        console.log("Cookie set");
        
      } else {
        this.user = null;
        this.isLoggedIn = false;
        this.activationToken = null;
      }
    },

    setToken(token: string | null) {
      this.activationToken = token;
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
      if (res.message) {
        alert(res.message);
      }
    },
  },
  persist: true,
});
