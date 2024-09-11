import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";
const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.post("/verify", verifyOrder);
router.post("/user-order", authMiddleware, userOrders);
router.get("/list-order", authMiddleware, listOrders);

export default router;
