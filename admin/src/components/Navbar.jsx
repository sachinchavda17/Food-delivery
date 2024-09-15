import React, { useEffect, useState } from "react";
import { RiUserSettingsFill } from "react-icons/ri";
import { FiSun, FiMoon } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className=" fixed z-40 w-full top-0 left-0 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-primary dark:text-primary-dark">
            Tomato.
          </h1>
          <span>Admin panel</span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:border-b-2">
            List Items
          </Link>
          <Link to="/add-item" className="text-sm font-medium hover:border-b-2">
            Add Item
          </Link>
          <Link to="/orders" className="text-sm font-medium hover:border-b-2">
            Order Manage
          </Link>
          
        </div>

        {/* user icon for admin  */}
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
          <span className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <RiUserSettingsFill className="text-xl" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
