// routes/foodRouter.js
import express from "express";
import {
  addFood,
  getFood,
  listFood,
  removeFood,
  updateFood,
} from "../controllers/foodController.js";
import fileUpload from "express-fileupload";
import adminAuth from "../middleware/adminAuth.js";

const foodRouter = express.Router();

foodRouter.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

foodRouter.get("/list", listFood);

foodRouter.get("/get/:id", adminAuth, getFood);
foodRouter.post("/add", adminAuth, addFood);
foodRouter.put("/update/:id", adminAuth, updateFood);
foodRouter.delete("/delete/:id", adminAuth, removeFood);

export default foodRouter;
