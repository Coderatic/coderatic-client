import { useUserStore } from "../../../store/auth";
import fetchAPI from "../../utils/fetchAPI.js";

export default eventHandler(async (event) => {
  const token = event.context.params.token;
  if (!token) return {};
  try {
    const res: any = await fetchAPI(`/api/auth/verify-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userStore = useUserStore();
    const user = res.user;
    userStore.user = user;
    userStore.isLoggedIn = true;
    userStore.activationToken = token;
    return { message: "Account activated!" };
    sendRedirect(event, "/");
  } catch (err) {
    console.log(err);
    return { error: "You session has expired. Please log in again." };
  }
});
