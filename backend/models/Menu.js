import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // URL of the image
      required: true,
    },
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
