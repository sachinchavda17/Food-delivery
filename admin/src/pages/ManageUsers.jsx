import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import loadingSvg from "../assets/loading.svg";
import { getDataApi, putDataApi, deleteDataApi } from "../utils/api";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { StoreContext } from "../utils/StoreContext";
import Modal from "../components/EditUser"; // Import the Modal component
import AlertModal from "../components/AlertModal";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const { token } = useContext(StoreContext);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getDataApi("/api/user/list", token);
        if (!response.success) {
          toast.error(response?.error || "Failed to get Users.");
        } else {
          setUsers(response.users);
        }
      } catch (error) {
        toast.error(error.message || "Failed to get Users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  const handleEditClick = (user) => {
    setEditUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user); // Set the user to be deleted
    setIsAlertOpen(true); // Open the alert modal
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteDataApi(
        `/api/user/delete/${selectedUser}`,
        token
      );
      if (response.success) {
        toast.success("User deleted successfully.");
        setUsers(users.filter((user) => user._id !== selectedUser));
        setIsAlertOpen(false); // Open the alert modal
      } else {
        toast.error(response.error || "Failed to delete user.");
      }
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  const handleUpdateUser = async () => {
    if (!formData.name || !formData.email || !formData.role) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await putDataApi(
        `/api/user/update/${editUser._id}`,
        formData,
        token
      );
      if (response.success) {
        toast.success("User updated successfully.");
        setUsers(
          users.map((user) =>
            user._id === editUser._id ? { ...user, ...formData } : user
          )
        );
        setIsEditModalOpen(false);
      } else {
        toast.error(response?.error || "Failed to update user.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update user.");
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center flex-col items-center min-h-screen animate-pulse transition">
        <img src={loadingSvg} alt="Loading" />
        <span className="ml-2 text-lg">Loading Users...</span>
      </div>
    );
  }

  return (
    <div className="pt-24 w-full p-6 h-screen bg-background dark:bg-secondary-dark">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="container mx-auto overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full text-center rounded-lg ">
          <thead className="bg-primary dark:bg-primary-dark text-white ">
            <tr>
              <th className="py-3 px-4 font-semibold">UserId</th>
              <th className="py-3 px-4 font-semibold">Signed Date</th>
              <th className="py-3 px-4 font-semibold">Email</th>
              <th className="py-3 px-4 font-semibold">Name</th>
              <th className="py-3 px-4 font-semibold">Role</th>
              <th className="py-3 px-4 font-semibold">Last Update</th>
              <th className="py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t dark:border-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="py-3 px-4">#{user._id}</td>
                <td className="py-3 px-4">
                  {" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4 capitalize">{user.role}</td>
                <td className="py-3 px-4">
                  {" "}
                  {new Date(user.updatedAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <Modal
          formData={formData}
          setFormData={setFormData}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateUser}
        />
      )}

      {isAlertOpen && (
        <AlertModal
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          onDelete={handleDeleteConfirm}
          userName={selectedUser?.name}
        />
      )}
    </div>
  );
};

export default ManageUsers;
