import React, { useEffect, useState, useContext } from "react";
import { RiUserSettingsFill, RiFunctionAddFill } from "react-icons/ri";
import { FiSun, FiMoon } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../utils/StoreContext"; // Assuming you are using a context for user token
import toast from "react-hot-toast";
import { GoHomeFill } from "react-icons/go";
import { BiSolidFoodMenu } from "react-icons/bi";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaUsers } from "react-icons/fa6";

const Navbar = ({ setShowAuth }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { token, setToken } = useContext(StoreContext); // Assuming you have a token in context
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear("userToken");
    setToken("");
    toast.success("Logged out successfully");
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="fixed z-40 w-full top-0 left-0 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo Section */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1
            className="text-2xl font-bold text-primary dark:text-primary-dark "
            style={{ fontFamily: "Kalam"}}
          >
            BiteHub24
          </h1>
          <span>Admin panel</span>
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
            List Items
          </Link>

          <Link
            to="/orders"
            className={`text-sm font-medium hover:border-b-2 ${
              location.pathname === "/orders"
                ? "text-primary dark:text-primary-dark border-b-2 border-primary-light "
                : ""
            } `}
          >
            Order Manage
          </Link>
          <Link
            to="/users"
            className={`text-sm font-medium hover:border-b-2 ${
              location.pathname === "/users"
                ? "text-primary dark:text-primary-dark border-b-2 border-primary-light "
                : ""
            } `}
          >
            User Manage
          </Link>
          <Link
            to="/menus"
            className={`text-sm font-medium hover:border-b-2 ${
              location.pathname === "/menus"
                ? "text-primary dark:text-primary-dark border-b-2 border-primary-light "
                : ""
            } `}
          >
            Menu Manage
          </Link>
        </div>

        {/* User and Dark Mode Toggle */}
        <div className="flex items-center space-x-6">
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

          {/* User Icon */}
          {token ? (
            <div className="relative">
              <span
                className="flex items-center cursor-pointer bg-transparent border border-primary dark:border-primary-dark text-primary p-2 rounded-full hover:text-white hover:bg-primary dark:hover:bg-primary-dark transition"
                onClick={toggleDropdown}
              >
                <RiUserSettingsFill className="text-xl" />
              </span>

              {/* Dropdown for Logged-In User */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-2 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
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

      {/* Mobile Bottom Navigation */}
      <div className="fixed inset-x-0 bottom-0 bg-gray-50 dark:bg-gray-800 md:hidden flex justify-around py-2">
        <Link
          to="/"
          className={`flex flex-col items-center  ${
            location.pathname === "/"
              ? "text-primary dark:text-primary-dark "
              : ""
          } `}
        >
          <GoHomeFill className="text-2xl" />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          to="/orders"
          className={`flex flex-col items-center ${
            location.pathname === "/orders"
              ? "text-primary dark:text-primary-dark "
              : ""
          } `}
        >
          <BiSolidFoodMenu className="text-2xl" />
          <span className="text-xs">Order's</span>
        </Link>
        <Link
          to="/users"
          className={`flex flex-col items-center ${
            location.pathname === "/users"
              ? "text-primary dark:text-primary-dark "
              : ""
          } `}
        >
          <FaUsers className="text-2xl" />
          <span className="text-xs">User's</span>
        </Link>
        <Link
          to="/menus"
          className={`flex flex-col items-center ${
            location.pathname === "/menus"
              ? "text-primary dark:text-primary-dark "
              : ""
          } `}
        >
          <TfiMenuAlt className="text-2xl" />
          <span className="text-xs">Menu's</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
