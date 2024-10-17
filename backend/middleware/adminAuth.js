import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const adminAuth = async (req, res, next) => {
  try {
    // Check for the token in the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized. Login Again!" });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    // Verify the token and decode user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID and exclude the password from the result
    req.user = await User.findById(decoded.id).select("-password");

    // Check if user exists
    if (!req.user) {
      return res.status(401).json({ success: false, error: "User not found" });
    }

    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, error: "Access denied. Admins only." });
    }

    // Proceed to the next middleware or route handler if user is an admin
    next();
  } catch (error) {
    // Handle invalid token or any other errors
    res.status(401).json({ success: false, error: "Invalid token" });
  }
};

export default adminAuth;
