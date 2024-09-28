import React, { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AuthModal from "./components/AuthModal";
import { Routes, Route } from "react-router-dom";
import AddItem from "./pages/AddItem";
import ListItems from "./pages/ListItems";
import ManageOrders from "./pages/ManageOrders";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { StoreContext } from "./utils/StoreContext";
import ManageUsers from "./pages/ManageUsers";
import ManageMenu from "./pages/ManageMenu";

const App = () => {
  const [showAuth, setShowAuth] = useState(true);
  const { token } = useContext(StoreContext);
  useEffect(() => {
    if (token) setShowAuth(false);
    else setShowAuth(true);
  }, [token]);
  return (
    <div className="dark:bg-secondary-dark bg-background transition-all duration-300">
      {showAuth && <AuthModal showAuth={showAuth} setShowAuth={setShowAuth} />}
      <Navbar setShowAuth={setShowAuth} />
      <div className="app flex bg-background dark:bg-secondary transition-all duration-300 ">
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/update-item/:id" element={<AddItem />} />
          <Route path="/" element={<ListItems />} />
          <Route path="/orders" element={<ManageOrders />} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/menus" element={<ManageMenu />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
