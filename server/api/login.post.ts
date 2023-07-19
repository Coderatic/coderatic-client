import fetchAPI from "../utils/fetchAPI.js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;
  try {
    const res: any = await fetchAPI("/api/auth/login", {
      method: "POST",
      body: {
        username: username,
        password: password,
      },
    });
    const ONE_HOUR = 60 * 60;
    setCookie(event, "token", res.token, {
      maxAge: ONE_HOUR,
      httpOnly: true,
      secure: false,
      sameSite: "none",
      path: "/",
    });
    return res;
  } catch (err) {
    alert(err);
  }
});
