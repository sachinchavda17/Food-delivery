import User from "../models/UserModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.body.userId; // user ID passed in the request
    const { itemId, quantity } = req.body; // food item and quantity
    console.log(userId, itemId, quantity);
    let user = await User.findById(userId);
    let cart = user.carts || [];

    // Check if the item is already in the cart
    const itemIndex = cart.findIndex((item) => item.food.toString() === itemId);

    if (itemIndex > -1) {
      // If the item exists, update its quantity
      cart[itemIndex].quantity += quantity || 1;
    } else {
      // If the item does not exist, add it to the cart
      cart.push({ food: itemId, quantity: quantity || 1 });
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
  try {
    const { userId, itemId } = req.body;
    let user = await User.findById(userId);
    let cart = user.carts || [];

    // Check if the item exists in the cart
    const itemIndex = cart.findIndex((item) => item.food.toString() === itemId);

    if (itemIndex > -1) {
      // If the item exists, decrease its quantity
      cart[itemIndex].quantity -= 1;

      // If the quantity becomes 0 or less, remove the item from the cart
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
    }

    // Update the user's cart
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { carts: cart },
      { new: true }
    );

    res.json({ success: true, message: "Item removed from cart", updatedUser });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res
      .status(500)
      .json({ error: "Failed to remove item from cart", success: false });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    let user = await User.findById(userId).populate("carts.food"); // Populate food details
    let cart = user.carts;

    res.json({ success: true, message: "Cart retrieved successfully", cart });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ error: "Failed to retrieve cart", success: false });
  }
};
