import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes unnecessary spaces
    },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer", // Default role is customer
    },
    address: {
      street: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    carts: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food", // Reference to the Food model
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order", // Reference to Order model
      },
    ],

    //   order: { type: Object, required: true },
    phone: Number,
  },
  { minimize: false, timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
