import React, { useContext } from "react";
import { StoreContext } from "../utils/StoreContext";
import FoodItem from "./FoodItem";

const Foods = ({ category }) => {
  const { foods } = useContext(StoreContext);

  // Filter the foods based on the selected category
  const filteredFoods = foods.filter(
    (item) => category === "All" || category === item.category.name
  );

  return (
    <div className="pb-5 mt-2">
      {/* If no foods are available, show a message */}
      {filteredFoods.length === 0 ? (
        <p className="text-center text-lg mt-5 text-gray-500 dark:text-gray-300">
          No dishes available in this category.
        </p>
      ) : (
        <>
          <h2 className="text-3xl font-semibold dark:text-ternary">
            Top dishes near you
          </h2>
          <div className="food-display-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-5 mt-7 gap-x-10">
            {filteredFoods.map((item, index) => (
              <FoodItem item={item} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Foods;
