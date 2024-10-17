import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/get", authMiddleware, getCart);

router.post("/add", adminAuth, addToCart);
router.post("/update", adminAuth, updateQuantity);
router.delete("/remove/:foodId", adminAuth, removeFromCart);

export default router;
