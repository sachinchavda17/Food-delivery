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
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res
      .status(201)
      .json({
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
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res
      .status(201)
      .json({
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
    const user = await User.findById(userId);
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
