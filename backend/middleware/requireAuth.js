import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Attach user to the request

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};


export default requireAuth