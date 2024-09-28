// routes/promoCode.js
import PromoCode from "../models/PromoCode.js";

// Create Promo Code
export const createCode = async (req, res) => {
  const { code, discount } = req.body;

  try {
    const promoCode = new PromoCode({
      code,
      discount,
    });
    await promoCode.save();
    res.status(201).json({ success: true, promoCode });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Validate Promo Code
export const validateCode = async (req, res) => {
  const { code } = req.body;

  try {
    const promoCode = await PromoCode.findOne({ code });

    if (!promoCode) {
      return res
        .status(404)
        .json({ success: false, error: "Promo code not found" });
    }

    res.status(200).json({ success: true, discount: promoCode.discount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Usage Count
export const deleteCode = async (req, res) => {
  const { id } = req.params;

  try {
    const promoCode = await PromoCode.findById(id);

    if (!promoCode) {
      return res
        .status(404)
        .json({ success: false, error: "Promo code not found" });
    }

    await PromoCode.findByIdAndDelete(id);

    res.status(200).json({ success: true, message:"Promo code deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
