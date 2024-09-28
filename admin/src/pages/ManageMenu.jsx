import React, { useState, useEffect, useContext } from "react";
import {
  getDataApi,
  postDataApi,
  putDataApi,
  deleteDataApi,
} from "../utils/api";
import MenuModal from "../components/MenuModal";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { StoreContext } from "../utils/StoreContext";
import loadingSvg from "../assets/loading.svg";
import AlertModal from "../components/AlertModal";

const ManageMenu = () => {
  const { token } = useContext(StoreContext);
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); // To track edit state
  const [loading, setLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const response = await getDataApi("/api/menu/list");
        if (!response.success) {
          toast.error(response?.error || "Failed to get menu list.");
        } else {
          setMenuItems(response.menuItems);
        }
      } catch (error) {
        toast.error(error.message || "Failed to get Menu list.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [token]);

  const handleAdd = () => {
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (currentItem) {
        console.log("api update");
        const response = await putDataApi(
          `/api/menu/update/${currentItem._id}`,
          formData, // Send formData here
          token
        );
        console.log(response);
        if (response.success) {
          toast.success("Menu item updated.");
          // Update local state
          setMenuItems((prevItems) =>
            prevItems.map((item) =>
              item._id === currentItem._id
                ? { ...item, ...response.data }
                : item
            )
          );
        } else {
          toast.error("Item not updated.");
        }
      } else {
        console.log("Submitting form data:", formData);
        console.log("Submitting form data:", formData.name);
        console.log("Submitting form data:", formData.image);
        const response = await postDataApi("/api/menu/create", {
          name: formData.name,
          image: formData.image,
        });
        console.log(response);
        if (response.success) {
          toast.success("Menu item added.");
          // Add new item to local state
          setMenuItems((prevItems) => [...prevItems, response.data]);
        } else {
          toast.error("Item not added.");
        }
      }
      setIsModalOpen(false); // Close modal after success
    } catch (error) {
      console.error(error);
      toast.error("Operation failed.");
    }
  };

  const handleDeleteClick = async (id) => {
    setIsAlertOpen(true);
    setSelectedMenuId(id);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteDataApi(
        `/api/menu/delete/${selectedMenuId}`,
        token
      );
      if (response.success) {
        toast.success("Menu deleted successfully.");
        setMenuItems(menuItems.filter((item) => item._id !== selectedMenuId));
        setIsAlertOpen(false); // Open the alert modal
      } else {
        toast.error(response.error || "Failed to delete Menu.");
      }
    } catch (error) {
      toast.error("Failed to delete Menu.");
    }
  };

  return (
    <div className="pt-24 p-6">
      <button
        onClick={handleAdd}
        className="bg-green-500 text-white py-2 px-4 rounded-lg mb-4"
      >
        Add Menu Item
      </button>
      <div className="container mx-auto">
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-center rounded-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Image</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="py-3 px-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <AiOutlineEdit className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <AiOutlineDelete className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <MenuModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={currentItem}
        />
      )}

      {isAlertOpen && (
        <AlertModal
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          onDelete={handleDeleteConfirm}
          userName={"menu"}
        />
      )}
    </div>
  );
};

export default ManageMenu;
