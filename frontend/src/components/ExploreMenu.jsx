import React from "react";
import { menu_list } from "../assets/assets"; // Assuming the menu list data is available

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-5 py-10 ">
      <h1 className="text-secondary dark:text-ternary  font-semibold text-3xl">Explore Our Menu</h1>
      <p className="max-w-[60%] text-ternary-light">
        Choose from a wide variety of delectable dishes crafted with the finest
        ingredients and culinary expertise to elevate your dining experience.
      </p>

      <div className="flex justify-between items-center gap-7 py-2 text-center my-5 overflow-x-scroll no-scrollbar">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={`w-[7.5vw] min-w-[80px] object-cover rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 mb-4 ${category===item.menu_name && " border-2 border-primary p-1"}`}
            />
            <p className="mt-2 text-gray-500 dark:text-gray-300 text-[max(1.4vw,16px)] cursor-pointer">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
      <div className="my-3 border-0 h-[2px] bg-gray-300 dark:bg-secondary" />
    </div>
  );
};

export default ExploreMenu;
