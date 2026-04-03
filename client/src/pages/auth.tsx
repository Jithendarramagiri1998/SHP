import { useState } from "react";
import { useLocation } from "wouter";

export default function AuthPage() {
  const [, setLocation] = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     LOGIN / SIGNUP
  ========================= */

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = isLogin ? "/api/login" : "/api/signup";

    const body = isLogin
      ? { email: form.email, password: form.password }
      : form;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // ✅ store tokens
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      setLocation("/");
    } catch {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient-bg px-4">

      <div className="glass-panel p-8 rounded-2xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 gradient-text">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ERROR */}
          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-red-500 outline-none"
            required
          />

          {/* USERNAME */}
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-red-500 outline-none"
              required
            />
          )}

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-red-500 outline-none"
            required
          />

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full p-3 rounded-lg bg-red-600 hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Signup"}
          </button>

          {/* SWITCH */}
          <p
            className="text-center text-sm text-gray-400 cursor-pointer hover:text-white"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Signup"
              : "Already have an account? Login"}
          </p>

        </form>
      </div>

    </div>
  );
}
