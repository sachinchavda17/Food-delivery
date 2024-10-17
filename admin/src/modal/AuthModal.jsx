import React, { useContext, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineCopy,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../utils/StoreContext";
import { postDataApi } from "../utils/api";
import { useEffect } from "react";
const AuthModal = ({ showAuth, setShowAuth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setToken } = useContext(StoreContext);
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

      const response = await postDataApi("/api/user/login", formData);

      if (!response.success) {
        toast.error(response.error || "An error occurred.");
        return;
      }
      if (response.user.role !== "admin" && response.user.role === "customer") {
        toast.error("Sorry you user can't Login in Admin Panel  ");
        toast.error("Please login via admin email. ");
        return;
      }
      setToken(response.token);
      localStorage.setItem("adminToken", response.token);

      toast.success(response.message || "Login successful.");
      setShowAuth(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.message || "Failed to submit the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  // Function to copy test user credentials
  const handleCopy = () => {
    const testUserCredentials = "Email: test@gmail.com\nPassword: 123456789";
    navigator.clipboard.writeText(testUserCredentials);
    setFormData({ email: "test@gmail.com", password: "123456789" });
    toast.success("Test user credentials copied to clipboard!");
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-background dark:bg-background-dark bg-opacity-100 transition-opacity ${
        showAuth ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-primary dark:text-primary-dark">
          Login into Your Admin Panel
        </h2>
        <form onSubmit={handleSubmit}>
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
              className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-800 rounded border dark:text-ternary border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none pr-10" // Add padding to right for eye icon
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

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Log In"}
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
            onClick={() => navigate("/")}
            className="text-primary dark:text-primary-dark hover:underline"
          >
            If you are not admin call other admin to promote you.
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
