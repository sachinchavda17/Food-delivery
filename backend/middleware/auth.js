import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, error: "Not Authorized Login Again!" });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.error("Error Auth Middleware", error);
    res.status(500).json({ error: "Failed to Auth Middleware", success: false });
  }
};

export default authMiddleware;
