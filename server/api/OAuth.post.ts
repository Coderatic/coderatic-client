import { assert } from "console";
import fetchAPI from "../utils/fetchAPI.js";

export default defineEventHandler(async (event) => {
  // @ts-ignore
  const body = await readBody(event);
  const { token } = body;
  assert(token, "token is required");
  let res = null;
  try {
    res = await fetchAPI("/api/auth/verify-token", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  } catch (err) {
    return { error: "You session has expired. Please log in again." };
  } finally {
    setCookie(event, "token", token, {
      maxAge: 60 * 60,
      httpOnly: true,
      secure: false,
      sameSite: "none",
      path: "/",
    });
    return res;
  }
});
