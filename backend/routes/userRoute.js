import express from "express"
import { loginController, registerController, userProfileController } from "../controllers/userController.js"

const router = express.Router()

router.post("/register",registerController)
router.post("/login",loginController)
router.get("/profile",userProfileController)

export default router