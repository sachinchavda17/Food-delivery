import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import User from "../models/UserModel.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, error: "All fields are mandadory" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, error: "User Doesn't Exists!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, error: "Invalid Credentials!" });
    }
    const token = createToken(user._id);
    // Set the token in an HTTP-only, Secure, and SameSite cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
    });

    res.status(201).json({
      success: true,
      token,
      user,
      message: "User successfully created",
    });
  } catch (error) {
    console.error("Error registering user :", error);
    res.status(500).json({ error: "Failed to register user", success: false });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const registerController = async (req, res) => {
  try {
    const { email, name, password, confirmPassword } = req.body;
    if (!email || !name || !password || !confirmPassword) {
      return res.json({ success: false, error: "All fields are mandadory" });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ success: false, error: "User Already Exists!" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        error: "Please enter a valid email!",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        error: "Please enter a strong password",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    // Set the token in an HTTP-only, Secure, and SameSite cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
    });

    res.status(201).json({
      success: true,
      token,
      user,
      message: "User successfully created",
    });
  } catch (error) {
    console.error("Error registering user :", error);
    res.status(500).json({ error: "Failed to register user", success: false });
  }
};

export const userProfileController = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).populate("orders").exec();
    if (!user) {
      res.status(500).json({
        error: "User doesn't exixts please enter valid user id",
        success: false,
      });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error getting user data :", error);
    res.status(500).json({ error: "Failed to get user data", success: false });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      street,
      city,
      postalCode,
      country,
      phone,
      userId,
    } = req.body; // Extract data from the request body
    console.log(req.body);

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update user details
    if (name) user.name = name;
    if (email) user.email = email;

    // Check if password is provided and hash it before saving
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Add new address to the addresses array if provided
    if (street && city && postalCode && country) {
      const newAddress = {
        street,
        city,
        postalCode,
        country,
      };

      user.addresses.push(newAddress); // Add new address to the array
    }

    // Update phone number
    if (phone) user.phone = phone;

    // Save the updated user details
    const updatedUser = await user.save();
    console.log(updatedUser);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error listing food:", error);
    res.status(500).json({ error: "Failed to listing food", success: false });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json({ success: true, message: "User Removed" });
  } catch (error) {
    console.error("Error user removing:", error);
    res.status(500).json({ error: "Failed to user removing", success: false });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body; // Extract data from the request body
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update user details
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    // Save the updated user details
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
