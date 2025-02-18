import express from "express";
import Newsletter from "../models/newsletter.model.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Subscribe to newsletter
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ message: "Email is already subscribed" });
    }

    const subscription = new Newsletter({ email });
    await subscription.save();

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all subscribed emails (Admin only)
router.get("/", async (req, res) => {
  try {
    const subscriptions = await Newsletter.find().sort({ subscribedAt: -1 });
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
