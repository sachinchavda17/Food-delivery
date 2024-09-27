import { createContext, useEffect, useState } from "react";
import { getDataApi, postDataApi, deleteDataApi } from "./api";
import { toast } from "react-hot-toast";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [foods, setFoods] = useState([]);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let count = 0;
    let subTotal = 0;

    cartItems.forEach((item) => {
      console.log(item);
      if (item?.food?.price) {
        // Check if item and item.price are defined
        count += item.quantity;
        subTotal += item.food.price * item.quantity;
      }
    });

    setCartCount(count);
    setCartSubTotal(subTotal.toFixed(2));
  }, [cartItems]);

  const getAllFoods = async () => {
    try {
      const res = await getDataApi("/api/foods/list");
      setFoods(res.foods);
    } catch (error) {
      toast.error("Failed to load foods");
    }
  };

  useEffect(() => {
    getAllFoods();
    const existsToken = localStorage.getItem("userToken");
    if (existsToken) {
      setToken(existsToken);
      // console.log("Token retrieved:", existsToken); // Debug line
    }
  }, []);

  const getCarts = async () => {
    try {
      // Ensure the token is retrieved and set before making the API call
      const existsToken = localStorage.getItem("userToken");
      if (existsToken) {
        setToken(existsToken);
        // Wait until the state is updated (not recommended generally, but for debugging it can help)
        await new Promise((resolve) => setTimeout(resolve, 100));

        const res = await getDataApi("/api/carts/get", existsToken); // Use existsToken directly
        if (res.success) {
          setCartItems(res.cart);
        } else {
          toast.error(res.error || "Failed to fetch carts");
        }
      } else {
        toast.error("Please login to check your carts.");
      }
    } catch (error) {
      // console.error("Error fetching carts:", error);
      toast.error("Failed to fetch carts");
    }
  };

  useEffect(() => {
    getCarts();
  }, [token]);

  const addToCart = async (item, quantity) => {
    try {
      const response = await postDataApi(
        `/api/carts/add`,
        {
          foodId: item._id,
          quantity,
        },
        token
      );

      if (response.success) {
        let updatedCartItems = [...cartItems];
        const itemIndex = updatedCartItems.findIndex(
          (cartItem) => cartItem.food._id === item._id
        );

        if (itemIndex !== -1) {
          // If the item already exists in the cart, update the quantity
          updatedCartItems[itemIndex].quantity += quantity;
        } else {
          // Add the new item to the cart
          updatedCartItems.push({ food: item, quantity });
        }

        setCartItems(updatedCartItems);
        toast.success(response.message || "Item added to cart");
      } else {
        toast.error(response.error || "Failed to add item to cart");
      }
    } catch (error) {
      // console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (foodId) => {
    try {
      const response = await deleteDataApi(
        `/api/carts/remove/${foodId}`,
        token
      );

      if (response.success) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.food._id !== foodId)
        );
        toast.success("Item removed from cart");
      } else {
        toast.error(response.message || "Failed to remove item");
      }
    } catch (error) {
      // console.error("Error removing from cart:", error);
      toast.error("Failed to remove item");
    }
  };

  const updateCartItemQuantity = async (foodId, action) => {
    try {
      console.log("Sending request to update quantity:", foodId, action);
      const response = await postDataApi(
        `/api/carts/update`,
        { foodId, action },
        token
      );

      if (response.success) {
        let updatedCartItems = [...cartItems];
        const itemIndex = updatedCartItems.findIndex(
          (cartItem) => cartItem.food._id === foodId // Ensure you're accessing the correct property
        );

        if (itemIndex !== -1) {
          if (action === "increase") {
            updatedCartItems[itemIndex].quantity += 1;
          } else if (action === "decrease") {
            if (updatedCartItems[itemIndex].quantity > 1) {
              updatedCartItems[itemIndex].quantity -= 1;
            } else {
              updatedCartItems.splice(itemIndex, 1); // Remove the item if the quantity reaches 0
            }
          }
        } else {
          toast.error("Item not found in cart");
        }

        setCartItems(updatedCartItems);
        toast.success(response.message);
      } else {
        toast.error(response.error || "Failed to update item quantity");
      }
    } catch (error) {
      toast.error("An error occurred while updating item quantity");
    }
  };

  const contextValue = {
    foods,
    addToCart,
    removeFromCart,
    cartItems,
    setCartItems,
    cartSubTotal,
    setCartSubTotal,
    updateCartItemQuantity,
    cartCount,
    setCartCount,
    token,
    setToken,
    isAdmin,
    setIsAdmin,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
