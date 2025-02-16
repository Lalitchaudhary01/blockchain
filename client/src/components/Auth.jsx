import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth";

const Auth = ({ closeAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.email ||
      !formData.password ||
      (!isLogin && (!formData.name || !formData.confirmPassword))
    ) {
      setError("All fields are required!");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const url = isLogin
        ? `${API_BASE_URL}/login`
        : `${API_BASE_URL}/register`;
      const { data } = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      closeAuth();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setToken("");
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={closeAuth}
    >
      <div
        className="p-8 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {token ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Welcome! 🎉</h2>
            <button
              onClick={handleLogout}
              className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full">
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-purple-400 transition-all"
              onClick={closeAuth}
              type="button"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold text-white mb-6">
              {isLogin ? "Login" : "Register"}
            </h2>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mb-4 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mb-4 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mb-4 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              required
            />
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 mb-6 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                required
              />
            )}
            {error && (
              <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full p-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white transition-all"
            >
              {isLogin ? "Login" : "Register"}
            </button>
            <p
              className="mt-4 text-sm text-center cursor-pointer text-purple-400 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create an account?" : "Already have an account?"}
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
