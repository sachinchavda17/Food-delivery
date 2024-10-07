import React, { useContext, useState } from "react";
import { StoreContext } from "../utils/StoreContext";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { postDataApi } from "../utils/api";
import { toast } from "react-hot-toast";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    cartSubTotal,
    discount,
    setDiscount,
    discountedSubTotal,
    setDiscountedSubTotal,
  } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState("");

  const navigate = useNavigate();
  const isEmpty = cartItems.length === 0;

  const handlePromoCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!promoCode) return toast.error("Please Enter promocode");
      const response = await postDataApi("/api/promocode/validate", {
        code: promoCode,
      });
      if (response.success) {
        setDiscount(response.discount);
        toast.success("Promo code applied successfully!");
      } else {
        toast.error("Invalid promo code");
      }
    } catch (error) {
      toast.error(error.message || "Failed to apply promo code");
    }
  };

  return (
    <div className="cart min-h-screen pt-24  bg-background dark:bg-secondary-dark transition-all duration-300">
      {isEmpty ? (
        <div className="empty-cart flex flex-col items-center justify-center h-72 text-center">
          <AiOutlineShoppingCart className="text-6xl text-gray-400 dark:text-gray-600 mb-4" />
          <p className="text-xl text-gray-500 dark:text-ternary-light">
            Oops! Your cart is empty.
          </p>
        </div>
      ) : (
        <>
          <div className="cart-items w-full">
            <table className="min-w-full table-auto border-collapse overflow-hidden rounded shadow-lg ">
              <thead>
                <tr className="text-left text-sm bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-ternary-light">
                  <th className="sm:p-4 px-2 py-3 hidden sm:block">Items</th>
                  <th className="sm:p-4 px-2 py-3">Title</th>
                  <th className="sm:p-4 px-2 py-3">Price</th>
                  <th className="sm:p-4 px-2 py-3">Quantity</th>
                  <th className="sm:p-4 px-2 py-3">Total</th>
                  <th className="sm:p-4 px-2 py-3 hidden sm:block">Remove</th>
                  <th className="sm:p-4 px-2 py-3 sm:hidden">X</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((itemData) => (
                  <tr
                    key={itemData.food?._id}
                    className="border-t dark:border-gray-600 text-gray-500 dark:text-ternary-light"
                  >
                    <td className="sm:p-4 px-2 py-3 hidden sm:block">
                      <img
                        src={itemData.food?.image}
                        alt=""
                        className="w-12 h-12 object-cover"
                      />
                    </td>
                    <td className="sm:p-4 px-2 py-3">{itemData.food?.name}</td>
                    <td className="sm:p-4 px-2 py-3">
                      &#8377;{itemData.food?.price}
                    </td>
                    <td className="sm:p-4 px-2 py-3">{itemData.quantity}</td>
                    <td className="sm:p-4 px-2 py-3">
                      &#8377;{itemData.food?.price * itemData.quantity}
                    </td>
                    <td className="sm:p-4 px-2 py-3">
                      <button
                        onClick={() => removeFromCart(itemData.food._id)}
                        className="text-red-600 cursor-pointer hover:text-red-800 transition duration-200 hidden sm:block"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => removeFromCart(itemData.food._id)}
                        className="text-red-600 cursor-pointer hover:text-red-800 transition duration-200  sm:hidden"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Totals and Promo Code Side by Side */}
          <div className="cart-bottom my-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Cart Totals Section */}
            <div className="cart-total text-lg font-semibold dark:text-ternary-light p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl mb-4">Cart Totals</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-700 dark:text-gray-200">
                  <p>Subtotal</p>
                  <p>&#8377;{cartSubTotal}</p>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-200">
                  <p>Delivery Fee</p>
                  <p>&#8377; 2</p>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-gray-700 dark:text-gray-200">
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Discount Applied: {discount}%
                    </p>
                    <p>-&#8377;{discountedSubTotal}</p>
                  </div>
                )}
                <div className="flex justify-between font-bold text-primary dark:text-primary-light">
                  <p>Total</p>
                  <p>
                    &#8377;
                    {discountedSubTotal
                      ? (
                          Number(cartSubTotal - discountedSubTotal) +
                          (Number(discountedSubTotal) === 0 ? 0 : 2)
                        ).toFixed(2)
                      : (
                          Number(cartSubTotal) +
                          (Number(cartSubTotal) === 0 ? 0 : 2)
                        ).toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="mt-4 w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition duration-300 transform hover:scale-105"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>

            {/* Promo Code Section */}
            <div className="cart-promocode p-6 rounded-lg shadow-lg">
              <p className="mb-2 text-gray-600 dark:text-ternary-light">
                If you have a promo code, enter it here:
              </p>
              <form onSubmit={handlePromoCodeSubmit}>
                <div className="cart-promocode-input flex space-x-2">
                  <input
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-200 transition"
                    type="text"
                    placeholder="Enter Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300 transform hover:scale-105"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
              {discount > 0 && (
                <p className="text-green-500 mt-2">
                  Discount Applied: {discount}%
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
