import React from "react";
import { NavLink } from "react-router-dom";
import { RiPlayListAddLine } from "react-icons/ri";
import { LuClipboardList } from "react-icons/lu";
import { CiCirclePlus } from "react-icons/ci";

const Sidebar = () => {
  return (
    <div className=" pt-10 w-1/5 min-h-screen border-r border-gray-400 bg-background shadow-lg">
      <div className="pt-12 pl-5 flex flex-col gap-5">
        <NavLink
          to={"/add-item"}
          className="flex items-center gap-3 border border-gray-400 rounded-l-lg border-r-0 p-2.5 cursor-pointer active:bg-[#fff0ed] active:border-primary"
        >
          <CiCirclePlus className="text-lg" />
          <span className="hidden md:inline">Add Item</span>
        </NavLink>
        <NavLink
          to={"/"}
          className="flex items-center gap-3 border border-gray-400 rounded-l-lg border-r-0 p-2.5 cursor-pointer active:bg-[#fff0ed] active:border-primary"
        >
          <RiPlayListAddLine className="text-lg" />

          <span className="hidden md:inline">List Item</span>
        </NavLink>
        <NavLink
          to={"/orders"}
          className="flex items-center gap-3 border border-gray-400 rounded-l-lg border-r-0 p-2.5 cursor-pointer active:bg-[#fff0ed] active:border-primary"
        >
          <LuClipboardList className="text-lg" />

          <span className="hidden md:inline">Orders Manage</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
