import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaUser, FaRegUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import toast from "react-hot-toast";
import { StoreContext } from "../utils/StoreContext";
import { BiFoodMenu } from "react-icons/bi";
import { AiOutlineHome, AiOutlineAppstore } from "react-icons/ai";

const Navbar = ({ setShowAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Get dark mode preference from localStorage or default to false
    return localStorage.getItem("darkMode") === "true";
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { cartCount, token, setToken, isAdmin } = useContext(StoreContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Apply dark mode based on the state
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save dark mode preference to localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  const handleLogout = () => {
    localStorage.clear("userToken");
    setToken("");
    toast.success("Logged out successfully");
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="fixed z-40 w-full top-0 left-0 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md">
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
        <div className="hidden lg:flex items-center space-x-6">
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
          {isAdmin && (
            <div to="/admin" className={`text-sm font-medium hover:border-b-2`}>
              Admin
            </div>
          )}
        </div>

        {/* Icons & Sign-In Button */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Search Icon with Dropdown Input */}
          <div className="relative">
            <button
              className="hidden md:block p-2 rounded-full text-gray-600 dark:text-gray-100"
              onClick={handleSearchToggle}
            >
              <AiOutlineSearch className="text-2xl" />
            </button>
            {searchOpen && (
              <div className="absolute top-12 left-0 flex items-center bg-gray-100 dark:bg-gray-800 p-2 rounded-full w-64 shadow-lg">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="bg-transparent text-gray-800 dark:text-gray-100 focus:outline-none w-full pl-2"
                />
                <span className="ml-2 text-xl text-gray-600 dark:text-gray-100">
                  →
                </span>
              </div>
            )}
          </div>

          {/* Cart Icon */}
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
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 flex justify-around p-2">
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

        <Link
          to="/cart"
          className={`flex flex-col items-center ${
            location.pathname === "/cart"
              ? "text-primary dark:text-primary-dark "
              : ""
          } `}
        >
          <AiOutlineShoppingCart className="text-2xl" />
          <span className="text-xs">Cart</span>
        </Link>
        <div
          className={`flex flex-col items-center ${
            isOpen ? "text-primary dark:text-primary-dark" : ""
          }`}
          onClick={toggleMenu}
        >
          <AiOutlineAppstore className="text-2xl" />
          <span className="text-xs">Menu</span>
        </div>
        {token ? (
          <div
            className={`flex flex-col items-center ${
              location.pathname === "/profile"
                ? "text-primary dark:text-primary-dark"
                : ""
            } `}
            onClick={handleDropdownToggle}
          >
            <FaRegUser className="text-2xl" />
            <span className="text-xs">Profile</span>
          </div>
        ) : (
          <div
            onClick={() => setShowAuth(true)}
            className={`flex flex-col items-center ${
              isOpen ? "text-primary dark:text-primary-dark" : ""
            }`}
          >
            <FaUser className="text-2xl" />
            <span className="text-xs">Sign In</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
