import { useUserStore } from "../store/auth.js";
const userStore = useUserStore();
export default defineNuxtRouteMiddleware((to, from) => {
  if (userStore.isLoggedIn) {
    return navigateTo("/");
  }
});
