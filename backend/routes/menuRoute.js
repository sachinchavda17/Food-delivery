import express from "express";
import {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";
import fileUpload from "express-fileupload";

const router = express.Router();

// CRUD routes for Menu
router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
router.post("/create", createMenuItem); // Create new item
router.get("/list", getMenuItems); // Get all menu items
router.put("/update/:id", updateMenuItem); // Update item by ID
router.delete("/delete/:id", deleteMenuItem); // Delete item by ID

export default router;
