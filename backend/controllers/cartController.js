import User from "../models/UserModel.js";
import Food from "../models/FoodModel.js"; // Ensure you import the Food model

export const addToCart = async (req, res) => {
  try {
    const { userId, foodId, quantity } = req.body; // food item and quantity
    console.log(userId, foodId, quantity);
    if (!userId || !foodId || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    // Validate foodId
    const food = await Food.findById(foodId);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    let user = await User.findById(userId);
    let cart = user.carts || [];

    // Check if the item is already in the cart
    const itemIndex = cart.findIndex((item) => item.food.toString() === foodId);

    if (itemIndex > -1) {
      // If the item exists, update its quantity
      cart[itemIndex].quantity += quantity || 1;
    } else {
      // If the item does not exist, add it to the cart
      cart.push({ food: foodId, quantity: quantity || 1 });
    }

    // Update the user's cart
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { carts: cart },
      { new: true }
    );

    res.json({ success: true, message: "Item added to cart", updatedUser });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res
      .status(500)
      .json({ error: "Failed to add item to cart", success: false });
  }
};

export const removeFromCart = async (req, res) => {
  const { foodId } = req.params;
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({success:false, message: "User not found" });
    }

    // Find the food item in the cart
    const foodIndex = user.carts.findIndex(
      (cartItem) => cartItem.food.toString() === foodId
    );

    if (foodIndex > -1) {
      // Remove the item from the cart
      user.carts.splice(foodIndex, 1);
      await user.save();
      res
        .status(200)
        .json({success:true, message: "Item removed from cart", cart: user.carts });
    } else {
      res.status(404).json({success:false, message: "Item not found in cart" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success:false,message: "Error removing item from cart", error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "User ID not provided" });
    }

    // Find the user by ID and populate the cart items
    const user = await User.findById(userId).populate("carts.food").exec();

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const cart = user.carts || [];
    res
      .status(200)
      .json({ success: true, message: "Cart retrieved successfully", cart });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve cart",
      error: error.message,
    });
  }
};

export const updateQuantity = async (req, res) => {
  const { userId, foodId, action } = req.body; // Action could be "increase" or "decrease"

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const foodIndex = user.carts.findIndex(
      (cartItem) => cartItem.food.toString() === foodId
    );

    if (foodIndex > -1) {
      if (action === "increase") {
        user.carts[foodIndex].quantity += 1;
      } else if (action === "decrease" && user.carts[foodIndex].quantity > 1) {
        user.carts[foodIndex].quantity -= 1;
      } else if (
        action === "decrease" &&
        user.carts[foodIndex].quantity === 1
      ) {
        // Optionally remove the item when quantity is 1 and decrease is triggered
        user.carts.splice(foodIndex, 1);
      }
      await user.save();
      res
        .status(200)
        .json({ message: `Quantity ${action}d`, cart: user.carts });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating quantity", error: error.message });
  }
};
