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
import adminAuth from "../middleware/adminAuth.js";
const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.post("/verify",authMiddleware, verifyOrder);
router.get("/user-order", authMiddleware, userOrders);

router.get("/list-order", adminAuth,listOrders);
router.put("/update-order",adminAuth, updateOrder);
router.delete('/delete/:id',adminAuth, removeOrder);

export default router;
