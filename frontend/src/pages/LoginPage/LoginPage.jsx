import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/LoginPage/useLogin";

function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await login(form);
      // REPLACE instead of push - prevents going back to login
      navigate("/home", { replace: true });
    } catch {
      // error already handled in hook
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-neutral-900 p-8 rounded-xl w-96 relative">
        <button
          className="absolute top-3 right-3 text-gray-400"
          onClick={() => navigate("/", { replace: true })}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Username"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-neutral-800 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-lg bg-neutral-800 outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-lime-500 text-black py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;