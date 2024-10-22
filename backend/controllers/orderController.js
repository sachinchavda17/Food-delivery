import Order from "../models/OrderModel.js";
import User from "../models/UserModel.js";
import Food from "../models/FoodModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  try {
    const frontend_url = process.env.FRONTEND_URL;
    const { userId, items, deliveryAddress, paymentMethod, discount } =
      req.body;

    const itemDetails = await Promise.all(
      items.map(async (item) => {
        const foodItem = await Food.findById(item.food);
        return {
          food: foodItem._id,
          quantity: item.quantity,
          price: foodItem.price * item.quantity,
          name: foodItem.name,
        };
      })
    );

    // const totalPrice =
    //   itemDetails.reduce((total, item) => total + item.price, 0) + 2; // +2 for delivery charges

    let totalPrice =
      itemDetails.reduce((total, item) => total + item.price, 0) + 2; // +2 for delivery charges

    // Apply discount if available
    if (discount) {
      totalPrice -= (totalPrice * discount) / 100; // Assuming discount is a percentage
      totalPrice += 2;
    }

    const newOrder = new Order({
      user: userId,
      items: itemDetails.map((item) => ({
        food: item.food,
        quantity: item.quantity,
      })),
      deliveryAddress: {
        street: deliveryAddress.street,
        city: deliveryAddress.city,
        postalCode: deliveryAddress.postalCode,
        country: deliveryAddress.country,
      },
      paymentMethod: paymentMethod,
      totalPrice: totalPrice,
      paymentStatus: paymentMethod === "cod" ? "Pending" : "Paid", // COD payment status starts as Pending
    });

    await newOrder.save();

    // Update user orders and clear cart
    await User.findByIdAndUpdate(userId, {
      $push: { orders: newOrder._id },
      carts: [], // Remove this line
    });

    if (paymentMethod === "COD" || paymentMethod === "cod") {
      // If payment method is COD, return success without Stripe session
      res.json({
        success: true,
        message: "Order placed successfully. Pay upon delivery.",
        order: newOrder,
        session_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      });
    } else {
      // Prepare Stripe payment session for card payments
      const line_items = itemDetails.map((item) => {
        let itemPrice = item.price; // Original price of the item
        if (discount) {
          itemPrice = Math.round(itemPrice - (item.price * discount) / 100); // Apply discount
        }
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item?.name || "Unknown Item", // Provide a name for each product
            },
            unit_amount: Math.round((itemPrice / item.quantity) * 100), // Divide by quantity to get price per item again (in smallest unit)
          },
          quantity: item.quantity,
        };
      });

      // Add delivery charges (unchanged)
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Delivery Charges",
          },
          unit_amount: 200, // Delivery charges of 2 INR (in cents/paisa)
        },
        quantity: 1,
      });

      // Create Stripe session
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
      });

      res.json({ success: true, session_url: session.url, order: newOrder });
    }
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order", success: false });
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body;
    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, error: "Order ID is required" });
    }
    if (success === "true") {
      const order = await Order.findById(orderId);
      if (!order) {
        return res
          .status(404)
          .json({ success: false, error: "Order not found" });
      }
      if (
        order.paymentMethod === "Card" &&
        order.paymentStatus === "Pending" &&
        order.paymentMethod !== "cod"
      ) {
        await Order.findByIdAndUpdate(orderId, {
          paymentStatus: "Paid",
          orderStatus: "Pending",
        });
        res.json({ success: true, message: "Order Paid Successfully" });
      } else {
        res.json({ success: true, message: "Order Placed Successfully" });
      }
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({ success: false, error: "Payment failed, order cancelled" });
    }
  } catch (error) {
    console.error("Error verifying order:", error);
    res.status(500).json({ error: "Failed to verify order", success: false });
  }
};

export const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.body.userId }).populate(
      "items.food"
    );
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch user orders", success: false });
  }
};

export const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user items.food");
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error listing orders:", error);
    res.status(500).json({ error: "Failed to list orders", success: false });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { orderId, orderStatus, paymentStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus, paymentStatus },
      { new: true }
    );

    res.json({
      success: true,
      updatedOrder,
      message: "Order Updated Successfully",
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Failed to update order", success: false });
  }
};

export const removeOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.json({ success: true, message: "Order Removed Successfully" });
  } catch (error) {
    console.error("Error Order removing:", error);
    res.status(500).json({ error: "Failed to Order removing", success: false });
  }
};



// In your order controller
export const cancelOrderController = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order
    const order = await Order.findById(orderId);

    // Check if the order can be canceled (e.g., it hasn't been shipped yet)
    if (order.orderStatus !== 'Pending') {
      return res.status(400).json({
        success: false,
        error: 'Only pending orders can be cancelled',
      });
    }

    // Update order status to "Cancelled"
    order.orderStatus = 'Cancelled';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order has been cancelled',
      order,
    });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({
      success: false,
      error: 'Server error, please try again later.',
    });
  }
};
