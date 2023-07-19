import { useNitroFetch } from "~/composables/useNitroFetch.js";
import { useUserStore } from "../store/auth.js";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  if (userStore.isLoggedIn) return;
  try {
    const res: any = await useNitroFetch(`/api/token`, {
      method: "POST",
    });
    if (!res) {
      userStore.setToken(null);
      userStore.isLoggedIn = false;
      return;
    }
    if (res.token != null) {
      userStore.setToken(res.token);
      userStore.isLoggedIn = true;
    } else {
      userStore.setToken(null);
      userStore.isLoggedIn = false;
    }
  } catch (err) {
    userStore.setToken(null);
    userStore.isLoggedIn = false;
    alert(err);
  }
});
