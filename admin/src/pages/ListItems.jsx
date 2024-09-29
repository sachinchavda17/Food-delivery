import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDataApi, getDataApi } from "../utils/api";
import { toast } from "react-hot-toast";
import { RiFunctionAddFill } from "react-icons/ri";
import ItemCard from "../components/ItemCard"; // Importing the new ItemCard component

const ListItems = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const { foods } = await getDataApi("/api/foods/list");
      setItems(foods);
    };
    getData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/update-item/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteDataApi(`/api/foods/delete/${id}`);
      if (response.error) {
        return toast.error(response.error);
      }
      toast.success("Item deleted successfully!");
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      toast.error("Failed to delete the item.");
    }
  };

  return (
    <div className="p-6 min-h-screen rounded-lg w-full max-w-6xl mx-auto bg-background dark:bg-secondary-dark transition-all duration-300">
      <h2 className="text-3xl font-semibold text-primary dark:text-primary-dark mb-6 text-center">
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
              onDelete={() => handleDelete(item._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ListItems;
