import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

// Import routes
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/order.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToDatabase from "./db/connectTodatabase.js";

const __dirname = path.resolve();

// Middleware
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(cors({
  // origin: "http://localhost:5173",
origin: "https://jond.netlify.app",
  // origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization","Cache-Control"],
  credentials: true 
}));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);        // Order routes
app.use("/api/users", userRoutes);          // Single instance of user routes
app.use("/api/user/wishlist", wishlistRoutes);

// Serve static files in production
app.use(express.static(path.join(__dirname, "/client/dist")));

// Catch-all route for React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Start server

const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
app.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server started on port ${PORT}`);
});

export default app;
