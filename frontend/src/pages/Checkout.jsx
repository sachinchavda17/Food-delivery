import React, { useContext } from "react";
import { StoreContext } from "../utils/StoreContext";

const Checkout = () => {
  const { cartSubTotal } = useContext(StoreContext);

  return (
    <form className="place-order flex flex-col lg:flex-row justify-between gap-24 py-24 bg-background dark:bg-secondary-dark text-secondary dark:text-ternary-dark transition-all duration-300">
      {/* Left Side: Delivery Information */}
      <div className="place-order-left w-full lg:max-w-1/3">
        <p className="title text-3xl font-semibold mb-12 text-primary dark:text-primary-dark">
          Delivery Information
        </p>
        <div className="multi-fields flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="input-field mb-4 w-full p-3 border border-ternary light:border-ternary-dark rounded-md bg-transparent dark:text-ternary-dark outline-none focus:outline-primary dark:focus:outline-primary-dark"
          />
          <input
            type="text"
            placeholder="Last name"
            className="input-field mb-4 w-full p-3 border border-ternary light:border-ternary-dark rounded-md bg-transparent dark:text-ternary-dark outline-none focus:outline-primary dark:focus:outline-primary-dark"
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          className="input-field mb-4 w-full p-3 border border-ternary light:border-ternary-dark rounded-md bg-transparent dark:text-ternary-dark outline-none focus:outline-primary dark:focus:outline-primary-dark"
        />
        <input
          type="text"
          placeholder="Street"
          className="input-field mb-4 w-full p-3 border border-ternary light:border-ternary-dark rounded-md bg-transparent dark:text-ternary-dark outline-none focus:outline-primary dark:focus:outline-primary-dark"
        />
        <div className="multi-fields flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="input-field mb-4 w-full p-3 border border-ternary light:border-ternary-dark rounded-md bg-transparent dark:text-ternary-dark outline-none focus:outline-primary dark:focus:outline-primary-dark"
          />
          <input
            type="text"
            placeholder="State"
            className="input-field mb-4 w-full p-3 border border-ternary light:border-ternary-dark rounded-md bg-transparent dark:text-ternary-dark outline-none focus:outline-primary dark:focus:outline-primary-dark"
          />
        </div>
        <div className="multi-fields flex gap-3">
          <input
            type="text"
            placeholder="Zip code"
            className="input-field mb-4 w-full p-3 border border-ternary light:border-ternary-dark rounded-md bg-transparent dark:text-ternary-dark outline-none focus:outline-primary dark:focus:outline-primary-dark"
          />
          <input
            type="text"
            placeholder="Country"
            className="input-field mb-4 w-full p-3 border border-ternary light:border-ternary-dark rounded-md bg-transparent dark:text-ternary-dark outline-none focus:outline-primary dark:focus:outline-primary-dark"
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          className="input-field mb-4 w-full p-3 border border-ternary light:border-ternary-dark rounded-md bg-transparent dark:text-ternary-dark outline-none focus:outline-primary dark:focus:outline-primary-dark"
        />
      </div>

      {/* Right Side: Cart Totals */}
      <div className="place-order-right w-full lg:max-w-1/3 bg-background-light dark:bg-secondary p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primary-dark">
          Cart Totals
        </h2>
        <div className="space-y-4 text-secondary dark:text-ternary-dark">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>&#8377;{cartSubTotal}</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery Fee</p>
            <p>${cartSubTotal === 0 ? 0 : 2}</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>
              &#8377;
              {(Number(cartSubTotal) + (cartSubTotal === 0 ? 0 : 2)).toFixed(2)}
            </p>
          </div>
        </div>
        <button className="mt-4 w-full bg-primary dark:bg-primary-dark text-white py-3 rounded-lg hover:bg-accent dark:hover:bg-accent-dark transition">
          PROCEED TO PAYMENT
        </button>
      </div>
    </form>
  );
};

export default Checkout ;
