import fetchAPI from "../utils/fetchAPI.js";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");
  if (!token) return {};
  try {
    const res: any = await fetchAPI("/api/auth/verify-token", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return { error: "You session has expired. Please log in again." };
  }
});
