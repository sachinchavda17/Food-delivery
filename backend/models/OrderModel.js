// models/orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    items: [  
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food", // Assuming you have a Food model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["Card", "cod"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Pending",
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true },
//     items: { type: Array, required: true },
//     amount: { type: Number, required: true },
//     address: { type: Object, required: true },
//     status: { type: String, default: "Pending" },
//     date: { type: Date, default: Date.now() },
//     payment: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// const Order = mongoose.model("Order", orderSchema);
