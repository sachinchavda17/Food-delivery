import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import the Navbar component
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AppDownload from "./pages/AppDowload";
import AuthModal from "./components/AuthModal";
import { toast, Toaster } from "react-hot-toast";
import Cart from "./components/Cart"; 
import Checkout from "./pages/Checkout";
import VarifyOrder from "./components/VarifyOrder";
import MyOrders from "./pages/MyOrders";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  return (
    <div className="dark:bg-secondary-dark bg-background transition-all duration-300">
      {showAuth && (
        <AuthModal showAuth={showAuth} setShowAuth={setShowAuth} />
      )}
      <Navbar setShowAuth={setShowAuth} />
      <div className="app ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app-download" element={<AppDownload />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/verify" element={<VarifyOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
