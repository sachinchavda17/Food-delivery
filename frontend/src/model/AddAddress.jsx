import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddressPopup = ({ onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSave = (data) => {
    onSave(data);
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div className="address-popup fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="popup-content bg-white p-8 rounded-md">
        <h3 className="text-xl font-bold mb-4">Add New Address</h3>
        <form onSubmit={handleSubmit(handleSave)}>
          <input
            type="text"
            placeholder="Street"
            {...register("street", { required: "Street is required" })}
            className="input-field mb-4 w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.street && <p className="text-red-500">{errors.street.message}</p>}

          <input
            type="text"
            placeholder="City"
            {...register("city", { required: "City is required" })}
            className="input-field mb-4 w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}

          <input
            type="text"
            placeholder="Postal Code"
            {...register("postalCode", { required: "Postal Code is required" })}
            className="input-field mb-4 w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.postalCode && <p className="text-red-500">{errors.postalCode.message}</p>}

          <input
            type="text"
            placeholder="Country"
            {...register("country", { required: "Country is required" })}
            className="input-field mb-4 w-full p-3 border border-gray-300 rounded-md"
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

export default AddressPopup;
