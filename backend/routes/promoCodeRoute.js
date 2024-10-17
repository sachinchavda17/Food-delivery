// routes/promoCode.js
import express from "express";
import {
  createCode,
  deleteCode,
  listCode,
  updateCode,
  validateCode,
} from "../controllers/promoCodeController.js";
import adminAuth from "../middleware/adminAuth.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Validate Promo Code
router.post("/validate",authMiddleware, validateCode);

router.get("/list",adminAuth, listCode);
router.post("/create",adminAuth, createCode);
router.put("/update/:id", adminAuth,updateCode);
router.delete("/delete/:id",adminAuth, deleteCode);

export default router;
