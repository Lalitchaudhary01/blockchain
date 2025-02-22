import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, removeUser } from "../redux/userSlice"; // Only keep setUser and removeUser

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.user); // Access user from Redux
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate("/auth"); // Navigate to Auth Page
  };

  const handleLogout = async () => {
    try {
      dispatch(removeUser());
      localStorage.removeItem("token"); // Clear token from local storage
      localStorage.removeItem("user"); // Clear user info from local storage
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Live Stats", path: "/livestats" },
    { name: "Staking", path: "/staking" },
    { name: "Security", path: "/security" },
    { name: "Guide", path: "/guide" },
    { name: "Support", path: "/support" },
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(setUser(storedUser)); // Set the user from localStorage into Redux state
    }
  }, [dispatch]);

  return (
    <nav className="fixed w-full z-50 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-purple-500">
            SolStake
          </Link>
          <div className="hidden md:flex space-x-6">
            {navLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="text-gray-300 hover:text-white text-sm font-medium transition-all"
              >
                {name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4 relative">
            {user ? (
              <div className="relative">
                <button
                  className="text-white font-medium bg-purple-700 px-4 py-2 rounded-lg"
                  onClick={toggleDropdown}
                >
                  {user.name}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-neutral-800 text-white rounded-lg shadow-lg">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-neutral-700"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium animate-pulse"
                onClick={handleLogin}
              >
                Login & Register
              </button>
            )}
            <button
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-neutral-800"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden bg-neutral-900 px-4 pt-2 pb-4 space-y-2 transition-all ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        {navLinks.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className="block text-gray-300 hover:text-white text-base font-medium transition-all"
            onClick={closeMobileMenu}
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
