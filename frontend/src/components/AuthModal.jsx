import React, { useContext, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { toast, Toaster } from "react-hot-toast";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import { StoreContext } from "../utils/StoreContext";
const AuthModal = ({ showAuth, setShowAuth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSignupMode, setIsSignupMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [cookies, setCookie, removeCookie] = useCookies(["foodToken"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (isSignupMode && formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      const endpoint = isSignupMode ? "/api/user/register" : "/api/user/login";
      const response = await fetch("http://localhost:8000" + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        toast.error(result.error || "An error occurred.");
        return;
      }
      setToken(result.token);
      localStorage.setItem("userToken", result.token); // Save user info
      // if (result?.user?.role === "admin") {
      //   window.location.href = "https://sachinchavda.vercel.app"; // Redirect to admin project URL
      // }

      toast.success(result.message || "Login successful.");
      setShowAuth(false); // Close modal after submission
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50 transition-opacity ${
        showAuth ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={() => setShowAuth(false)}
          className="absolute top-5 right-5 text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition"
        >
          <AiOutlineClose className="text-xl" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-primary dark:text-primary-dark">
          {isSignupMode ? "Sign Up" : "Log In"}
        </h2>
        <form onSubmit={handleSubmit}>
          {isSignupMode && (
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          )}
          <div className="mb-4 relative">
            <label className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none pr-10" // Add padding to right for eye icon
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 top-6 text-3xl  right-2 flex items-center justify-center"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="text-gray-400 dark:text-gray-600 " />
              ) : (
                <AiOutlineEye className="text-gray-400 dark:text-gray-600" />
              )}
            </button>
          </div>
          {isSignupMode && (
            <div className="mb-4 relative">
              <label className="block text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none pr-10" // Add padding to right for eye icon
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 top-6 text-3xl right-2 flex items-center"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-400 dark:text-gray-600" />
                ) : (
                  <AiOutlineEye className="text-gray-400 dark:text-gray-600" />
                )}
              </button>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Processing..."
              : isSignupMode
              ? "Sign Up"
              : "Log In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignupMode(!isSignupMode)}
            className="text-primary dark:text-primary-dark hover:underline"
          >
            {isSignupMode
              ? "Already have an account? Log In"
              : "Need an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
