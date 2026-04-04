const API_BASE = "";

/* =========================
   GET TOKEN
========================= */
const getAccessToken = () => localStorage.getItem("token");
const getRefreshToken = () => localStorage.getItem("refreshToken");

/* =========================
   SAVE TOKENS
========================= */
const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

/* =========================
   LOGOUT
========================= */
export const logout = () => {
  localStorage.clear();
  window.location.href = "/auth";
};

/* =========================
   REFRESH TOKEN
========================= */
const refreshAccessToken = async () => {
  try {
    const res = await fetch("/api/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: getRefreshToken(),
      }),
    });

    if (!res.ok) throw new Error("Refresh failed");

    const data = await res.json();

    saveTokens(data.accessToken, data.refreshToken);

    return data.accessToken;
  } catch (err) {
    console.error("Refresh failed:", err);
    logout();
    return null;
  }
};

/* =========================
   MAIN API FUNCTION
========================= */
export const apiFetch = async (
  url: string,
  options: RequestInit = {},
  retry = true
) => {
  const token = getAccessToken();

  const res = await fetch(API_BASE + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
  });

  // ✅ If token expired → refresh
  if (res.status === 401 && retry) {
    const newToken = await refreshAccessToken();

    if (!newToken) return null;

    return apiFetch(url, options, false);
  }

  return res;
};
