import React from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(removeUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    navigate("/auth");
  };

  return (
    <nav className="h-screen w-64 bg-gradient-to-b from-black to-[#0f172a] text-white flex flex-col shadow-xl fixed lg:relative">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-700 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-[#9945FF] focus:outline-none"
        >
          SolanaStake
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="flex-1 py-6 space-y-2">
        {[
          { name: "Dashboard", href: "/dashboard" },
          { name: "Calculator", href: "/calculator" },
          { name: "Wallet", href: "/wallet" },
          { name: "Deposit", href: "/deposit" },
          { name: "Withdraw", href: "/withdraw" },
          { name: "Profile", href: "/profile" },
          { name: "Support", href: "/support" },
        ].map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.href)}
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-[#1E293B] hover:text-[#14F195] transition-colors rounded-md w-full"
          >
            <span className="ml-3">{item.name}</span>
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-6 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-[#14F195] text-black py-2 rounded-md font-bold hover:bg-[#12d484] transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
