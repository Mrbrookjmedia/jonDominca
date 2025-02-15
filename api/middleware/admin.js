// middleware/admin.js
import User from "../models/user.model.js";

export const admin = async (req, res, next) => {
  try {
    // req.userId should have been set by verifyToken middleware
    const user = await User.findById(req.userId);
    if (user && user.isAdmin) {
      // User is admin; proceed to the next middleware/controller.
      return next();
    } else {
      return res.status(403).json({ message: "Admin access required" });
    }
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({ message: "Error verifying admin status" });
  }
};

// middleware/admin.js
// import User from "../models/user.model.js";

// export const admin = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId);
    
//     if (!user) {
//       return res.status(401).json({ 
//         message: "Authentication required",
//         solution: "Please login with admin credentials"
//       });
//     }

//     if (!user.isAdmin) {
//       return res.status(403).json({
//         message: "Admin access required",
//         requiredPermissions: ["manage_products", "view_users"],
//         yourRole: "user"
//       });
//     }

//     // Add admin info to request
//     req.admin = {
//       id: user._id,
//       email: user.email
//     };
    
//     next();
//   } catch (error) {
//     console.error("Admin verification error:", error);
//     res.status(500).json({
//       message: "Server error during admin verification",
//       errorCode: "ADMIN_VERIFICATION_FAILURE"
//     });
//   }
// };

