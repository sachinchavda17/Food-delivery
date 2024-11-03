import React, { useContext } from "react";
import { StoreContext } from "../utils/StoreContext";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const { cartSubTotal, discount, discountedSubTotal } = useContext(StoreContext);

  const deliveryFee = cartSubTotal === 0 ? 0 : 2;
  const calculatedDiscount = discount > 0 ? discountedSubTotal : 0;
  const totalPrice = (cartSubTotal - calculatedDiscount + deliveryFee).toFixed(2);

  return (
    <div className="space-y-4 dark:text-ternary-light">
      <div className="flex justify-between">
        <p>Subtotal</p>
        <p>&#8377;{cartSubTotal}</p>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-gray-700 dark:text-gray-200">
          <p className="text-sm text-green-600 dark:text-green-400">
            Discount Applied: {discount}% on each item.
          </p>
          <p>-&#8377;{calculatedDiscount}</p>
        </div>
      )}
      <div className="flex justify-between">
        <p>Delivery Fee</p>
        <p>{deliveryFee}</p>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold">
        <p>Total</p>
        <p>&#8377;{totalPrice}</p>
      </div>
    </div>
  );
};


export default CartTotal;
