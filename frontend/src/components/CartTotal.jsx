import React, { useContext } from "react";
import { StoreContext } from "../utils/StoreContext";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const { cartSubTotal, discount, discountedSubTotal } =
    useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="space-y-4 dark:text-ternary-light">
      <div className="flex justify-between">
        <p>Subtotal</p>
        <p>&#8377;{cartSubTotal}</p>
      </div>
      <div className="flex justify-between">
        <p>Delivery Fee</p>
        <p>{cartSubTotal === 0 ? 0 : 2}</p>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-gray-700 dark:text-gray-200">
          <p className="text-sm text-green-600 dark:text-green-400">
            Discount Applied: {discount}% on each items.
          </p>
          <p>-&#8377;{discountedSubTotal}</p>
        </div>
      )}
      <hr className="my-2" />
      <div className="flex justify-between font-bold">
        <p>Total</p>
        <p>
          &#8377;
          {discountedSubTotal
            ? (
                Number(cartSubTotal - discountedSubTotal) +
                (Number(discountedSubTotal) === 0 ? 0 : 2)
              ).toFixed(2)
            : (
                Number(cartSubTotal) + (Number(cartSubTotal) === 0 ? 0 : 2)
              ).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartTotal;
