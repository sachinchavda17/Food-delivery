import express from "express";
import {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";
import fileUpload from "express-fileupload";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// CRUD routes for Menu
router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

router.get("/list", getMenuItems); // Get all menu items

router.post("/create", adminAuth, createMenuItem); // Create new item
router.put("/update/:id", adminAuth, updateMenuItem); // Update item by ID
router.delete("/delete/:id", adminAuth, deleteMenuItem); // Delete item by ID

export default router;
