import React, { useContext, useEffect, useState } from "react";
import { getDataApi } from "../utils/api";
import { StoreContext } from "../utils/StoreContext";
import toast from "react-hot-toast";
import loadingSvg from "../assets/loading.svg";


const ExploreMenu = ({ category, setCategory }) => {
  const { token } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [menuData, setMenuData] = useState([]);
  console.log(category);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getDataApi("/api/menu/list");
      console.log(response.menuItems);
      if (!response.success) {
        toast.error(response?.error || "Failed to get menu list.");
      } else {
        setMenuData(response?.menuItems);
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-10 animate-pulse transition">
        <img src={loadingSvg} alt="Loading" className="w-20" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5 py-10 ">
      <h1 className="text-secondary dark:text-ternary  font-semibold text-3xl">
        Explore Our Menu
      </h1>
      <p className="max-w-[60%] text-ternary-light">
        Choose from a wide variety of delectable dishes crafted with the finest
        ingredients and culinary expertise to elevate your dining experience.
      </p>

      <div className="flex justify-between items-center gap-7 py-2 text-center my-5 overflow-x-scroll no-scrollbar">
        {menuData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            onClick={() =>
              setCategory((prev) =>
                prev === item.name ? "All" : item.name
              )
            }
          >
            <img
              src={item.image}
              alt={item.name}
              className={`w-[7.5vw] min-w-[80px] object-cover rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 mb-4 ${
                category === item.name && " border-2 border-primary p-1"
              }`}
            />
            <p className="mt-2 text-gray-500 dark:text-gray-300 text-[max(1.4vw,16px)] cursor-pointer">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <div className="my-3 border-0 h-[2px] bg-gray-300 dark:bg-secondary" />
    </div>
  );
};

export default ExploreMenu;
