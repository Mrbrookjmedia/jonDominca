import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import path from "path";

export const generateTokenAndSetCookie = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { 
    expiresIn: "15d" 
  });
};

