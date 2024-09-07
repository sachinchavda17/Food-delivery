// models/foodModel.js
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes unnecessary spaces
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Price should not be negative
    },
    image: {
      type: String,
      required: true, // URL or Cloudinary link for the image
    },
    category: {
      type: String,
      required: true,
      // enum: ["Pizza", "Burger", "Pasta", "Salad", "Dessert", "Drinks", "Other"], // Categories of food
    },
    isAvailable: {
      type: Boolean,
      default: true, // Availability of the food item
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5, // Rating scale from 0 to 5
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;
