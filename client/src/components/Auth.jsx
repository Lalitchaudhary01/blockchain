import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isOtpVerification, setIsOtpVerification] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!isLogin && (!name || password !== confirmPassword)) {
      toast.error("Please fill all fields and ensure passwords match.");
      return;
    }

    setLoading(true);
    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const payload = isLogin
      ? { email, password }
      : { name, email, password, confirmPassword };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success(isLogin ? "Login successful!" : "OTP Sent to Email");
        if (isLogin) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify({ name, email }));
          dispatch(setUser({ name, email }));
          navigate("/");
        } else {
          setIsOtpVerification(true);
        }
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Network error. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, password }),
        }
      );
      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success("Account verified! You can now log in.");
        setIsOtpVerification(false);
        setIsLogin(true);
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-neutral-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isOtpVerification ? "Verify OTP" : isLogin ? "Login" : "Register"}
        </h2>

        {isOtpVerification ? (
          <form onSubmit={handleOtpVerification}>
            <div className="mb-4">
              <label className="block text-sm font-medium">OTP</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleAuth}>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium"
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Register"}
            </button>
          </form>
        )}
        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-400 hover:text-purple-300 underline"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
