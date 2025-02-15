import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
   httpOnly: true,
  secure: true, // REQUIRED for HTTPS
  sameSite: 'None', // REQUIRED for cross-domain cookies
  domain: '.onrender.com', // Must include leading dot
    maxAge: 15 * 24 * 60 * 60 * 1000, //MS
  });
};

export default generateTokenAndSetCookie;
