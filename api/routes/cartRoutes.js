// routes/cartRoutes.js
import express from "express";
import { getCart, addToCart, clearCart, removeFromCart, updateCartItem} from "../controllers/cart.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import User from "../models/user.model.js";

const router = express.Router();

// All cart endpoints require authentication
router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.put("/update", verifyToken, updateCartItem);
router.delete("/remove/:productId", verifyToken, removeFromCart);

router.delete("/clear", verifyToken, clearCart);

export default router;
