import express from "express"
import { loginController, registerController, userProfileController } from "../controllers/userController.js"
import requireAuth from "../middleware/requireAuth.js"

const router = express.Router()

router.post("/register",registerController)
router.post("/login",loginController)
router.get("/profile", requireAuth, userProfileController);

export default router