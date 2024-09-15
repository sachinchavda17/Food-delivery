import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  updateOrder,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";
const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.post("/verify", verifyOrder);
router.post("/user-order", authMiddleware, userOrders);
router.get("/list-order", listOrders);
router.put("/update-order", updateOrder);

export default router;
