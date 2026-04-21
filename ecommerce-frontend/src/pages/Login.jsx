import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        null,
        {
          params: { email, password },
        }
      );

      localStorage.setItem("token", response.data);
      navigate("/products");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#080808] text-white min-h-screen flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <h1 className="text-center text-yellow-400 text-xl mb-6 tracking-widest">
          VELORA LOGIN
        </h1>

        <div className="bg-[#111] p-6 rounded-xl border border-gray-800">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-black text-white border border-gray-700 focus:border-yellow-400 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-black text-white border border-gray-700 focus:border-yellow-400 outline-none"
          />

          {error && (
            <p className="text-red-400 text-sm mb-3">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-300 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;