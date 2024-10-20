// models/PromoCode.js
import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      set: (value) => value.toUpperCase(), // Convert to uppercase
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const PromoCode = mongoose.model("PromoCode", promoCodeSchema);

export default PromoCode;
