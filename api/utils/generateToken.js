import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, //to prevent XSS attacks
    // sameSite: "Strict",
    // secure: process.env.NODE_ENV === "production",
    // sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
    // domain: process.env.NODE_ENV === "production" ? ".onrender.com" : "localhost",
    secure: true, // Must be true for HTTPS
    sameSite: "None", // Required for cross-origin cookies
    domain: "localhost",

    maxAge: 15 * 24 * 60 * 60 * 1000, //MS
  });
};

export default generateTokenAndSetCookie;
