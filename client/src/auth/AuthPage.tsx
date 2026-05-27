import { useState } from "react";
import { login, register } from "./auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { login: setAuthUser } = useAuth();
  const navigate = useNavigate();

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);

    resetForm();

    setError("");
    setSuccess("");
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!email || !password || (!isLogin && !username)) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const data = await login(email, password);

        if (!data?.token) {
          setError(data?.error || "Login failed");
          return;
        }

        setAuthUser(data.token, data.user);
        navigate("/");
        return;
      }

      // REGISTER
      const data = await register(username, email, password);

      if (data?.error) {
        setError(data.error);
        return;
      }

      resetForm();
      setIsLogin(true);

      setSuccess("Account created successfully. You can now sign in.");
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-900 p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        {/* SUCCESS */}
        {success && (
          <div className="mb-4 rounded-lg border border-green-700 bg-green-900/40 p-3 text-center text-sm text-green-300">
            {success}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-700 bg-red-900/40 p-3 text-center text-sm text-red-300">
            {error}
          </div>
        )}

        {/* USERNAME */}
        {!isLogin && (
          <div className="mb-4">
            <label className="mb-1 block text-sm text-gray-300">Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>
        )}

        {/* EMAIL */}
        <div className="mb-4">
          <label className="mb-1 block text-sm text-gray-300">Email</label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="mb-1 block text-sm text-gray-300">Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Loading..." : isLogin ? "Login" : "Create Account"}
        </button>

        {/* TOGGLE */}
        <p
          className="mt-5 cursor-pointer text-center text-sm text-blue-400 hover:text-blue-300"
          onClick={toggleMode}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
