import React from "react";

const MenuItem = ({ item, category, setCategory }) => {
  return (
    <div
      onClick={() =>
        setCategory((prev) => (prev === item.name ? "" : item.name))
      }
      className="p-4 w-28 sm:w-32 max-w-44 rounded-lg shadow-md overflow-hidden hover:shadow-lg dark:shadow-background-dark transition duration-300 flex items-center justify-center flex-col gap-3 hover:cursor-pointer hover:scale-105"
    >
      <img src={item.image} alt={item.name} className="w-full object-cover rounded-full" />
      <h2 className="text-xl text-center font-semibold dark:text-ternary w-full">
        {item.name}
      </h2>
    </div>
  );
};

export default MenuItem;
