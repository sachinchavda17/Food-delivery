import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaUser, FaRegUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import toast from "react-hot-toast";
import { StoreContext } from "../utils/StoreContext";
import { BiFoodMenu } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";

const Navbar = ({ setShowAuth }) => {
  // Get dark mode preference from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, token, setToken, isAdmin } = useContext(StoreContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const adminUrl = process.env.REACT_APP_ADMIN_URL;

  useEffect(() => {
    // Apply dark mode based on the state
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  const handleLogout = () => {
    localStorage.clear("userToken");
    localStorage.clear("adminToken");
    setToken("");
    toast.success("Logged out successfully");
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="fixed z-40 w-full top-0 left-0 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1
            className="text-2xl font-bold text-primary dark:text-primary-dark"
            style={{ fontFamily: "Kalam" }}
          >
            BiteHub24
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium hover:border-b-2 ${
              location.pathname === "/"
                ? "text-primary dark:text-primary-dark border-b-2 border-primary-light "
                : ""
            } `}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className={`text-sm font-medium hover:border-b-2 ${
              location.pathname === "/menu"
                ? "text-primary dark:text-primary-dark border-b-2 border-primary-light "
                : ""
            } `}
          >
            Menu
          </Link>
          {!!token && (
            <Link
              to="/myorders"
              className={`text-sm font-medium hover:border-b-2 ${
                location.pathname === "/myorders"
                  ? "text-primary dark:text-primary-dark border-b-2 border-primary-light "
                  : ""
              } `}
            >
              Orders
            </Link>
          )}
          {!!token && isAdmin && (
            <a
              href={adminUrl}
              target="_blank"
              className={`text-sm font-medium hover:border-b-2 hover:cursor-pointer `}
            >
              Admin
            </a>
          )}
        </div>

        {/* Icons & Sign-In Button */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Search Icon with Dropdown Input */}
          <div className="relative">
            <Link
              className="hidden md:block p-2 rounded-full text-gray-600 dark:text-gray-100"
              to={"/search"}
            >
              <AiOutlineSearch
                className={`text-2xl text-gray-600 dark:text-gray-100 ${
                  location.pathname === "/search"
                    ? "text-primary dark:text-primary-dark"
                    : ""
                } `}
              />
            </Link>
          </div>

          {/* Cart Icon */}
          {token && (
            <Link className="relative hidden md:block" to={"/cart"}>
              <AiOutlineShoppingCart
                className={`text-2xl text-gray-600 dark:text-gray-100 ${
                  location.pathname === "/cart"
                    ? "text-primary dark:text-primary-dark"
                    : ""
                } `}
              />
              {!!cartCount && (
                <span className="absolute -top-2 -right-2 bg-red-500 dark:bg-red-400 rounded-full w-3 h-3" />
              )}
            </Link>
          )}

          {/* Dark Mode Toggle */}
          <button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <FiSun className="text-xl" />
            ) : (
              <FiMoon className="text-xl" />
            )}
          </button>

          {/* User Icon and Dropdown */}
          {token ? (
            <div className="relative">
              <div
                className="hidden md:flex items-center cursor-pointer bg-transparent border border-primary dark:border-primary-dark text-primary p-2 rounded-full hover:text-white hover:bg-primary dark:hover:bg-primary-dark transition"
                onClick={handleDropdownToggle}
              >
                <FaUser size={20} />
              </div>
              <div
                className="flex md:hidden items-center cursor-pointer bg-transparent border border-primary dark:border-primary-dark text-primary p-2 rounded-full hover:text-white hover:bg-primary dark:hover:bg-primary-dark transition"
                onClick={handleDropdownToggle}
              >
                <TbLogout size={20} />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 md:w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-2 z-10">
                  <Link
                    to="/profile"
                    className="hidden md:block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-red-600 dark:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              onClick={() => setShowAuth(true)}
              className="block bg-transparent border border-primary dark:border-primary-dark text-primary px-4 py-2 rounded-full hover:text-white hover:bg-primary dark:hover:bg-primary-dark transition cursor-pointer"
            >
              Sign In
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navbar Links */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 flex justify-around p-2">
        <Link
          to="/"
          className={`flex flex-col items-center ${
            location.pathname === "/"
              ? "text-primary dark:text-primary-dark "
              : ""
          } `}
        >
          <AiOutlineHome className="text-2xl" />
          <span className="text-xs">Home</span>
        </Link>

        {token && (
          <Link
            to="/cart"
            className={`flex flex-col items-center relative ${
              location.pathname === "/cart"
                ? "text-primary dark:text-primary-dark "
                : ""
            } `}
          >
            <AiOutlineShoppingCart className="text-2xl" />
            <span className="text-xs">Cart</span>
            {!!cartCount && (
              <span className="absolute -top-2 -right-2 bg-red-500 dark:bg-red-400 rounded-full w-3 h-3" />
            )}
          </Link>
        )}
        <Link
          to={"/search"}
          className={`flex flex-col items-center ${
            location.pathname === "/search"
              ? "text-primary dark:text-primary-dark "
              : ""
          } `}
        >
          <AiOutlineSearch className="text-2xl" />
          <span className="text-xs">Search</span>
        </Link>

        {!!token && (
          <Link
            to="/myorders"
            className={`flex flex-col items-center ${
              location.pathname === "/myorders"
                ? "text-primary dark:text-primary-dark "
                : ""
            } `}
          >
            <BiFoodMenu className="text-2xl" />
            <span className="text-xs">Orders</span>
          </Link>
        )}
        {!!token && (
          <Link
            to="/profile"
            className={`flex flex-col items-center ${
              location.pathname === "/profile"
                ? "text-primary dark:text-primary-dark "
                : ""
            } `}
          >
            <FaRegUser className="text-2xl" />
            <span className="text-xs">My Profile</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
