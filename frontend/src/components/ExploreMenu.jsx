import React, { useContext, useEffect, useState } from "react";
import { getDataApi } from "../utils/api";
import { StoreContext } from "../utils/StoreContext";
import toast from "react-hot-toast";
import loadingSvg from "../assets/loading.svg";
import Refresh from "./Refresh";

const ExploreMenu = ({ category, setCategory }) => {
  const { loading, menuItems } = useContext(StoreContext);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-10 animate-pulse transition">
        <img src={loadingSvg} alt="Loading" className="w-20" />
        <span className="ml-2 text-lg dark:text-ternary">Loading Menu's...</span>

      </div>
    );
  }
  
  if (menuItems.length === 0 && !loading) {
    return (
      <div className="pb-5 mt-2 pt-5">
        <p className="text-center text-lg mt-5 text-gray-500 dark:text-gray-300">
          No menu available please Refresh.
        </p>
        <Refresh />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5 py-10 ">
      <h1 className="text-secondary dark:text-ternary  font-semibold text-3xl">
        Explore Our Menu
      </h1>
      <p className="sm:max-w-[80%] text-ternary-light">
        Choose from a wide variety of delectable dishes crafted with the finest
        ingredients and culinary expertise to elevate your dining experience.
      </p>

      <div className="flex justify-between items-center gap-7 py-2 text-center mt-5 overflow-x-scroll no-scrollbar">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            onClick={() =>
              setCategory((prev) => (prev === item.name ? "All" : item.name))
            }
          >
            <img
              src={item.image}
              alt={item.name}
              className={`min-w-16 sm:min-w-20 w-24 object-cover rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 mb-4 ${
                category === item.name && " border-2 border-primary p-1"
              }`}
            />
            <p className="mt-2 text-gray-500 dark:text-gray-300 text-[max(1.4vw,16px)] cursor-pointer">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <div className="my-3 border-0 h-0.5 bg-gray-300 dark:bg-secondary" />
    </div>
  );
};

export default ExploreMenu;
