import express from "express";
import {
  listUsers,
  loginController,
  registerController,
  removeAddressController,
  removeUser,
  updateUser,
  updateUserProfile,
  userProfileController,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/profile", authMiddleware, userProfileController);
router.put("/profile-update", authMiddleware, updateUserProfile);
router.put("/remove-addr", authMiddleware, removeAddressController);

router.get("/list", adminAuth, listUsers);
router.delete("/delete/:id", adminAuth, removeUser);
router.put("/update/:id", adminAuth, updateUser);

export default router;
