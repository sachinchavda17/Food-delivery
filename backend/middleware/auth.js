import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // Check for the token in the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, error: "Not Authorized. Login Again!" });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    console.error("Error in Auth Middleware", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid token. Please log in again." });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ success: false, error: "Token expired. Please log in again." });
    }
    res
      .status(500)
      .json({ success: false, error: "Failed to authenticate user" });
  }

  // console.error("Error in Auth Middleware", error);
  // res.status(500).json({ success: false, error: "Failed to authenticate user" });
};

export default authMiddleware;
