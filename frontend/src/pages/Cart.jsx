import React, { useContext } from "react";
import { StoreContext } from "../utils/StoreContext";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai"; // Import cart and close icons
import { useNavigate } from "react-router-dom";
import { postDataApi } from "../utils/api";
import { useState } from "react";
import {toast} from "react-hot-toast"
const Cart = () => {
  const { cartItems, removeFromCart, cartSubTotal } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const navigate = useNavigate();
  const isEmpty = cartItems.length === 0;

  const handlePromoCodeSubmit = async (e) => {

    try {
      const response = await postDataApi("/api/promocode/validate", {
        code: promoCode,
      });

      if (response.success) {
        setDiscount(response.discount);
      }
    } catch (error) {
      toast.error(error.message || "Failed to apply promo code.");
    }
  };

  return (
    <div className="cart pt-24 p-4">
      {isEmpty ? (
        <div className="empty-cart flex flex-col items-center justify-center h-72 text-center">
          <AiOutlineShoppingCart className="text-6xl text-gray-400 dark:text-gray-600 mb-4" />
          <p className="text-xl text-gray-500 dark:text-ternary-light">
            Opps! Your cart is empty.
          </p>
        </div>
      ) : (
        <>
          <div className="cart-items w-full">
            <div className="cart-items-title grid grid-cols-6 text-sm text-gray-500 dark:text-ternary-light">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <hr className="my-4" />

            {cartItems?.map((itemData) => {
              return (
                <div key={itemData.food?._id}>
                  <div className="cart-items-item grid grid-cols-6 items-center py-4 dark:text-ternary-light">
                    <img
                      src={itemData.food?.image}
                      alt=""
                      className="w-12 h-12 object-cover"
                    />
                    <p>{itemData.food?.name}</p>
                    <p>${itemData.food?.price}</p>
                    <p>{itemData.quantity}</p>
                    <p>${itemData.food?.price * itemData.quantity}</p>
                    <button
                      onClick={() => removeFromCart(itemData.food._id)}
                      className="text-red-600 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                  <hr className="my-2" />
                </div>
              );
            })}
          </div>

          {/* Cart Totals and Promo Code Side by Side */}
          <div className="cart-bottom mt-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Cart Totals Section */}
            <div className="cart-total text-lg font-semibold dark:text-ternary-light">
              <h2>Cart Totals</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>&#8377;{cartSubTotal}</p>
                </div>
                <div className="flex justify-between">
                  <p>Delivery Fee</p>
                  <p> &#8377; 2</p>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <p>Total</p>
                  <p>
                    &#8377;
                    {(
                      Number(cartSubTotal) + (cartSubTotal === 0 ? 0 : 2)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="mt-4 w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>

            {/* Promo Code Section */}
            <div className="cart-promocode">
              <p className="mb-2 text-gray-600 dark:text-ternary-light">
                If you have a promo code, enter it here:
              </p>
              <div className="cart-promocode-input flex space-x-2">
                <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-200 transition"
                  type="text"
                  placeholder="Enter Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  required
                />
                <button
                  className="bg-black text-white px-4 py-2 rounded"
                  onClick={() => handlePromoCodeSubmit()}
                >
                  Submit
                </button>
              </div>
              {discount > 0 && (
                <p className="text-green-500">Discount Applied: {discount}%</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
