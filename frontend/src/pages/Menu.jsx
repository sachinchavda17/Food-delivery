import React, { useState, useEffect } from 'react';
import { getDataApi } from '../utils/api';
import MenuItem from '../components/MenuItem';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const loadMenuItems = async () => {
      const response = await getDataApi("/api/menu/list");
      setMenuItems(response.menuItems);
    };

    loadMenuItems();
  }, []);


  return (
    <div className="container mx-auto p-4 pt-24 transition duration-300">
      <h1 className="text-3xl font-bold text-center mb-4 dark:text-ternary">Menu</h1>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {menuItems.map(item => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
