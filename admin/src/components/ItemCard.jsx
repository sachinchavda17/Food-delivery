import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ItemCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col overflow-hidden max-w-64 min-w-62 rounded-lg shadow-lg hover:shadow-xl dark:shadow-background-dark transition-all duration-300">
      <div className="flex-grow ">
        <img
          src={item.image}
          alt={item.name}
          className="w-full object-cover"
        />
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-primary dark:text-primary-dark">
              {item.name}
            </h3>
            <p className="text-lg text-primary dark:text-primary-dark font-bold">
              ₹{item.price}
            </p>
          </div>
          <p className="text-secondary dark:text-ternary-dark mt-2">
            Category: {item.category.name}
          </p>

          <div className="mt-4 flex justify-between gap-4">
            <button
              onClick={onEdit}
              className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg transition"
            >
              <FaEdit className="mr-2" /> Edit
            </button>
            <button
              onClick={onDelete}
              className="w-full flex items-center justify-center bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
