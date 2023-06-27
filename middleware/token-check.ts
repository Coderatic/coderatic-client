import { Cookies } from "quasar";
import { useUserStore } from "../store/auth.js";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const res: any = await useAPIFetch(`/api/auth/verify-token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  }).catch((err) => {
    alert(err);
  });
  if (res.status == 200 && res.data._rawValue.token) {
    userStore.setToken(res.data._rawValue.token);
    userStore.isLoggedIn = true;
  } else {
    userStore.setToken(null);
    userStore.isLoggedIn = false;
  }
});
