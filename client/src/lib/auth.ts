/* =========================
   GET USER
========================= */
export const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

/* =========================
   GET TOKEN
========================= */
export const getToken = () => {
  return localStorage.getItem("token");
};

/* =========================
   CHECK LOGIN
========================= */
export const isLoggedIn = () => {
  return !!getToken();
};

/* =========================
   CHECK ADMIN
========================= */
export const isAdmin = () => {
  const user = getUser();
  return user?.role === "admin";
};

/* =========================
   LOGOUT
========================= */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  window.location.href = "/auth";
};

/* =========================
   SAVE USER (OPTIONAL HELPER)
========================= */
export const setUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

/* =========================
   SAVE TOKENS
========================= */
export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};
