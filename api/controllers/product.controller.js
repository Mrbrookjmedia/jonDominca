
  import Product from "../models/product.model.js";
  import User from "../models/user.model.js";

  // Validation constants
  const validSubcategories = {
    bags: ["Handbags", "Totes", "Crossbody Bags", "Clutches"],
    shoes: ["Heels", "Flats", "Boots", "Sneakers"],
    apparel: ["Dresses", "Tops", "Bottoms", "Outerwear"],
    accessories: ["Jewelry", "Scarves", "Sunglasses", "Hats"]
  };

  const validCollections = [
    "Seasonal Collections",
    "Limited Edition Drops",
    "Designer Collaborations",
    "Sustainable Luxury"
  ];

  // Create a new product (Admin only)
  // export const createProduct = async (req, res) => {
  //   try {
  //     // Authorization check
  //     const user = await User.findById(req.userId);
  //     if (!user?.isAdmin) return res.status(403).json({ message: "Unauthorized" });

  //   const { name, category, subcategory, description, price, Colors, Sizes, collections } = req.body;

  //   if (!req.files || req.files.length === 0) {
  //     return res.status(400).json({ message: "Please upload at least one image" });
  //   }

  //   // Upload images to Cloudinary
  //   const images= await uploadImagesToCloudinary(req.files);

  //     // Validate subcategory
  //     if (!validSubcategories[category]?.includes(subcategory)) {
  //       return res.status(400).json({ 
  //         message: `Invalid subcategory '${subcategory}' for ${category} category`
  //       });
  //     }

  //     // Validate collections if provided
  //     if (collections && collections.length > 0) {
  //       for (const collection of collections) {
  //         if (!validCollections.includes(collection.name)) {
  //           return res.status(400).json({ 
  //             message: `Invalid collection name: ${collection.name}`
  //           });
  //         }

  //         if (collection.endDate && collection.startDate && 
  //             new Date(collection.endDate) <= new Date(collection.startDate)) {
  //           return res.status(400).json({ 
  //             message: "End date must be after start date"
  //           });
  //         }
  //       }
  //     }

  //     const product = new Product({
  //       name,
  //       category,
  //       subcategory,
  //       description,
  //       price,
  //       images,
  //       Colors,
  //       Sizes,
  //       collections: collections || []
  //     });

  //     await product.save();
  //     res.status(201).json({ message: "Product created successfully", product });

  //   } catch (error) {
  //     console.error("Error creating product:", error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // };


// above temporary comment out

export const createProduct = async (req, res) => {
  try {
    // Authorization check
    const user = await User.findById(req.userId);
    if (!user?.isAdmin) return res.status(403).json({ message: "Unauthorized" });

    const { name, category, subcategory, description, price, images, Colors, Sizes, collections } = req.body;

    // Validate subcategory
    if (!validSubcategories[category]?.includes(subcategory)) {
      return res.status(400).json({ 
        message: `Invalid subcategory '${subcategory}' for ${category} category`
      });
    }

    // Validate collections if provided
    if (collections && collections.length > 0) {
      for (const collection of collections) {
        if (!validCollections.includes(collection.name)) {
          return res.status(400).json({ 
            message: `Invalid collection name: ${collection.name}`
          });
        }

        if (collection.endDate && collection.startDate && 
            new Date(collection.endDate) <= new Date(collection.startDate)) {
          return res.status(400).json({ 
            message: "End date must be after start date"
          });
        }
      }
    }

    const product = new Product({
      name,
      category,
      subcategory,
      description,
      price,
      images,
      Colors,
      Sizes,
      collections: collections || []
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};







  // Get all products
  export const getProducts = async (req, res) => {
    try {
      const products = await Product.find({}).sort({ createdAt: -1 });
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Get single product by ID
  export const getProductById = async (req, res) => {
    try {


    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const { category, currentProductId, limit = 1  } = req.query;

    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const relatedProducts = await Product.find({
      category: category,
      _id: { $ne: currentProductId } // Exclude the current product
    })
    .limit(parseInt(limit))
    .select('name price images') // Select only necessary fields
    .lean(); // Use lean for better performance

    res.json(relatedProducts);
  } catch (error) {
    console.error('Error fetching related products:', error);
    res.status(500).json({ message: 'Error fetching related products' });
  }
};

  // In product.controller.js (for getProductById)
  // export const getProductById = async (req, res) => {
  //   try {
  //     // Add ObjectID validation
  //     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //       return res.status(400).json({ message: "Invalid product ID format" });
  //     }

  //     const product = await Product.findById(req.params.id);
      
  //     if (!product) {
  //       return res.status(404).json({ message: "Product not found" });
  //     }

  //     res.json(product);
  //   } catch (error) {
  //     console.error("Error fetching product:", error);
  //     res.status(500).json({ message: "Server error" });
  //   }
  // };






  // Delete product
  export const deleteProduct = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user?.isAdmin) return res.status(403).json({ message: "Unauthorized" });

      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Update product
  export const updateProduct = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user?.isAdmin) return res.status(403).json({ message: "Unauthorized" });

      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      const updates = req.body;

      // Validate category/subcategory if changed
      if (updates.category || updates.subcategory) {
        const newCategory = updates.category || product.category;
        const newSubcategory = updates.subcategory || product.subcategory;

        if (!validSubcategories[newCategory]?.includes(newSubcategory)) {
          return res.status(400).json({ 
            message: `Invalid subcategory '${newSubcategory}' for ${newCategory} category`
          });
        }
      }

      // Validate collections if provided
      if (updates.collections) {
        for (const collection of updates.collections) {
          if (!validCollections.includes(collection.name)) {
            return res.status(400).json({ 
              message: `Invalid collection name: ${collection.name}`
            });
          }

          if (collection.endDate && collection.startDate && 
              new Date(collection.endDate) <= new Date(collection.startDate)) {
            return res.status(400).json({ 
              message: "End date must be after start date"
            });
          }
        }
      }

      // Update product
      Object.keys(updates).forEach(key => {
        product[key] = updates[key];
      });

      const updatedProduct = await product.save();
      res.status(200).json({ 
        message: "Product updated successfully",
        product: updatedProduct
      });

    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Get products grouped by collections
  // export const getGroupedCollections = async (req, res) => {
  //   try {
  //     const products = await Product.find({});
      
  //     const grouped = {
  //       'Seasonal Collections': [],
  //       'Limited Edition Drops': [],
  //       'Designer Collaborations': [],
  //       'Sustainable Luxury': []
  //     };

  //     products.forEach(product => {
  //       product.collections.forEach(collection => {
  //         if (grouped[collection.name]) {
  //           grouped[collection.name].push({
  //             _id: product._id,
  //             name: product.name,
  //             price: product.price,
  //             images: product.images,
  //             isNew: new Date() - product.createdAt < 604800000 // 7 days
  //           });
  //         }
  //       });
  //     });

  //     res.status(200).json(grouped);
  //   } catch (error) {
  //     res.status(500).json({ message: "Server error" });
  //   }
  // };

  // In product.controller.js
  export const getGroupedCollections = async (req, res) => {
    const validCollections = [
      "Seasonal Collections",
      "Limited Edition Drops",
      "Designer Collaborations",
      "Sustainable Luxury"
    ];

    try {
      const products = await Product.find({});
      
      const grouped = validCollections.reduce((acc, col) => {
        acc[col] = [];
        return acc;
      }, {});

      products.forEach(product => {
        product.collections?.forEach(collection => {
          if (validCollections.includes(collection.name)) {
            grouped[collection.name].push({
              _id: product._id,
              name: product.name,
              price: product.price,
              Colors: product.Colors || [], // Include Colors
              Sizes: product.Sizes || [], // Include Colors
    description: product.description, // Include description
              images: product.images,
              isNew: Date.now() - product.createdAt < 604800000 // 7 days
            });
          }
        });
      });

      res.status(200).json(grouped);
    } catch (error) {
      console.error("Grouping error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };



  // Add this new controller function
  // export const getSubcategories = async (req, res) => {
  //   const validSubcategories = {
  //     bags: ["Handbags", "Totes", "Crossbody Bags", "Clutches"],
  //     shoes: ["Heels", "Flats", "Boots", "Sneakers"],
  //     apparel: ["Dresses", "Tops", "Bottoms", "Outerwear"],
  //     accessories: ["Jewelry", "Scarves", "Sunglasses", "Hats"]
  //   };

  //   try {
  //     const category = req.params.category.toLowerCase(); // Ensure lowercase
  //     const subcategories = validSubcategories[category] || [];
  //     res.status(200).json(subcategories);
  //   } catch (error) {
  //     res.status(500).json([]);
  //   }
  // };

  // export const getSubcategories = async (req, res) => {
  //   const { category } = req.params;
  //   try {
  //     const subcategories = await SubcategoryModel.find({ category }); // Adjust this line based on your database schema
  //     res.status(200).json(subcategories);
  //   } catch (error) {
  //     res.status(500).json({ message: "Failed to fetch subcategories" });
  //   }
  // };
  // In product.controller.js
  export const getSubcategories = (req, res) => {
    const validSubcategories = {
      bags: ["Handbags", "Totes", "Crossbody Bags", "Clutches"],
      shoes: ["Heels", "Flats", "Boots", "Sneakers"],
      apparel: ["Dresses", "Tops", "Bottoms", "Outerwear"],
      accessories: ["Jewelry", "Scarves", "Sunglasses", "Hats"]
    };

    try {
      const category = req.params.category.toLowerCase();
      const subcategories = validSubcategories[category] || [];
      
      // Add cache-control headers to prevent 304 responses
      res.setHeader('Cache-Control', 'no-store, max-age=0');
      res.status(200).json(subcategories);
    } catch (error) {
      res.status(500).json([]);
    }
  };
