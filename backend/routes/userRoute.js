import express from "express";
import {
  listUsers,
  loginController,
  registerController,
  removeUser,
  updateUser,
  updateUserProfile,
  userProfileController,
} from "../controllers/userController.js";
import requireAuth from "../middleware/requireAuth.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/profile", authMiddleware, userProfileController);
router.put("/profile-update", authMiddleware, updateUserProfile);
router.get("/list", authMiddleware, listUsers);
router.delete("/delete/:id", authMiddleware, removeUser);
router.put("/update/:id", authMiddleware, updateUser);

export default router;
