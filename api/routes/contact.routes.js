import express from "express";
import Contact from "../models/contact.model.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Submit contact form
router.post("/submit", async (req, res) => {
  const { firstName, lastName, email, orderNumber, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ message: "All required fields must be filled" });
  }

  try {
    const contact = new Contact({ firstName, lastName, email, orderNumber, message });
    await contact.save();
    res.status(201).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all contact data (Admin only)
router.get("/", verifyToken, async (req, res) => {
  try {
    // Check if user is an admin
    if (!req.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contact data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
