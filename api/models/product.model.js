// // // models/product.model.js
// // import mongoose from "mongoose";

// // const productSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   price: { type: Number, required: true },
// //   description: { type: String, required: true },
// //   image: { type: String, required: true },
// //   category: { type: String, required: true },
// //   subcategory: { type: String },
// //   colors: [String],
// //   sizes: [String],
// //   images: [String],
// //   stock: { type: Number, default: 0 },
// //   isActive: { type: Boolean, default: true }
// // }, { timestamps: true });

// // export default mongoose.model("Product", productSchema);



// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     // category: {
//     //   type: String,
//     //   enum: ["bags", "shoes", "apparel", "accessories"],
//     //   required: true,
//     // },

//     // subcategory: {
//     //   type: String,
//     // },

//     category: {
//       type: String,
//       enum: ["bags", "shoes", "apparel", "accessories"],
//       required: true
//     },
//     subcategory: {
//       type: String,
//       required: true,
//       validate: {
//         validator: function(v) {
//           const validSubcategories = {
//             bags: ["Handbags", "Totes", "Crossbody Bags", "Clutches"],
//             shoes: ["Heels", "Flats", "Boots", "Sneakers"],
//             apparel: ["Dresses", "Tops", "Bottoms", "Outerwear"],
//             accessories: ["Jewelry", "Scarves", "Sunglasses", "Hats"]
//           };
//           return validSubcategories[this.category].includes(v);
//         }
//       }
//     },
//     collections: [{
//       type: String,
//       enum: [
//         "Seasonal Collections",
//         "Limited Edition Drops", 
//         "Designer Collaborations",
//         "Sustainable Luxury"
//       ]
//     }],






    

//     // category: {
//     //   type: mongoose.Schema.Types.ObjectId,
//     //   ref: "Category",
//     //   required: true
//     // },
//     // subcategory: {
//     //   type: mongoose.Schema.Types.ObjectId,
//     //   ref: "Subcategory",
//     //   required: true
//     // },
//     // collections: [{
//     //   type: mongoose.Schema.Types.ObjectId,
//     //   ref: "Collection"
//     // }],


//     Colors: {
//       type: [String],
//     },
//     Sizes: {
//       type: [String],
//     },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },


//     images: {
//       type: [String],
//       validate: {
//         validator: (v) => v.length <= 5,
//         message: "Maximum five images allowed",
//       },
//     },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);
// export default Product;



import mongoose from "mongoose";

const validSubcategories = {
  bags: ["Handbags", "Totes", "Crossbody Bags", "Clutches"],
  shoes: ["Heels", "Flats", "Boots", "Sneakers"],
  apparel: ["Dresses", "Tops", "Bottoms", "Outerwear"],
  accessories: ["Jewelry", "Scarves", "Sunglasses", "Hats"]
};


const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["bags", "shoes", "apparel", "accessories"],
      required: true
    },
    subcategory: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return validSubcategories[this.category].includes(v);
        },
        message: props => `Invalid subcategory for ${props.value} in ${this.category} category`
      }
    },
    collections: {
      type: [{
        name: {
          type: String,
          enum: [
            "Seasonal Collections",
            "Limited Edition Drops",
            "Designer Collaborations",
            "Sustainable Luxury"
          ]
        },
        startDate: Date,
        endDate: Date,
        description: String
      }],
      default: []
    },
    Colors:{ type: [String], default: [] },
    Sizes: [String],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: {
      type: [String],
      validate: {
        validator: v => v.length <= 5,
        message: "Maximum five images allowed",
      },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
