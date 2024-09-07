import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary dark:text-primary-dark">
            Tomato.
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link to="/menu" className="text-sm font-medium hover:underline">
            Menu
          </Link>
          <Link to="/cart" className="text-sm font-medium hover:underline">
            Cart
          </Link>
          <Link to="/orders" className="text-sm font-medium hover:underline">
            Orders
          </Link>
          <Link to="/about" className="text-sm font-medium hover:underline">
            About Us
          </Link>
        </div>

        {/* Icons & Sign-In Button */}
        <div className="flex items-center space-x-6">
          {/* Search Icon with Dropdown Input */}
          <div className="relative">
            <button
              className="p-2 rounded-full text-gray-600 dark:text-gray-100"
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
          <button className="relative">
            <AiOutlineShoppingCart className="text-2xl text-gray-600 dark:text-gray-100" />
            <span className="absolute -top-2 -right-2 bg-red-500 dark:bg-red-400 rounded-full w-3 h-3"></span>
          </button>

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

          {/* Sign-In Button */}
          <Link
            to="/signin"
            className="hidden md:block bg-transparent border border-primary dark:border-primary-dark text-primary dark:text-primary-dark px-4 py-2 rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary-dark transition"
          >
            Sign In
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-800 dark:text-gray-100 focus:outline-none"
            >
              {isOpen ? (
                <AiOutlineClose className="text-2xl" />
              ) : (
                <AiOutlineMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-gray-50 dark:bg-gray-800`}
      >
        <div className="px-4 pt-2 pb-3 space-y-2">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Menu
          </Link>
          <Link
            to="/cart"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Cart
          </Link>
          <Link
            to="/orders"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Orders
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            About Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
