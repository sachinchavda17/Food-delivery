import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const UserRow = ({ user, onEditClick, onDeleteClick }) => {
  return (
    <tr className="border-t dark:border-gray-600 hover:bg-ternary dark:hover:bg-secondary-dark transition duration-300">
      <td className="py-3 px-4">#{user._id}</td>
      <td className="py-3 px-4">{user.name}</td>
      <td className="py-3 px-4">{user.email}</td>
      <td className="py-3 px-4 capitalize">{user.role}</td>
      <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
      <td className="py-3 px-4">{new Date(user.updatedAt).toLocaleString()}</td>
      <td className="py-3 px-4 flex items-center justify-center gap-2">
        <button onClick={() => onEditClick(user)} className="text-blue-500 hover:text-blue-700">
          <FaEdit className="text-lg" />
        </button>
        <button onClick={() => onDeleteClick(user)} className="text-red-500 hover:text-red-700">
          <FaTrash className="text-lg" />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
