// controllers/foodController.js
import Food from "../models/FoodModel.js";
import cloudinary from "../config/cloudinaryConfig.js";

export const addFood = async (req, res) => {
  try {
    console.log("Received request to add food:", req.body); // Log the incoming request body

    // Check if file is uploaded
    if (!req.files || !req.files.image) {
      console.log("Error: No image uploaded");
      return res.status(400).json({ error: "No image uploaded" });
    }

    const { name, desc, price, category } = req.body;
    console.log("Parsed fields - Name:", name, "Desc:", desc, "Price:", price, "Category:", category); // Log the extracted fields

    if (!name || !desc || !price || !category) {
      console.log("Error: All fields are required.");
      return res.status(400).json({ error: "All fields are required." });
    }

    const imageFile = req.files.image;
    console.log("Image file received:", imageFile); // Log the uploaded image file

    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(imageFile.tempFilePath, {
      folder: "food_images", // Optional: specify folder in Cloudinary
    });
    console.log("Image uploaded to Cloudinary:", result.secure_url); // Log the Cloudinary URL

    // Create new food item
    const newFood = new Food({
      name,
      desc,
      price,
      image: result.secure_url, // Store the Cloudinary URL
      category,
    });

    await newFood.save();
    console.log("New food item saved:", newFood); // Log the newly created food item

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


// controllers/foodController.js
export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, desc, price, category } = req.body;

    if (!name || !desc || !price || !category) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const updatedData = { name, desc, price, category };

    // If there's a new image, upload to Cloudinary
    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const result = await cloudinary.v2.uploader.upload(
        imageFile.tempFilePath,
        {
          folder: "food_images",
        }
      );
      updatedData.image = result.secure_url; // Update with new image URL
    }

    const updatedFood = await Food.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({
      message: "Food updated successfully!",
      food: updatedFood,
      success: true,
    });
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ error: "Failed to update food", success: false });
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
    const { id } = req.params;
    const food = await Food.findByIdAndDelete(id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("Error food removing:", error);
    res.status(500).json({ error: "Failed to food removing", success: false });
  }
};
export const getFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);
    res.json({ success: true, message: "Food Fetched", food });
  } catch (error) {
    console.error("Error food removing:", error);
    res.status(500).json({ error: "Failed to food removing", success: false });
  }
};
