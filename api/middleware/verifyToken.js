import jwt from "jsonwebtoken";
  
  export const verifyToken = (req, res, next) => {
    // console.log("Cookies received:", req.cookies); // Log cookies

    const authHeader = req.headers.authorization || req.header("Authorization");
    console.log("Received Authorization Header:", authHeader); // Debug log
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid authorization format" });
    }
    const token = authHeader.split(" ")[1];
    console.log("Extracted token:", token); // Log extracted token
  
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded); // Log decoded token
      req.userId = decoded.userId;
      req.isAdmin = decoded.isAdmin; // Add this line
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  };