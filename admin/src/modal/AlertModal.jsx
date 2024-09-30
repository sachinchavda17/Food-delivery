import React from "react";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const AlertModal = ({ isOpen, onClose, onDelete, userName }) => {
  
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-sm relative transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <AiOutlineClose className="text-xl" />
        </button>

        {/* Modal Content */}
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Confirm Deletion
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to delete <strong>{userName}</strong>? This
          action cannot be undone.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
