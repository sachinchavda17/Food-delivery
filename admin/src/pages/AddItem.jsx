import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getDataApi, deleteDataApi, fileUploadHandler } from "../utils/api";
import { useContext } from "react";
import { StoreContext } from "../utils/StoreContext";
import loadingSvg from "../assets/loading.svg";

const AddItem = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const { token } = useContext(StoreContext);
  const { id } = useParams(); // Get item ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true); // Set loading before fetch
          const response = await getDataApi(`/api/foods/get/${id}`, token);
          const {
            name,
            desc,
            price,
            category,
            ratings,
            image: imageUrl,
          } = response.food;
          setValue("name", name);
          setValue("desc", desc);
          setValue("price", price);
          setValue("ratings", ratings);
          setValue("category", category._id);
          setImage(imageUrl); // Set existing image for display
        } catch (error) {
          toast.error("Failed to fetch item details.");
        } finally {
          setLoading(false); // End loading after fetch
        }
      };
      fetchData();
    }
  }, [id, setValue]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true); // Set loading before fetching menu
        const response = await getDataApi("/api/menu/list");
        if (!response.success) {
          toast.error(response.error || "Failed to fetch menu details.");
        } else {
          setMenuItems(response.menuItems);
        }
      } catch (error) {
        toast.error("Failed to fetch menu details.");
      } finally {
        setLoading(false); // End loading after fetch
      }
    };
    fetchMenu();
  }, [token]);

  const onSubmit = async (data) => {
    try {
      setLoading(true); // Start loading before submitting
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("desc", data.desc);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("ratings", data.ratings);

      // Append image if a new file is selected
      if (image && typeof image === "object") {
        formData.append("image", image);
      }

      let response;
      if (id) {
        // Update existing item
        response = await fileUploadHandler(
          `/api/foods/update/${id}`,
          "put",
          formData,
          token
        );
      } else {
        // Add new item
        response = await fileUploadHandler(
          "/api/foods/add",
          "post",
          formData,
          token
        );
      }

      if (response.error) {
        toast.error(response.error || "Failed to submit");
      } else {
        toast.success(
          id ? "Item updated successfully!" : "Item added successfully!"
        );
        if (!id) resetForm(); // Clear form only when adding new
      }
    } catch (error) {
      toast.error("Failed to submit the form.");
    } finally {
      setLoading(false); // End loading after submission
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
      setLoading(true); // Start loading before deletion
      const response = await deleteDataApi(`/api/foods/delete/${id}`, token);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Item deleted successfully!");
        navigate("/"); // Redirect after deletion
      }
    } catch (error) {
      toast.error("Failed to delete the item.");
    } finally {
      setLoading(false); // End loading after deletion
    }
  };

  const resetForm = () => {
    reset();
    setImage(null); // Clear image after submission or reset
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center flex-col items-center min-h-screen animate-pulse transition">
        <img src={loadingSvg} alt="Loading" />
        <span className="ml-2 text-lg dark:text-ternary">Loading...</span>
      </div>
    );
  }
  return (
    <div className="mb-5 p-6 pb-20 w-full max-w-3xl mx-auto">
      <div className="bg-background-light dark:bg-secondary p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-primary dark:text-primary-dark mb-6 text-center">
          {id ? "Update Food Item" : "Add New Food Item"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate={true}
        >
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
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
                className="input-field w-full border p-3 rounded-md bg-transparent dark:text-gray-300 focus:outline-primary dark:focus:outline-primary-dark"
                min="0"
              />
              {errors.price && (
                <span className="text-red-500">{errors.price.message}</span>
              )}
            </div>
            {/* Rating field */}
            <div className="flex flex-col">
              <label
                htmlFor="ratings"
                className="font-medium text-secondary dark:text-ternary-dark"
              >
                Ratings
              </label>
              <input
                type="number"
                id="ratings"
                {...register("ratings", {
                  required: "Ratings is required",
                  min: 0,
                  max: 5,
                })}
                className="input-field w-full border p-3 rounded-md bg-transparent dark:text-gray-300 focus:outline-primary dark:focus:outline-primary-dark"
              />
              {errors.ratings && (
                <span className="text-red-500">{errors.ratings.message}</span>
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
                {...register("category", {
                  required: "Category is required",
                })}
                disabled={!!id} // Disable during update if necessary
                className="input-field w-full border p-3 rounded-md bg-transparent dark:text-gray-300 focus:outline-primary dark:focus:outline-primary-dark dark:bg-secondary"
              >
                <option value="">--Select Category--</option>
                {menuItems.map((menu) => (
                  <option key={menu._id} value={menu._id}>
                    {menu.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-500">{errors.category.message}</span>
              )}
            </div>

            {/* Image Upload field */}
            <div className="flex flex-col">
              <label
                htmlFor="image"
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
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <div className="flex items-center justify-center flex-col">
                  <AiOutlineCloudUpload className="text-4xl text-secondary dark:text-ternary-dark mb-2" />
                  {!image ? (
                    <p className="text-secondary dark:text-ternary-dark">
                      Drag & Drop your image here, or{" "}
                      <span className="text-primary dark:text-primary-dark font-medium">
                        browse
                      </span>
                    </p>
                  ) : (
                    <p className="text-secondary dark:text-ternary-dark text-wrap">
                      {image && typeof image === "object" ? (
                        <div className="flex items-center justify-center gap-5">
                          <span>Image selected: </span>
                          <img
                            src={URL.createObjectURL(image)}
                            alt=""
                            className="w-20"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-5">
                          <span>Existing Image: </span>
                          <img src={image} alt="" className="w-20 " />
                        </div>
                      )}
                    </p>
                  )}
                </div>
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
      <Toaster />
    </div>
  );
};

export default AddItem;
