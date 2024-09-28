import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import toast from "react-hot-toast";

const MenuModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: initialData || { name: "", image: null },
  });

  const [image, setImage] = useState(initialData?.image || null);

  if (!isOpen) return null;

  // const handleFormSubmit = async (data) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", data.name);

  //     // Append image if a new file is selected
  //     if (image && typeof image === "object") {
  //       formData.append("image", image); // Ensure image is appended
  //     }

  //     console.log("FormData before submission:", formData);

  //     await onSubmit(formData); // Submit the form data to parent
  //     resetForm();
  //   } catch (error) {
  //     toast.error("Failed to submit the form.");
  //   }
  // };
  const handleFormSubmit = async (data) => {
    // const formData = new FormData();
    // formData.append("name", data.name);
    // if (image) {
    //   formData.append("image", image); // Ensure this matches the expected field name
    // }

    console.log("FormData before submission:", data); // Debugging line
    await onSubmit(data); // Call the onSubmit prop
    // reset(); // Reset form after submission
  };
  const resetForm = () => {
    reset(); // Reset the form values using react-hook-form's reset
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setValue("image", file); // Update react-hook-form with image value
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setValue("image", file); // Update react-hook-form with image value
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h3 className="text-xl font-bold mb-4">
          {initialData ? "Edit Menu Item" : "Add Menu Item"}
        </h3>
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <AiOutlineClose className="text-xl" />
        </button>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              {...register("name", { required: "Menu name is required" })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-200 transition"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          {/* Image Upload Field */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Upload Image
            </label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImageDrop}
              onClick={() => document.getElementById("image").click()}
              className={`border-2 border-dashed rounded-md p-6 flex items-center justify-center text-center cursor-pointer ${
                image
                  ? "border-primary-dark dark:border-accent-dark"
                  : "border-gray-300 dark:border-ternary-dark"
              }`}
            >
              {!image ? (
                <div className="flex items-center justify-center flex-col">
                  <AiOutlineCloudUpload className="text-5xl text-secondary dark:text-ternary-dark mb-2" />
                  <p className="text-secondary dark:text-ternary-dark">
                    Drag & Drop your image here, or{" "}
                    <span className="text-primary dark:text-primary-dark font-medium">
                      browse
                    </span>
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              ) : (
                <p className="text-secondary dark:text-ternary-dark text-wrap">
                  {typeof image === "object"
                    ? `Image selected: ${image.name}`
                    : `Existing image: ${image}`}
                </p>
              )}
            </div>
            {errors.image && (
              <span className="text-red-500">{errors.image.message}</span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuModal;
