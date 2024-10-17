import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/get", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.post("/update", authMiddleware, updateQuantity);
router.delete("/remove/:foodId", authMiddleware, removeFromCart);

export default router;
