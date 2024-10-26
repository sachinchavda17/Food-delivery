import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AuthModal from "./modal/AuthModal";
import VarifyOrder from "./modal/VarifyOrder";
import { StoreContext } from "./utils/StoreContext";

function App() {
  const { token } = useContext(StoreContext);
  const [showAuth, setShowAuth] = useState(false);
  return (
    <div className="dark:bg-secondary-dark bg-background transition-all duration-300">
      {showAuth && <AuthModal showAuth={showAuth} setShowAuth={setShowAuth} />}
      <Navbar setShowAuth={setShowAuth} />
      <div className="app w-[90%] md:w-[80%] m-auto">
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/search" element={<SearchPage />} />
            {token && (
              <>
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/verify" element={<VarifyOrder />} />
                <Route path="/myorders" element={<MyOrders />} />
                <Route path="/profile" element={<Profile />} />
              </>
            )}
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
