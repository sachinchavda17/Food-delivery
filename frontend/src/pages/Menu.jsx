import React, { useState, useContext } from "react";
import MenuItem from "../components/MenuItem";
import { StoreContext } from "../utils/StoreContext";
import loadingSvg from "../assets/loading.svg";
import Foods from "../components/Foods";
import Refresh from "../components/Refresh";

const Menu = () => {
  const {menuItems, loading} = useContext(StoreContext);
  const [category, setCategory] = useState("");

  if (loading) {
    return (
      <div className="w-full flex justify-center flex-col items-center min-h-screen animate-pulse transition">
        <img src={loadingSvg} alt="Loading" />
        <span className="ml-2 text-lg dark:text-ternary">Loading Menu...</span>
      </div>
    );
  }

  if (menuItems.length === 0) {
    return (
      <div className="container mx-auto p-4 pt-24 transition duration-300">
        <h1 className="text-3xl font-bold text-center mb-4 dark:text-ternary">
          Menu
        </h1>
        <p className="text-center text-lg mt-5 text-gray-500 dark:text-gray-300">
          No Menu available.
        </p>
        <Refresh />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-24 transition duration-300">
      <h1 className="text-3xl font-bold text-center mb-4 dark:text-ternary">
        Menu
      </h1>
      <div className="flex flex-wrap gap-4 mb-5 items-center justify-center">
        {menuItems.map((item) => (
          <MenuItem
            key={item._id}
            item={item}
            category={category}
            setCategory={setCategory}
          />
        ))}
      </div>
      {!!category && (
        <Foods category={category} heading={`Dishes for "${category}"`} />
      )}
    </div>
  );
};

export default Menu;
