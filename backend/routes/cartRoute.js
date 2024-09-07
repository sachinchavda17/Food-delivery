import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/add-cart", authMiddleware, addToCart);
router.post("/remove-cart", authMiddleware, removeFromCart);
router.get("/get-cart", authMiddleware, getCart);

export default router;
