import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export const getWishlist = async (req, res) => {
//   try {
//     console.log("Fetching wishlist for user ID:", req.userId); // Debug log

//     const user = await User.findById(req.userId)
//       .populate('wishlist.product')
//       .select('wishlist');

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user.wishlist);
//   } catch (error) {
//     console.error("Error fetching wishlist:", error); // Debug log
//     res.status(500).json({ message: "Error fetching wishlist" });
//   }
// };
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


// export const addToWishlist = async (req, res) => {
//   try {
//     const { productId } = req.body;
    
//     // Check if product exists
//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     // Update user wishlist
//     const user = await User.findByIdAndUpdate(
//       req.userId,
//       { $addToSet: { wishlist: { product: productId } } }, // Prevent duplicates
//       { new: true }
//     ).populate('wishlist.product');

//     res.status(200).json(user.wishlist);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding to wishlist" });
//   }
// };
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

// export const removeFromWishlist = async (req, res) => {
//   try {
//     const { productId } = req.params;
    
//     const user = await User.findByIdAndUpdate(
//       req.userId,
//       { $pull: { wishlist: { product: productId } } },
//       { new: true }
//     ).populate('wishlist.product');

//     res.status(200).json(user.wishlist);
//   } catch (error) {
//     res.status(500).json({ message: "Error removing from wishlist" });
//   }
// };

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