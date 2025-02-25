import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    <nav className="fixed h-screen w-64 bg-gradient-to-b from-black to-[#0f172a] text-white hidden lg:flex flex-col shadow-xl">
      <div className="p-6 border-b border-gray-700 flex justify-between items-center">
        <span className="text-2xl font-bold text-[#9945FF]">SolanaStake</span>
      </div>

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

      <div
        className="relative p-6 border-t border-gray-700 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="w-32 h-10 bg-[#14F195] flex items-center justify-center rounded-md text-black font-bold">
            Logout
          </div>
          <svg
            className="w-5 h-5 text-white ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-[#1E293B] rounded-md shadow-lg z-10">
            <button
              onClick={handleLogout}
              className="text-left px-4 py-2 text-sm text-white hover:bg-[#14F195] hover:text-black rounded-md flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1"
                />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
