// routes/product.routes.js
import express from "express";
import { 
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getGroupedCollections ,
  getSubcategories,
  getRelatedProducts
} from "../controllers/product.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { admin } from "../middleware/admin.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();
router.get("/grouped-collections", getGroupedCollections);
router.get("/subcategories/:category", getSubcategories);
router.get("/allproducts", getProducts);
router.get('/related', getRelatedProducts);

// ID-based routes LAST
router.get("/:id", getProductById);
router.delete("/:id", verifyToken, admin, deleteProduct);
router.put("/:id", verifyToken, admin, updateProduct);

// temporary block
// router.post("/createproduct", verifyToken, admin, upload.array("images", 6) , createProduct);

router.post("/createproduct", verifyToken, admin, createProduct);

export default router;
