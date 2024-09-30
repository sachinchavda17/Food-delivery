import React from "react";

const MenuItem = ({ item }) => {
  return (
    <div className="p-4 min-w-30 max-w-44 rounded-lg shadow-md overflow-hidden hover:shadow-lg dark:shadow-background-dark transition duration-300 flex items-center justify-center flex-col gap-3 ">
      <img src={item.image} alt={item.name} className="w-full object-cover" />
      <h2 className="text-xl font-semibold dark:text-ternary w-full">
        {item.name}
      </h2>
    </div>
  );
};

export default MenuItem;
