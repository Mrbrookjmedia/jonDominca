// routes/user.routes.js
import express from "express";
import { getUsers, deleteUser } from "../controllers/user.controller.js";
import { getUserOrders, getUserData } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.get("/orders",verifyToken, getUserOrders);
router.get("/me", verifyToken, getUserData);
export default router;
