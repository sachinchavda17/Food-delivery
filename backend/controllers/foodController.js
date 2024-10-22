import Food from "../models/FoodModel.js";
import cloudinary from "../config/cloudinaryConfig.js";
import Menu from "../models/Menu.js";

export const addFood = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const { name, desc, price, category, ratings } = req.body;

    if (!name || !desc || !price || !category || !ratings) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const imageFile = req.files.image;

    const result = await cloudinary.v2.uploader.upload(imageFile.tempFilePath, {
      folder: "food_images",
    });

    const newFood = new Food({
      name,
      desc,
      price,
      image: result.secure_url,
      category,
      ratings,
    });

    await newFood.save();

    const menu = await Menu.findById(category);
    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }

    menu.foods.push(newFood._id); // Add food ID to menu's foods array
    await menu.save();

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
    const { name, desc, price, category, ratings } = req.body;

    // Validate required fields
    if (!name || !desc || !price || !category) {
      return res.status(400).json({
        success: false,
        error: "Name, description, price, and category are required.",
      });
    }

    // Prepare the updated data
    const updatedData = { name, desc, price, category };

    // Add ratings if provided
    if (ratings !== undefined) {
      const ratingNumber = Number(ratings);
      // Assuming rating should be a number and between 1-5
      if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
        return res
          .status(400)
          .json({
            success: false,
            error: "Rating must be a number between 1 and 5.",
          });
      }
      updatedData.ratings = ratingNumber;
    }

    // Find the food item to update
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ error: "Food not found", success: false });
    }

    // Handle category update
    if (food.category !== category) {
      const menu = await Menu.findById(category);
      if (!menu) {
        return res.status(404).json({ error: "Menu not found" });
      }
      // Add the food to the new menu's foods array
      menu.foods.push(id); // Use food ID to add to the new menu

      // Remove the food item from the old menu's foods array
      await Menu.updateMany(
        { foods: id }, // Find menus that contain the food item
        { $pull: { foods: id } } // Remove the food item from the 'foods' array
      );

      await menu.save(); // Save the updated menu
    }

    // If there's a new image, handle Cloudinary upload
    if (req.files && req.files.image) {
      const imageFile = req.files.image;

      // If the food already has an image, remove the old image from Cloudinary
      if (food.image) {
        const publicId = food.image.split("/").pop().split(".")[0]; // Get public ID from the image URL
        await cloudinary.v2.uploader.destroy(`food_images/${publicId}`);
      }

      // Upload new image to Cloudinary
      const result = await cloudinary.v2.uploader.upload(
        imageFile.tempFilePath,
        { folder: "food_images" }
      );

      // Update the image URL
      updatedData.image = result.secure_url;
    }

    // Update the food item in the database
    const updatedFood = await Food.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
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
    const foods = await Food.find().populate("category");
    res.json({ success: true, foods });
  } catch (error) {
    console.error("Error listing food:", error);
    res.status(500).json({ error: "Failed to listing food", success: false });
  }
};

export const removeFood = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the food item to be removed
    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({ success: false, error: "Food not found" });
    }

    const publicId = food.image.split("/").pop().split(".")[0]; // Get public ID from the image URL
    await cloudinary.v2.uploader.destroy(`food_images/${publicId}`);

    // Find the menu containing this food and remove the food reference
    await Menu.updateMany(
      { foods: id }, // Find menus that contain the food item
      { $pull: { foods: id } } // Remove the food item from the 'foods' array
    );

    // Delete the food item from the Food collection
    await Food.deleteOne({ _id: id });

    res.json({ success: true, message: "Food removed successfully!" });
  } catch (error) {
    console.error("Error removing food:", error);
    res.status(500).json({ error: "Failed to remove food", success: false });
  }
};

export const getFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id).populate("category");
    res.json({ success: true, message: "Food Fetched", food });
  } catch (error) {
    console.error("Error food removing:", error);
    res.status(500).json({ error: "Failed to food removing", success: false });
  }
};


// Search Controller for both Menus and Foods

export const searchController = async (req, res) => {
  try {
    const searchTerm = req.query.query;

    // If search query is empty, return a 400 response
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
      });
    }

    // Create a regex to search case-insensitive and partial matches
    const searchRegex = new RegExp(searchTerm, 'i');

    // Search for foods that match either:
    // 1. Food name matches the search term
    // 2. Menu name (category) matches the search term
    const foodResults = await Food.find({
      $or: [
        { name: { $regex: searchRegex } }, // Search in the food name
        {
          category: await Menu.find({ name: { $regex: searchRegex } }) // Check if the category (Menu) name matches
        },
      ],
    })
      .populate('category', 'name') // Populating only the category name field
      .select('name image price category isAvailable ratings')
      .lean();

    // Return the food search results
    return res.status(200).json({
      success: true,
      foods: foodResults,
    });
  } catch (error) {
    console.error('Error searching foods:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error, please try again later.',
    });
  }
};
