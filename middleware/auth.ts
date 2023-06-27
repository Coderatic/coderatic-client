import { useUserStore } from "../store/auth.js";
import token_check from "./token-check.js";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  if (!userStore.user) {
    return navigateTo("/auth/login");
  }
});
