import React from "react";

const MenuItem = ({ item }) => {
  return (
    <div className="p-4 min-w-24 max-w-32 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex items-center justify-center flex-col gap-3 ">
      <img src={item.image} alt={item.name} className="w-full object-cover" />
      <h2 className="text-xl font-semibold">{item.name}</h2>
    </div>
  );
};

export default MenuItem;
