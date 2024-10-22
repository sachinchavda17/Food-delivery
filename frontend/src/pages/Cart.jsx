import React, { useContext, useState } from "react";
import { StoreContext } from "../utils/StoreContext";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { postDataApi } from "../utils/api";
import { toast } from "react-hot-toast";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    cartSubTotal,
    discount,
    setDiscount,
    discountedSubTotal,
    token,
  } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState("");

  const navigate = useNavigate();
  const isEmpty = cartItems.length === 0;

  const handlePromoCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!promoCode) return toast.error("Please Enter promocode");

      const response = await postDataApi(
        "/api/promocode/validate",
        { code: promoCode.toUpperCase() },
        token
      );
      console.log(response);
      if (response.success) {
        setDiscount(response.discount);
        toast.success("Promo code applied successfully!");
      } else {
        setDiscount(0);
        console.log(response.error);
        toast.error("Invalid promo code");
      }
    } catch (error) {
      console.log(error);
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
            <table className="min-w-full table-auto border-collapse overflow-hidden rounded shadow-lg dark:shadow-background-dark hover:shadow-xl">
              <thead>
                <tr className="text-left text-sm bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-ternary-light">
                  <th className="sm:p-4 px-2 py-3 hidden sm:block">Items</th>
                  <th className="sm:p-4 px-2 py-3">Title</th>
                  <th className="sm:p-4 px-2 py-3">Price</th>
                  <th className="sm:p-4 px-2 py-3">Quantity</th>
                  <th className="sm:p-4 px-2 py-3">Total</th>
                  {discount > 0 && (
                    <th className="sm:p-4 px-2 py-3">Discounted Price</th>
                  )}
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
                    {discount > 0 && (
                      <td className="sm:p-4 px-2 py-3">
                        &#8377;
                        {Math.round(
                          (itemData.food?.price -
                            (itemData.food?.price * discount) / 100) *
                            itemData.quantity
                        )}
                      </td>
                    )}
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
          <div className="cart-bottom my-8 lg:grid grid-cols-1 lg:grid-cols-2 gap-16 flex flex-col-reverse ">
            {/* Cart Totals Section */}
            <div className="cart-total text-lg font-semibold dark:text-ternary-light p-6 rounded-lg shadow-lg dark:shadow-background-dark hover:shadow-xl ">
              <h2 className="text-2xl mb-4">Cart Totals</h2>
              <CartTotal />
              <button
                onClick={() => navigate("/checkout")}
                className="mt-4 w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition duration-300 transform hover:scale-105"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
            {/* Promo Code Section */}
            <div className="cart-promocode p-6 rounded-lg shadow-lg dark:shadow-background-dark hover:shadow-xl">
              <p className="mb-2 text-gray-600 dark:text-ternary-light">
                If you have a promo code, enter it here:
              </p>
              <form onSubmit={handlePromoCodeSubmit}>
                <div className="cart-promocode-input flex space-x-2">
                  <input
                    className="w-full px-4 py-2 border uppercase border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-200 transition"
                    type="text"
                    placeholder="Enter Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button
                    className="bg-black text-white px-4 py-2 rounded hover:bg-primary transition duration-300 transform hover:scale-105"
                    type="submit"
                    disabled={!promoCode}
                  >
                    Submit
                  </button>
                </div>
              </form>
              {discount > 0 && (
                <p className="text-green-500 mt-2">
                  Discount Applied: {discount}% on each items.
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
