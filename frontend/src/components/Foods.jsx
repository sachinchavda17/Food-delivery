import React, { useContext } from "react";
import { StoreContext } from "../utils/StoreContext";
import FoodItem from "./FoodItem";

const Foods = ({ category }) => {
  const { foods } = useContext(StoreContext);

  return (
    <div className="pb-5 mt-2">
      <h2 className="text-3xl font-semibold dark:text-ternary">
        Top dishes near you
      </h2>
      <div className="food-display-list grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-5 mt-7 gap-x-10">
        {foods.map((item, index) => {
          if (category === "All" || category === item.category)
            return <FoodItem item={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Foods;
