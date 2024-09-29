import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import loadingSvg from "../assets/loading.svg";
import { getDataApi, putDataApi, deleteDataApi } from "../utils/api";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { StoreContext } from "../utils/StoreContext";
import EditUser from "../modal/EditUser"; // Import the Modal component
import AlertModal from "../modal/AlertModal";
import UserRow from "../components/UserRow"; // Import the new UserRow component

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
        `/api/user/delete/${selectedUser._id}`,
        token
      );
      if (response.success) {
        toast.success("User deleted successfully.");
        setUsers(users.filter((user) => user._id !== selectedUser._id));
        setIsAlertOpen(false);
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
    <div className=" w-full p-6 min-h-screen bg-background dark:bg-secondary-dark transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-ternary">
        User Management
      </h2>
      <div className="container mx-auto overflow-x-auto rounded-lg shadow-lg">
        {users.length > 0 ? (
          <table className="min-w-full text-center rounded-lg bg-background-light dark:bg-secondary dark:text-ternary-dark ">
            <thead className="bg-primary dark:bg-primary-dark text-ternary ">
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
                <UserRow
                  key={user._id}
                  user={user}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              No users found.
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditUser
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
