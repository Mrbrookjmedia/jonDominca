import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export const getWishlist = async (req, res) => {
try {
  const user = await User.findById(req.userId)
    .populate({
      path: 'wishlistItems.product',
      match: { deleted: { $ne: true } } // Filter out deleted products
    });
    
  const validWishlist = user.wishlistItems.filter(item => item.product !== null);
  res.json(validWishlist);
} catch (error) {
  res.status(500).json({ message: "Server error" });
}
}

export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $addToSet: { wishlistItems: { product: req.body.productId } } }, // Fix: wishlistItems
      { new: true }
    ).populate('wishlistItems.product');
    
    res.status(200).json(user.wishlistItems);
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist" });
  }
};


export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { wishlistItems: { product: req.params.productId } } }, // Fix: wishlistItems
      { new: true }
    ).populate('wishlistItems.product');
    
    res.status(200).json(user.wishlistItems);
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist" });
  }
};