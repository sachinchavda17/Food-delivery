import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDataApi, getDataApi } from "../utils/api";
import { toast } from "react-hot-toast";
import { RiFunctionAddFill } from "react-icons/ri";
import ItemCard from "../components/ItemCard"; // Importing the new ItemCard component
import { StoreContext } from "../utils/StoreContext";
import loadingSvg from "../assets/loading.svg";
import AlertModal from "../modal/AlertModal";

const ListItems = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await getDataApi("/api/foods/list");
        if (!response.success) {
          toast.error(response?.error || "Failed to get menu list.");
        } else {
          setItems(response.foods);
        }
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [token]);

  const handleEdit = (id) => {
    navigate(`/update-item/${id}`);
  };
  const handleDeleteClick = (item) => {
    setIsAlertOpen(true);
    setSelectedItem(item);
  };
  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteDataApi(
        `/api/foods/delete/${selectedItem._id}`
      );
      if (response.error) {
        return toast.error(response.error);
      }
      toast.success("Item deleted successfully!");
      setItems(items.filter((item) => item._id !== selectedItem._id));
    } catch (error) {
      toast.error("Failed to delete the item.");
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center flex-col items-center min-h-screen animate-pulse transition">
        <img src={loadingSvg} alt="Loading" />
        <span className="ml-2 text-lg">Loading Foods...</span>
      </div>
    );
  }

  return (
    <div className="p-6 pb-20 min-h-screen rounded-lg w-full max-w-6xl mx-auto bg-background dark:bg-secondary-dark transition-all duration-300">
      <h2 className="text-2xl font-bold  dark:text-ternary mb-6 text-center">
        Food Items List
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-6 bg-background dark:bg-secondary-dark transition-all duration-300">
        <button
          className="shadow-lg hover:shadow-xl dark:shadow-background-dark dark:text-ternary px-4 py-10 rounded flex flex-col items-center transition-all duration-300"
          onClick={() => navigate("/add-item")}
        >
          <RiFunctionAddFill className="mb-2" /> <span>Add New Item</span>
        </button>

        {items.length === 0 ? (
          <p className="text-center text-secondary dark:text-ternary-dark">
            No items available.
          </p>
        ) : (
          items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onEdit={() => handleEdit(item._id)}
              onDelete={() => handleDeleteClick(item)}
            />
          ))
        )}
      </div>
      {isAlertOpen && (
        <AlertModal
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          onDelete={handleDeleteConfirm}
          userName={selectedItem?.name}
        />
      )}
    </div>
  );
};

export default ListItems;
