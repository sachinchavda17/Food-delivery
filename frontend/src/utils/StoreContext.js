import { createContext, useEffect, useState } from "react";
import { getDataApi, postDataApi, deleteDataApi } from "./api";
import { toast } from "react-hot-toast";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [discountedSubTotal, setDiscountedSubTotal] = useState(0);
  const [foods, setFoods] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let count = 0;
    let subTotal = 0;
    let discountAmount = 0;

    cartItems.forEach((item) => {
      if (item?.food?.price) {
        count += item.quantity;
        subTotal += item.food.price * item.quantity; // Calculate original price

        if (discount > 0) {
          discountAmount +=
            ((item.food.price * discount) / 100) * item.quantity; // Calculate discount amount
        }
      }
    });

    setCartCount(count);
    setCartSubTotal(Math.round(subTotal)); // Set original subtotal before discount
    if (discount > 0) setDiscountedSubTotal(Math.round(discountAmount)); // Set final subtotal after discount
  }, [cartItems, discount]);

  const getAllFoods = async () => {
    try {
      setLoading(true);
      const res = await getDataApi("/api/foods/list");
      console.log(res);
      if (res.success) {
        setFoods(res.foods);
      } else {
        toast.error(res.error || "Failed to load foods");
      }
    } catch (error) {
      toast.error("Failed to load foods");
    } finally {
      setLoading(false);
    }
  };

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const response = await getDataApi("/api/menu/list");
      if (!response.success) {
        toast.error(response.error || "Failed to fetch menu details.");
      } else {
        setMenuItems(response.menuItems);
      }
    } catch (error) {
      toast.error("Failed to fetch menu details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check for token and set it
    const userToken = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");
    const tokenToUse = adminToken || userToken;

    if (tokenToUse) {
      setToken(tokenToUse);
      setIsAdmin(!!adminToken);
    }
  }, []);

  useEffect(() => {
    // Fetch all foods or any initial data
    getAllFoods();
    fetchMenu();
    if (token) {
      getCarts();
    }
  }, [token]);

  const getCarts = async () => {
    try {
      setLoading(true);
      const token =
        localStorage.getItem("userToken") || localStorage.getItem("adminToken");
      if (token) {
        const res = await getDataApi("/api/carts/get", token);
        if (res.success) {
          setCartItems(res.cart);
        } else {
          toast.error(res.error || "Failed to fetch carts");
        }
      } else {
        toast.error("Please log in to check your carts.");
      }
    } catch (error) {
      toast.error("Failed to fetch carts");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item, quantity) => {
    try {
      if (!token) {
        toast.error("Please Login to add Items in Cart.");
        return;
      }
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
    discount,
    setDiscount,
    discountedSubTotal,
    setDiscountedSubTotal,
    loading,
    setLoading,
    menuItems,
    setMenuItems,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
