import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  postDataApi,
  getDataApi,
  putDataApi,
  deleteDataApi,
  fileUploadHandler,
} from "../utils/api";
import { useContext } from "react";
import { StoreContext } from "../utils/StoreContext";

const AddItem = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const { token } = useContext(StoreContext);
  const { id } = useParams(); // Get item ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch item details if ID exists (updating)
      const fetchData = async () => {
        try {
          const response = await getDataApi(`/api/foods/get/${id}`);
          const {
            name,
            desc,
            price,
            category,
            image: imageUrl,
          } = response.food;
          setValue("name", name);
          setValue("desc", desc);
          setValue("price", price);
          setValue("category", category);
          setImage({ name: imageUrl }); // Set existing image for display
        } catch (error) {
          toast.error("Failed to fetch item details.");
        }
      };
      fetchData();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("desc", data.desc);
      formData.append("price", data.price);
      formData.append("category", data.category);

      // Append image if a new file is selected
      if (image && typeof image === "object") {
        formData.append("image", image);
      }

      if (id) {
        // Update existing item
        const response = await fileUploadHandler(
          `/api/foods/update/${id}`,
          "put",
          formData,
          token
        );
        if (response.error) {
          return toast.error(response.error || "Failed to Update");
        } else toast.success(response.message || "Item updated successfully!");
      } else {
        // Add new item
        const response = await fileUploadHandler(
          "/api/foods/add",
          "post",
          formData,
          token
        );
        if (response.error) {
          return toast.error(response.error || "Failed to Add");
        } else toast.success(response.message || "Item added successfully!");
      }

      resetForm();
    } catch (error) {
      toast.error("Failed to submit the form.");
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
    setImage(e.dataTransfer.files[0]);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteDataApi(`/api/foods/delete/${id}`);
      if (response.error) {
        return toast.error(response.error);
      }
      toast.success("Item deleted successfully!");
      navigate("/"); // Redirect after deletion
    } catch (error) {
      toast.error("Failed to delete the item.");
    }
  };

  const resetForm = () => {
    reset();
    setImage(null); // Clear image after submission or reset
  };

  return (
    <div className="mb-5 bg-background-light dark:bg-secondary p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <Toaster />
      <h2 className="text-2xl font-semibold text-primary dark:text-primary-dark mb-6 text-center">
        {id ? "Update Food Item" : "Add New Food Item"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Name field */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="font-medium text-secondary dark:text-ternary-dark"
            >
              Food Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Food name is required" })}
              className="input-field w-full border p-3 rounded-md bg-transparent dark:text-gray-300 focus:outline-primary dark:focus:outline-primary-dark"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          {/* Description field */}
          <div className="flex flex-col">
            <label
              htmlFor="desc"
              className="font-medium text-secondary dark:text-ternary-dark"
            >
              Description
            </label>
            <textarea
              id="desc"
              {...register("desc", { required: "Description is required" })}
              className="input-field w-full border p-3 rounded-md bg-transparent dark:text-gray-300 focus:outline-primary dark:focus:outline-primary-dark"
            />
            {errors.desc && (
              <span className="text-red-500">{errors.desc.message}</span>
            )}
          </div>

          {/* Price field */}
          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="font-medium text-secondary dark:text-ternary-dark"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              {...register("price", { required: "Price is required", min: 0 })}
              className="input-field w-full border p-3 rounded-md bg-transparent dark:text-gray-300 focus:outline-primary dark:focus:outline-primary-dark"
              min="0"
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>

          {/* Category field */}
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="font-medium text-secondary dark:text-ternary-dark dark:bg-secondary"
            >
              Category
            </label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className="input-field w-full border p-3 rounded-md bg-transparent dark:text-gray-300 focus:outline-primary dark:focus:outline-primary-dark dark:bg-secondary"
            >
              <option value="">--Select Category--</option>
              <option value="Pizza">Pizza</option>
              <option value="Burger">Burger</option>
              <option value="Pasta">Pasta</option>
              <option value="Salad">Salad</option>
              <option value="Dessert">Dessert</option>
              <option value="Drinks">Drinks</option>
            </select>
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>

          {/* Image Upload field */}
          <div className="flex flex-col">
            <label
              htmlFor="image"
              // Clickable label
              className="font-medium text-secondary dark:text-ternary-dark cursor-pointer"
            >
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
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-5">
            <button
              type="submit"
              className="w-full bg-primary dark:bg-accent-dark text-white py-3 px-6 rounded-md hover:bg-accent transition"
            >
              {id ? "Update Item" : "Add Item"}
            </button>
            {id ? (
              <button
                type="button"
                onClick={handleDelete}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition"
              >
                Delete Item
              </button>
            ) : (
              <button
                type="button"
                onClick={resetForm}
                className="w-full bg-gray-500 text-white py-3 px-6 rounded-md hover:bg-gray-600 transition"
              >
                Clear Form
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
