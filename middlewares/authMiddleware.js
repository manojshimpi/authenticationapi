import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.header("Authorization"); // Get token from headers

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const tokenValue = token.split(" ")[1]; // Extract token after "Bearer "
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select("-password"); // Exclude sensitive fields
    
    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }

    next(); // Proceed to the next middleware

  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};
