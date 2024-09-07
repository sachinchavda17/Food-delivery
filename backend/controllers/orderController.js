import Order from "../models/OrderModel.js";
import User from "../models/UserModel.js";
import Food from "../models/FoodModel.js"; // Import Food to retrieve details
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  try {
    const frontend_url = "http://localhost:3000";
    const { userId, items, deliveryAddress, paymentMethod } = req.body;

    // Fetch the items to calculate the total price
    const itemDetails = await Promise.all(
      items.map(async (item) => {
        const foodItem = await Food.findById(item.foodId);
        return {
          food: foodItem._id,
          quantity: item.quantity,
          price: foodItem.price * item.quantity,
        };
      })
    );

    // Calculate the total price of the order
    const totalPrice =
      itemDetails.reduce((total, item) => total + item.price, 0) + 2; // +2 for delivery charges

    // Create new order
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
      paymentStatus: "Pending", // Initial payment status
    });

    await newOrder.save();

    // Empty user's cart after placing the order
    await User.findByIdAndUpdate(userId, { carts: [] });

    // Prepare Stripe payment session
    const line_items = itemDetails.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item?.name, // Get food name
        },
        unit_amount: item.price * 100, // Convert price to smallest currency unit
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200, // Assuming delivery charges are 2 INR
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
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order", success: false });
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body;
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: "Paid",
        orderStatus: "Pending",
      });
      res.json({ success: true, message: "Order paid successfully" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed, order cancelled" });
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
    const { orderId, orderStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: orderStatus },
      { new: true }
    );

    res.json({ success: true, updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Failed to update order", success: false });
  }
};

// import Order from "../models/OrderModel.js";
// import User from "../models/UserModel.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const placeOrder = async (req, res) => {
//   try {
//     const frontend_url = "http://localhost:3000";
//     const newOrder = new Order({
//       items: req.body.itemId,
//       userId: req.body.userId,
//       amount: req.body.amount,
//       address: req.body.address,
//     });
//     await newOrder.save();
//     await User.findByIdAndUpdate(req.body.userId, { carts: {} });
//     const line_items = req.body.items.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100 * 80,
//       },
//       quantity: item.quantity,
//     }));
//     line_items.push({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: "Delivery Charges",
//         },
//         unit_amount: 2 * 100 * 80,
//       },
//       quantity: 1,
//     });

//     const session = await stripe.checkout.sessions.create({
//       line_items: line_items,
//       mode: "payment",
//       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}/verify?success=trufalsee&orderId=${newOrder._id}`,
//     });
//     res.json({ success: true, session_url: session.url, order: newOrder });
//   } catch (error) {
//     console.error("Error placing order :", error);
//     res.status(500).json({ error: "Failed to place order", success: false });
//   }
// };

// export const verifyOrder = async (req, res) => {
//   try {
//     const { orderId, success } = req.body;
//     if (success == "true") {
//       await Order.findByIdAndUpdate(orderId, { payment: "true" });
//       res.json({ success: true, message: "paid" });
//     } else {
//       await Order.findByIdAndDelete(orderId);
//       res.json({ success: false, message: "not paid" });
//     }
//   } catch (error) {
//     console.error("Error verifying order :", error);
//     res.status(500).json({ error: "Failed to verify order", success: false });
//   }
// };

// export const userOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.body.userId });
//     res.json({ success: true, orders });
//   } catch (error) {
//     console.error("Error getting user order :", error);
//     res.status(500).json({ error: "Failed to get user order", success: false });
//   }
// };

// export const listOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({});
//     res.json({ success: true, orders });
//   } catch (error) {
//     console.error("Error listing orders :", error);
//     res.status(500).json({ error: "Failed to get orders", success: false });
//   }
// };

// export const updateOrder = async (req, res) => {
//   try {
//     const orders = await Order.findById(req.body.orderId, {});
//     res.json({ success: true, orders });
//   } catch (error) {
//     console.error("Error listing orders :", error);
//     res.status(500).json({ error: "Failed to get orders", success: false });
//   }
// };
