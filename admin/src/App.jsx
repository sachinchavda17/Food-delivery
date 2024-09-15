import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddItem from "./pages/AddItem";
import ListItems from "./pages/ListItems";
import ManageOrders from "./pages/ManageOrders";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="app flex bg-background dark:bg-secondary transition-all duration-300 ">
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/update-item/:id" element={<AddItem />} />
          <Route path="/" element={<ListItems />} />
          <Route path="/orders" element={<ManageOrders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
