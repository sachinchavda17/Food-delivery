import Menu from "../models/Menu.js";
import cloudinary from "../config/cloudinaryConfig.js";

// Create Menu Item
export const createMenuItem = async (req, res) => {
  try {
    console.log("calling");
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    console.log('Request body:', req.body);
    console.log('Uploaded files:', req.files);
    

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imageFile = req.files.image;
    console.log(imageFile);

    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(imageFile.tempFilePath, {
      folder: "food_images",
    });

    const newMenuItem = new Menu({ name, image: result.secure_url });
    await newMenuItem.save();
    console.log("menu saved");
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
    const { name, image } = req.body;
    const updatedMenuItem = await Menu.findByIdAndUpdate(
      id,
      { name, image },
      { new: true }
    );
    res.status(200).json({ success: true, menuItem: updatedMenuItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Menu Item
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Menu.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Menu item deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
