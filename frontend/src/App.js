import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import the Navbar component
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AuthModal from "./model/AuthModal";
import { toast, Toaster } from "react-hot-toast";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import VarifyOrder from "./model/VarifyOrder";
import MyOrders from "./pages/MyOrders";
import Menu from "./pages/Menu";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  return (
    <div className="dark:bg-secondary-dark bg-background transition-all duration-300">
      {showAuth && <AuthModal showAuth={showAuth} setShowAuth={setShowAuth} />}
      <Navbar setShowAuth={setShowAuth} />
      <div className="app ">
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/verify" element={<VarifyOrder />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ScrollToTop>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
