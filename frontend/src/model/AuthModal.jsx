import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCopy,
} from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../utils/StoreContext";
import { postDataApi } from "../utils/api";

const AuthModal = ({ showAuth, setShowAuth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSignupMode, setIsSignupMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token, setToken, setIsAdmin } = useContext(StoreContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (isSignupMode && formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      const endpoint = isSignupMode ? "/api/user/register" : "/api/user/login";
      const response = await postDataApi(endpoint, formData);

      if (!response.success) {
        toast.error(response.error || "An error occurred.");
        return;
      }

      setToken(response.token);
      if (response?.user?.role === "customer") {
        localStorage.setItem("userToken", response.token);
        setIsAdmin(false);
      } else {
        localStorage.setItem("adminToken", response.token);
        setIsAdmin(true);
      }
      toast.success(response.message || "Login successful.");
      setShowAuth(false); // Close modal after submission
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.message || "Failed to submit the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to copy test user credentials
  const handleCopy = () => {
    const testUserCredentials = "Email: test@gmail.com\nPassword: 123456789";
    navigator.clipboard.writeText(testUserCredentials);
    setFormData({ email: "test@gmail.com", password: "123456789" });
    toast.success("Test user credentials copied to clipboard!");
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
                className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-800 dark:text-ternary rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none"
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
              className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-800 dark:text-ternary rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none"
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
              className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-800 dark:text-ternary rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 top-6 text-3xl right-2 flex items-center justify-center"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="text-gray-400 dark:text-gray-600" />
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
                className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-800 dark:text-ternary rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none pr-10"
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

        {/* Test User Information */}
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 text-center">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Test User Information
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-1">
            <strong>Email:</strong> test@gmail.com
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            <strong>Password:</strong> 123456789
          </p>
          <button
            onClick={handleCopy}
            className="inline-flex items-center text-primary dark:text-primary-dark hover:underline"
          >
            <AiOutlineCopy className="mr-1" /> Copy Credentials
          </button>
        </div>
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
