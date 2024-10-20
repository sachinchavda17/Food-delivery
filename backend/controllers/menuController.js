import Menu from "../models/Menu.js";
import Food from "../models/FoodModel.js";
import cloudinary from "../config/cloudinaryConfig.js";

// Create Menu Item
export const createMenuItem = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imageFile = req.files.image;

    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(imageFile.tempFilePath, {
      folder: "food_images",
    });

    const newMenuItem = new Menu({ name, image: result.secure_url });
    await newMenuItem.save();
    res.status(201).json({ success: true, menuItem: newMenuItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Menu Items
export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json({ success: true, menuItems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Menu Item
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        error: "Name is required.",
        success: false,
      });
    }

    // Find the menu item to update
    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found", success: false });
    }

    // If a new image is uploaded, handle Cloudinary upload
    if (req.files && req.files.image) {
      const imageFile = req.files.image;

      // Remove the old image from Cloudinary if it exists
      if (menuItem.image) {
        const publicId = menuItem.image.split("/").pop().split(".")[0];
        await cloudinary.v2.uploader.destroy(`food_images/${publicId}`);
      }

      // Upload new image to Cloudinary
      const result = await cloudinary.v2.uploader.upload(
        imageFile.tempFilePath,
        { folder: "food_images" }
      );

      // Update the image URL
      menuItem.image = result.secure_url;
    }

    // Update the menu item details
    menuItem.name = name;

    await menuItem.save();

    res.status(200).json({
      success: true,
      message: "Menu item updated successfully!",
      menuItem,
    });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ success: false, error: "Failed to update menu item" });
  }
};


// Delete Menu Item
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the menu item by ID and populate the related food items
    const menu = await Menu.findById(id).populate("foods");
    
    if (!menu) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }

    // Delete the menu image from Cloudinary
    if (menu.image) {
      const publicId = menu.image.split("/").pop().split(".")[0]; // Get public ID from the image URL
      await cloudinary.v2.uploader.destroy(`food_images/${publicId}`);
    }

    // Delete related food images and items
    if (menu.foods.length > 0) {
      for (const food of menu.foods) {
        if (food.image) {
          const foodPublicId = food.image.split("/").pop().split(".")[0];
          await cloudinary.v2.uploader.destroy(`food_images/${foodPublicId}`);
        }
      }

      // Delete all related food items from the database
      await Food.deleteMany({ _id: { $in: menu.foods } });
    }

    // Delete the menu item itself
    await Menu.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Menu item and related foods deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

