import React, { useContext, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
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
      setToken(response.token);
      localStorage.setItem("userToken", response.token);

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

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-90 transition-opacity ${
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

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Log In"}
          </button>
        </form>
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
