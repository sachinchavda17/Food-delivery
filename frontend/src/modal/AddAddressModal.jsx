import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddAddressModal = ({ onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }, reset,
  } = useForm();

  const handleSave = (data) => {
    onSave(data);
    reset();
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div className="address-popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="popup-content max-w-lg w-full m-2 bg-white dark:bg-gray-800 p-8 rounded-lg">
        <h3 className="text-xl font-bold mb-4 dark:text-ternary">Add New Address</h3>
        <form onSubmit={handleSubmit(handleSave)}>
          <input
            type="text"
            placeholder="Street"
            {...register("street", { required: "Street is required" })}
            className="input-field mb-4 w-full p-3 border border-gray-300 dark:border-ternary-light rounded-md bg-transparent"
          />
          {errors.street && <p className="text-red-500">{errors.street.message}</p>}

          <input
            type="text"
            placeholder="City"
            {...register("city", { required: "City is required" })}
            className="input-field mb-4 w-full p-3 border border-gray-300 dark:border-ternary-light rounded-md bg-transparent"
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}

          <input
            type="text"
            placeholder="Postal Code"
            {...register("postalCode", { required: "Postal Code is required" })}
            className="input-field mb-4 w-full p-3 border border-gray-300 dark:border-ternary-light rounded-md bg-transparent"
          />
          {errors.postalCode && <p className="text-red-500">{errors.postalCode.message}</p>}

          <input
            type="text"
            placeholder="Country"
            {...register("country", { required: "Country is required" })}
            className="input-field mb-4 w-full p-3 border border-gray-300 dark:border-ternary-light rounded-md bg-transparent"
          />
          {errors.country && <p className="text-red-500">{errors.country.message}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn bg-gray-500 text-white py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-btn bg-primary text-white py-2 px-4 rounded-md"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;
