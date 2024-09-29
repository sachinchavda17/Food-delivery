import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const MenuCard = ({ menu, handleEdit, handleDeleteClick }) => {
  return (
    <div
      key={menu._id}
      className="min-w-24 max-w-32 bg-background-light dark:bg-secondary dark:text-ternary shadow p-4 rounded-lg"
    >
      <img
        src={menu.image}
        alt={menu.name}
        className="w-full object-cover rounded mb-2"
      />
      <h2 className="text-lg font-semibold text-center">{menu.name}</h2>
      <div className="flex justify-between mt-3">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleEdit(menu)}
        >
          <FaEdit className="text-xl" />
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => handleDeleteClick(menu)}
        >
          <FaTrash className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
