import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { admin } from "../middleware/admin.js";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} from "../controllers/order.controller.js";

const router = express.Router();

// Order routes
router.get("/user", verifyToken, getUserOrders);      // Get user's orders
router.post("/", verifyToken,createOrder);           // Create new order
router.get("/all", verifyToken, admin, getAllOrders); // Get all orders (admin only)
router.put("/:orderId/status", verifyToken, admin, updateOrderStatus); // Update order status (admin only)

export default router;
