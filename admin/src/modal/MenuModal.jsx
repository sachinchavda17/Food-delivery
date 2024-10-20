import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { fileUploadHandler } from "../utils/api";
import { StoreContext } from "../utils/StoreContext";

const ManageModal = ({ isOpen, setIsOpen, currentMenu, setMenuData }) => {
  const [name, setName] = useState(currentMenu ? currentMenu.name : "");
  const [image, setImage] = useState(currentMenu ? currentMenu.image : null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { token } = useContext(StoreContext);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto"; // Ensure scrolling is re-enabled when modal closes
    }
    // Cleanup in case of component unmount
    return () => {
      document.body.style.overflowY = "auto"; // Reset on unmount
    };
  }, [isOpen]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) {
      toast.error("Name and image are required");
      return;
    }
  
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
  
      const response = currentMenu
        ? await fileUploadHandler(
            `/api/menu/update/${currentMenu._id}`,
            "put",
            formData,
            token
          )
        : await fileUploadHandler("/api/menu/create", "post", formData, token);
  
      if (response.success) {
        toast.success(currentMenu ? "Menu updated" : "Menu created");
        setMenuData((prevItems) => {
          if (currentMenu) {
            return prevItems.map((item) =>
              item._id === currentMenu._id ? { ...item, ...response.menuItem } : item
            );
          } else {
            return [...prevItems, response.menuItem];
          }
        });
        setIsOpen(false); // Ensure the modal closes after success
      } else {
        toast.error(response.error || "Failed to save menu");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error saving menu");
    } finally {
      setLoading(false); // Ensure loading is reset
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-xl font-semibold mb-4 dark:text-ternary">
          {currentMenu ? "Edit Menu" : "Add New Menu"}
        </h2>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <AiOutlineClose className="text-xl" />
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-200 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Upload Image
            </label>
            <div
              className={`border border-dashed p-4 rounded-lg flex justify-center items-center ${
                isDragging ? "border-blue-500" : "border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleImageDrop}
            >
              <input
                type="file"
                className="hidden"
                id="image-upload"
                onChange={handleImageChange}
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center justify-center dark:text-ternary"
              >
                <AiOutlineCloudUpload className="text-2xl mb-2" />
                {image ? (
                  <div className="flex items-center justify-center gap-5">
                    <span>
                      {typeof image === "object"
                        ? "Image selected:"
                        : "Existing Image:"}
                    </span>
                    <img
                      src={
                        typeof image === "object"
                          ? URL.createObjectURL(image)
                          : image
                      }
                      alt=""
                      className="w-20"
                    />
                  </div>
                ) : (
                  <span className="text-gray-500">
                    {isDragging
                      ? "Drop the image here"
                      : "Drag & Drop your image here, or browse"}
                  </span>
                )}
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default ManageModal;
