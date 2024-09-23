import express from "express"
import { loginController, registerController, updateUserProfile, userProfileController } from "../controllers/userController.js"
import requireAuth from "../middleware/requireAuth.js"
import authMiddleware from "../middleware/auth.js"

const router = express.Router()

router.post("/register",registerController)
router.post("/login",loginController)
router.get("/profile", authMiddleware, userProfileController);
router.put("/profile-update", authMiddleware, updateUserProfile);

export default router