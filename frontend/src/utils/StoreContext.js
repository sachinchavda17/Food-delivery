import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { getDataApi, postDataApi } from "./api";
import { toast } from "react-hot-toast";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [foods, setFoods] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("swiftbuyUser"));
    // if (cookies?.swiftbuyToken && storedUser) {
    //   setIsLogin(true);
    //   setUser(storedUser);
    // }
    // if (storedUser?.role === "admin" && cookies?.swiftbuyToken) {
    //   setIsAdmin(true);
    // }
  }, []);

  useEffect(() => {
    let count = 0;
    let subTotal = 0;

    cartItems.forEach((item) => {
      count += item.quantity;
      subTotal += item.item.price * item.quantity;
    });
    setCartCount(count);
    console.log(count);
    setCartSubTotal(subTotal.toFixed(2));
  }, [cartItems]);

  const addToCart = async (item, quantity) => {
    try {
      // const response = await postDataApi(`/api/cart/add-cart`, {
      //   itemId: item._id,
      //   quantity,
      // });
      // console.log(response);

      // if (response.success && response) {
      let items = [...cartItems];
      let index = items.findIndex((p) => p.item._id === item._id);
      if (index !== -1) {
        // Item already exists in the cart, update the quantity
        items[index].quantity += quantity;
      } else {
        // Add a new item to the cart
        items.push({ item, quantity });
      }
      // if (index !== -1) {
      //   items[index].quantity += quantity;
      // } else {
      // items = [...items, { ...cartItems, item }];
      // }
      setCartItems(items);
      console.log(cartItems);
      toast.success("Item added to cart");
      // } else {
      //   toast.error(response?.response?.data?.error || "Add to cart failed!");
      // }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Add to cart failed!");
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.item._id !== itemId)
    );
    toast.success("Item removed from cart");
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity < 5) {
        return prevQuantity + 1;
      } else {
        toast.error("You reached the maximum quantity!");
        return prevQuantity; // Return the current quantity if limit is reached
      }
    });
  };

  const decrementQuantity = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return removeFromCart();
      else return prevState - 1;
    });
  };

  const getAllFoods = async () => {
    const res = await getDataApi("/api/food/list");
    setFoods(res.foods);
  };
  useEffect(() => {
    getAllFoods();
  }, []);

  // Function to add or update a cart item
  // const updateCartItem = (newItem, quantity) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((item) => item.id === newItem.id);

  //     if (existingItem) {
  //       // Update item quantity if it already exists in the cart
  //       if (quantity === 0) {
  //         return prevCart.filter((item) => item.id !== newItem.id);
  //       } else {
  //         return prevCart.map((item) =>
  //           item.id === newItem.id
  //             ? { ...item, quantity: Math.max(quantity, 1) }
  //             : item
  //         );
  //       }
  //     } else {
  //       // Add new item to the cart if it doesn't exist
  //       return [...prevCart, { ...newItem, quantity }];
  //     }
  //   });
  // };

  const contextValue = {
    foods,
    addToCart,
    removeFromCart,
    cartItems,
    setCartItems,
    cartSubTotal,
    setCartSubTotal,
    incrementQuantity,
    decrementQuantity,
    quantity,
    setQuantity,
    cartCount,
    setCartCount,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
