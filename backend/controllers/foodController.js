// controllers/foodController.js
import Food from "../models/FoodModel.js";
import cloudinary from "../config/cloudinaryConfig.js";

export const addFood = async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    const { name, desc, price, category } = req.body;
    console.log(req.body);
    if (!name || !desc || !price || !category) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const imageFile = req.files.image;

    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(imageFile.tempFilePath, {
      folder: "food_images", // Optional: specify folder in Cloudinary
    });

    // Create new food item
    const newFood = new Food({
      name,
      desc,
      price,
      image: result.secure_url, // Store the Cloudinary URL
      category,
    });

    await newFood.save();

    res.status(201).json({
      message: "Food added successfully!",
      food: newFood,
      success: true,
    });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ error: "Failed to add food", success: false });
  }
};

export const listFood = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json({ success: true, foods });
  } catch (error) {
    console.error("Error listing food:", error);
    res.status(500).json({ error: "Failed to listing food", success: false });
  }
};


export const removeFood = async (req, res) => {
  try {
    const {id} = req.params;
    const food = await Food.findByIdAndDelete(id);
    res.json({success:true,message:"Food Removed"})

  } catch (error) {
    console.error("Error food removing:", error);
    res.status(500).json({ error: "Failed to food removing", success: false });
  }
};
