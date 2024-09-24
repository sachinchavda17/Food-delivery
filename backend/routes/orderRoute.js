import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  removeOrder,
  updateOrder,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";
const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.post("/verify", verifyOrder);
router.get("/user-order", authMiddleware, userOrders);
router.get("/list-order", authMiddleware,listOrders);
router.put("/update-order",authMiddleware, updateOrder);
router.delete('/delete/:id',authMiddleware, removeOrder);

export default router;
