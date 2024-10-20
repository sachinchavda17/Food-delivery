import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { StoreContext } from "../utils/StoreContext";
import { postDataApi, putDataApi } from "../utils/api";
import { AiOutlineClose } from "react-icons/ai";

const PromoCodeModal = ({
  isOpen,
  setIsOpen,
  currentPromoCode,
  setPromoCodes,
}) => {
  const [code, setCode] = useState(
    currentPromoCode ? currentPromoCode.code : ""
  );
  const [discount, setDiscount] = useState(
    currentPromoCode ? currentPromoCode.discount : ""
  );
  const [loading, setLoading] = useState(false);
  const { token } = useContext(StoreContext);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || discount === "") {
      toast.error("Code and discount are required");
      return;
    }

    setLoading(true);
    try {
      const response = currentPromoCode
        ? await putDataApi(
            `/api/promocode/update/${currentPromoCode._id}`,
            { code, discount },
            token
          )
        : await postDataApi("/api/promocode/create", { code, discount }, token);

      if (response.success) {
        toast.success(
          currentPromoCode ? "Promo code updated" : "Promo code created"
        );
        setIsOpen(false);
        if (currentPromoCode) {
          setPromoCodes((prevItems) =>
            prevItems.map((item) =>
              item._id === currentPromoCode._id
                ? { ...item, ...response.promoCode }
                : item
            )
          );
        } else {
          setPromoCodes((prevItems) => [...prevItems, response.promoCode]);
        }
      } else {
        toast.error(response.error || "Failed to save promo code");
      }
    } catch (error) {
      toast.error("Error saving promo code");
    } finally {
      setLoading(false);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300">
      <div className="relative bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-[90%] max-w-lg animate-fade-in">
        <h2 className="text-2xl font-semibold mb-4 text-center dark:text-ternary">
          {currentPromoCode ? "Edit Promo Code" : "Add New Promo Code"}
        </h2>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 transition"
          aria-label="Close Modal"
        >
          <AiOutlineClose className="text-xl" />
          
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Promo Code</label>
            <input
              type="text"
              placeholder="Enter promo code"
              className="w-full px-4 py-2 border uppercase border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-200 transition"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Discount (%)</label>
            <input
              type="number"
              placeholder="Enter discount"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-200 transition"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default PromoCodeModal;
