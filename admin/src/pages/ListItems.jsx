import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { deleteDataApi, getDataApi } from "../utils/api";
import {toast} from "react-hot-toast"
// Dummy Data
// const initialItems = [
//   {
//     _id: "1",
//     name: "Margherita Pizza",
//     desc: "Classic pizza with fresh tomatoes, mozzarella, and basil.",
//     price: 450,
//     image: "https://via.placeholder.com/150",
//     category: "Pizza",
//     isAvailable: true,
//     ratings: 4.5,
//   },
//   {
//     _id: "2",
//     name: "Cheeseburger",
//     desc: "Grilled beef patty with melted cheddar cheese, lettuce, and tomatoes.",
//     price: 300,
//     image: "https://via.placeholder.com/150",
//     category: "Burger",
//     isAvailable: true,
//     ratings: 4.7,
//   },
//   {
//     _id: "3",
//     name: "Caesar Salad",
//     desc: "Crispy romaine lettuce with parmesan, croutons, and Caesar dressing.",
//     price: 250,
//     image: "https://via.placeholder.com/150",
//     category: "Salad",
//     isAvailable: true,
//     ratings: 4.2,
//   },
// ];

const ListItems = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const { foods } = await getDataApi("/api/foods/list");
      console.log(foods);
      setItems(foods);
    };
    getData();
  }, []);
  // Handle Edit
  const handleEdit = (id) => {
    navigate(`/update-item/${id}`);
  };

  // Handle Delete
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
    <div className=" p-8 rounded-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-primary dark:text-primary-dark mb-6 text-center">
        Food Items List
      </h2>
      {items.length === 0 ? (
        <p className="text-center text-secondary dark:text-ternary-dark">
          No items available.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex flex-col lg:flex-row items-center justify-between bg-gray-100 dark:bg-secondary-dark p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Food Image */}
              <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>

              {/* Food Details */}
              <div className="w-full lg:w-2/4 flex flex-col lg:flex-row lg:justify-between lg:items-center lg:px-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary dark:text-primary-dark">
                    {item.name}
                  </h3>
                  <p className="text-secondary dark:text-ternary-dark mt-2">
                    Category: {item.category}
                  </p>
                 
                </div>
                <div className="mt-4 lg:mt-0">
                  <p className="text-primary dark:text-primary-dark text-lg font-bold">
                    &#8377;{item.price}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full lg:w-1/4 flex justify-center lg:justify-end gap-4">
                <button
                  onClick={() => handleEdit(item._id)}
                  className="flex items-center bg-primary dark:bg-accent-dark text-white p-2 rounded-lg hover:bg-accent transition"
                >
                  <AiFillEdit className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex items-center bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                >
                  <AiFillDelete className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListItems;
