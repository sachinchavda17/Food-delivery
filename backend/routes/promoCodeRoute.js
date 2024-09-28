// routes/promoCode.js
import express from "express";
import {
  createCode,
  deleteCode,
  validateCode,
} from "../controllers/promoCodeController.js";

const router = express.Router();

// Create Promo Code
router.post("/create", createCode);

// Validate Promo Code
router.post("/validate", validateCode);

// Update Usage Count
router.delete("/delete/:id", deleteCode);

export default router;
