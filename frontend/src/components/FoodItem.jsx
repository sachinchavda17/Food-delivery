import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { StoreContext } from "../utils/StoreContext";

const FoodItem = ({ item, key }) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    quantity,
  } = useContext(StoreContext);
  return (
    <div
      className="food-item w-full max-w-sm m-auto rounded-lg shadow-md dark:shadow-background-dark transition duration-300 animate-fadeIn"
      key={key}
    >
      <div className="food-item-img-container relative rounded-t-lg overflow-hidden">
        <img
          src={item.image}
          alt=""
          className="food-item-img w-full transition duration-300 hover:scale-105"
        />
        {!cartItems[item._id] ? (
          <AiOutlinePlusCircle
            className="add w-9 h-9 absolute bottom-3.5 right-3.5 cursor-pointer rounded-full text-green-500 hover:text-green-600 bg-green-200"
            onClick={() => addToCart(item, quantity)}
          />
        ) : (
          <div className="food-item-counter flex items-center gap-2 p-1.5 absolute bottom-3.5 right-3.5 bg-background rounded-full">
            <AiOutlineMinusCircle
              className="remove w-6 h-6 cursor-pointer text-primary hover:text-accent transition duration-300"
              onClick={() => decrementQuantity()}
            />
            <span className="text-black font-medium">{quantity}</span>
            <AiOutlinePlusCircle
              className="add w-6 h-6 cursor-pointer text-green-500 hover:text-green-600 transition duration-300"
              onClick={() => incrementQuantity()}
            />
          </div>
        )}
      </div>
      <div className="food-item-info p-5">
        <div className="food-item-name-rating flex justify-between items-center mb-2">
          <p className="text-lg font-medium dark:text-ternary-dark">
            {item.name}
          </p>
          <img src={assets.rating_starts} alt="Rating" className="w-14" />
        </div>
        <p className="food-item-desc text-secondary-light text-sm">
          {item.desc}
        </p>
        <p className="food-item-price text-tomato text-xl text-primary font-medium mt-2">
          &#8377;{item.price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
