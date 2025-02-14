// // models/collection.model.js
// const collectionSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       enum: [
//         "Seasonal Collections",
//         "Limited Edition Drops",
//         "Designer Collaborations",
//         "Sustainable Luxury"
//       ],
//       required: true
//     },
//     products: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product"
//     }],
//     startDate: Date,
//     endDate: Date,
//     description: String
//   });
  
//   const Collection = mongoose.model("Collection", collectionSchema);
//   export default Collection;
  