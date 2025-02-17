  // import React, { useState } from "react";
  // import { useNavigate } from "react-router-dom";
  // import { 
  //   ShoppingBag, 
  //   Tag, 
  //   Layers, 
  //   Palette, 
  //   Ruler, 
  //   FileText, 
  //   DollarSign, 
  //   Image 
  // } from "lucide-react";
  // import axios from "axios";
  // import { toast, ToastContainer } from 'react-toastify';

  // const CreateNewProduct = () => {
  //   const navigate = useNavigate();
  //   const categories = ["bags", "shoes", "apparel", "accessories"];
  //   const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    
  //   const [productData, setProductData] = useState({
  //     name: "",
  //     category: "",
  //     subcategory: "",
  //     color: [""],
  //     size: [],
  //     description: "",
  //     price: "",
  //     images: [""]
  //   });

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setProductData(prev => ({ ...prev, [name]: value }));
  //   };

  //   const handleColorChange = (index, value) => {
  //     const newColors = [...productData.color];
  //     newColors[index] = value;
  //     setProductData(prev => ({ ...prev, color: newColors }));
  //   };

  //   const addColorField = () => {
  //     if (productData.color.length < 5) {
  //       setProductData(prev => ({ ...prev, color: [...prev.color, ""] }));
  //     }
  //   };

  //   const handleSizeChange = (size) => {
  //     setProductData(prev => ({
  //       ...prev,
  //       size: prev.size.includes(size)
  //         ? prev.size.filter(s => s !== size)
  //         : [...prev.size, size]
  //     }));
  //   };

  //   const handleImageChange = (index, value) => {
  //     const newImages = [...productData.images];
  //     newImages[index] = value;
  //     setProductData(prev => ({ ...prev, images: newImages }));
  //   };

  //   const addImageField = () => {
  //     if (productData.images.length < 5) {
  //       setProductData(prev => ({ ...prev, images: [...prev.images, ""] }));
  //     }
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
      
  //     // Validation
  //     const colors = productData.color.filter(c => c.trim() !== "");
  //     if (colors.length === 0) {
  //       toast.error("At least one color is required");
  //       return;
  //     }

  //     try {
  //       const payload = {
  //         ...productData,
  //         color: colors,
  //         price: parseFloat(productData.price),
  //         images: productData.images.filter(img => img.trim() !== "")
  //       };

  //       axios.post(
  //         "http://localhost:4000/api/products/createProduct",
  //         payload,
  //         { withCredentials: true }
  //       ).then((res) => { 
  //         toast.success("Product created successfully!");
  //         navigate("/admin");
  //       }).catch((err) => {
  //         console.error("Creation error", err);
  //         toast.error(err.response?.data?.message || err.message || "Product creation failed");
  //       });

        
  //     } catch (error) {
  //       toast.error(error.response?.data?.message || error.message || "Product creation failed due to server error ");
  //       console.error("Creation error", error);
  //     }
  //   };

  //   return (
  //     <div className="max-w-2xl mx-auto px-4 py-8">
  //       <ToastContainer />
        
  //       <div className="bg-white rounded-lg shadow-md p-6">
  //         <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>
          
  //         <form onSubmit={handleSubmit} className="space-y-6">
  //           {/* Product Basics */}
  //           <div>
  //             {/* <h2 className="text-lg font-medium mb-4 flex items-center">
  //               <ShoppingBag className="mr-2 text-blue-600" /> Product Basics
  //             </h2> */}
  //             <div className="space-y-4">
  //               <div>
  //                 <div className="flex  gap-2">
  //                   <ShoppingBag className="mr-2 text-blue-600" />
  //                   <label className=" block mb-2">Product Name *</label>
  //                 </div>
  //                 <input

  //                   type="text"
  //                   name="name"
  //                   value={productData.name}
  //                   onChange={handleInputChange}
  //                   className="w-full p-2 border rounded-md"
  //                   required
  //                 />
  //               </div>
                
  //               <div className="grid md:grid-cols-2 gap-4">
  //                 <div>
  //                   <label className="block mb-2">Category *</label>
  //                   <select
  //                     name="category"
  //                     value={productData.category}
  //                     onChange={handleInputChange}
  //                     className="w-full p-2 border rounded-md"
  //                     required
  //                   >
  //                     <option value="">Select Category</option>
  //                     {categories.map(cat => (
  //                       <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
  //                     ))}
  //                   </select>
  //                 </div>
                  
  //                 <div>
  //                   <label className="block mb-2">Subcategory *</label>
  //                   <input
  //                     type="text"
  //                     name="subcategory"
  //                     value={productData.subcategory}
  //                     onChange={handleInputChange}
  //                     className="w-full p-2 border rounded-md"
  //                     required
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Color Selection */}
  //           <div>
  //             <h2 className="text-lg font-medium mb-4 flex items-center">
  //               <Palette className="mr-2 text-blue-600" /> Colors *
  //             </h2>
  //             <div className="space-y-2">
  //               {productData.color.map((color, index) => (
  //                 <div key={index} className="flex items-center gap-2">
  //                   <input
  //                     type="text"
  //                     value={color}
  //                     onChange={(e) => handleColorChange(index, e.target.value)}
  //                     className="w-full p-2 border rounded-md"
  //                     placeholder={`Color #${index + 1}`}
  //                   />
  //                 </div>
  //               ))}
  //               {productData.color.length < 5 && (
  //                 <button
  //                   type="button"
  //                   onClick={addColorField}
  //                   className="text-blue-600 hover:text-blue-700 text-sm"
  //                 >
  //                   + Add another color
  //                 </button>
  //               )}
  //             </div>
  //           </div>

  //           {/* Size Selection */}
  //           <div>
  //             <h2 className="text-lg font-medium mb-4 flex items-center">
  //               <Ruler className="mr-2 text-blue-600" /> Available Sizes
  //             </h2>
  //             <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
  //               {sizes.map(size => (
  //                 <label key={size} className="flex items-center">
  //                   <input
  //                     type="checkbox"
  //                     checked={productData.size.includes(size)}
  //                     onChange={() => handleSizeChange(size)}
  //                     className="mr-2"
  //                   />
  //                   {size}
  //                 </label>
  //               ))}
  //             </div>
  //           </div>

  //           {/* Pricing & Description */}
  //           <div>
  //             <h2 className="text-lg font-medium mb-4 flex items-center">
  //               <DollarSign className="mr-2 text-blue-600" /> Pricing & Description
  //             </h2>
  //             <div className="grid gap-4">
  //               <div>
  //                 <label className="block mb-2">Price *</label>
  //                 <input
  //                   type="number"
  //                   name="price"
  //                   value={productData.price}
  //                   onChange={handleInputChange}
  //                   className="w-full p-2 border rounded-md"
  //                   min="0"
  //                   step="0.01"
  //                   required
  //                 />
  //               </div>
                
  //               <div>
  //                 <label className="block mb-2">Description *</label>
  //                 <textarea
  //                   name="description"
  //                   value={productData.description}
  //                   onChange={handleInputChange}
  //                   className="w-full p-2 border rounded-md"
  //                   rows="4"
  //                   required
  //                 />
  //               </div>
  //             </div>
  //           </div>

  //           {/* Image URLs */}
  //           <div>
  //             <h2 className="text-lg font-medium mb-4 flex items-center">
  //               <Image className="mr-2 text-blue-600" /> Product Images (Max 5)
  //             </h2>
  //             <div className="space-y-2">
  //               {productData.images.map((img, index) => (
  //                 <div key={index} className="flex items-center gap-2">
  //                   <input
  //                     type="url"
  //                     value={img}
  //                     onChange={(e) => handleImageChange(index, e.target.value)}
  //                     className="w-full p-2 border rounded-md"
  //                     placeholder={`Image URL #${index + 1}`}
  //                   />
  //                 </div>
  //               ))}
  //               {productData.images.length < 5 && (
  //                 <button
  //                   type="button"
  //                   onClick={addImageField}
  //                   className="text-blue-600 hover:text-blue-700 text-sm"
  //                 >
  //                   + Add another image URL
  //                 </button>
  //               )}
  //             </div>
  //           </div>

  //           {/* Submit Buttons */}
  //           <div className="flex justify-between mt-6">
  //             <button
  //               type="submit"
  //               className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
  //             >
  //               Create Product
  //             </button>
  //             <button
  //               type="button"
  //               onClick={() => navigate(-1)}
  //               className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
  //             >
  //               Cancel
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // };

  // export default CreateNewProduct;



//   import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { 
//   ShoppingBag, 
//   Tag, 
//   Palette, 
//   Ruler, 
//   DollarSign, 
//   Image 
// } from "lucide-react";
// import axios from "axios";
// import { toast, ToastContainer } from 'react-toastify';

// // Add valid collections array
// const validCollections = [
//   "Seasonal Collections",
//   "Limited Edition Drops",
//   "Designer Collaborations",
//   "Sustainable Luxury"
// ];

// const CreateNewProduct = () => {
//   const navigate = useNavigate();
//   const categories = ["bags", "shoes", "apparel", "accessories"];
//   const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
//   const [productData, setProductData] = useState({
//     name: "",
//     category: "",
//     subcategory: "",
//     collections: [],
//     color: [""],
//     size: [],
//     description: "",
//     price: "",
//     images: [""]
//   });

//   const [availableSubcategories, setAvailableSubcategories] = useState([]);
//   const [newCollection, setNewCollection] = useState({
//     name: "",
//     startDate: null,
//     endDate: null,
//     description: ""
//   });

//   const handleCollectionChange = (field, value) => {
//     setNewCollection(prev => ({ ...prev, [field]: value }));
//   };

//   const addCollection = () => {
//     if (newCollection.name && newCollection.startDate && newCollection.endDate) {
//       setProductData(prev => ({
//         ...prev,
//         collections: [...prev.collections, newCollection]
//       }));
//       setNewCollection({
//         name: "",
//         startDate: null,
//         endDate: null,
//         description: ""
//       });
//     }
//   };

//   const removeCollection = (index) => {
//     setProductData(prev => ({
//       ...prev,
//       collections: prev.collections.filter((_, i) => i !== index)
//     }));
//   };

//   // const handleCategoryChange = async (e) => {
//   //   const category = e.target.value;
//   //   setProductData(prev => ({ ...prev, category, subcategory: "" }));
    
//   //   try {
//   //     const response = await axios.get(`/api/products/subcategories/${category}`);
//   //     setAvailableSubcategories(response.data);
//   //   } catch (error) {
//   //     toast.error("Failed to load subcategories");
//   //   }
//   // };

//   const handleCategoryChange = async (e) => {
//     const category = e.target.value;
//     setProductData(prev => ({ ...prev, category, subcategory: "" }));
    
//     try {
//       const response = await axios.get(`http://localhost:4000/api/products/subcategories/${category}`);
//       console.log("Subcategories fetched:", response.data); // Debug log
//       // Force array format even if undefined/null
//       const subcategories = Array.isArray(response.data) ? response.data : [];
//       setAvailableSubcategories(subcategories);
  
//     } catch (error) {
//       toast.error("Failed to load subcategories", error);
//       setAvailableSubcategories([]); // Reset to empty array
//     }
//   };


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleColorChange = (index, value) => {
//     const newColors = [...productData.color];
//     newColors[index] = value;
//     setProductData(prev => ({ ...prev, color: newColors }));
//   };

//   const addColorField = () => {
//     if (productData.color.length < 5) {
//       setProductData(prev => ({ ...prev, color: [...prev.color, ""] }));
//     }
//   };

//   const handleSizeChange = (size) => {
//     setProductData(prev => ({
//       ...prev,
//       size: prev.size.includes(size)
//         ? prev.size.filter(s => s !== size)
//         : [...prev.size, size]
//     }));
//   };

//   const handleImageChange = (index, file) => {
//     const newImages = [...productData.images];
//     newImages[index] = file;
//     setProductData({ ...productData, images: newImages });
//   };
  

//   const addImageField = () => {
//     if (productData.images.length < 5) {
//       setProductData(prev => ({ ...prev, images: [...prev.images, ""] }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     const colors = productData.color.filter(c => c.trim() !== "");
//     if (colors.length === 0) {
//       toast.error("At least one color is required");
//       return;
//     }

//     try {
//       // Process collections for API payload
//       const processedCollections = productData.collections.map(c => ({
//         ...c,
//         startDate: c.startDate?.toISOString(),
//         endDate: c.endDate?.toISOString()
//       }));

//       const payload = {
//         ...productData,
//         Colors: colors,
//         Sizes: productData.size, // Match schema field name
//         collections: processedCollections,
//         price: parseFloat(productData.price),
//         images: productData.images.filter(img => img.trim() !== "")
//       };
//       // Remove old field names
//     delete payload.color;
//     delete payload.size;

//       axios.post(
//         "http://localhost:4000/api/products/createProduct",
//         payload,
//         { withCredentials: true }
//       ).then((res) => { 
//         toast.success("Product created successfully!");
//         navigate("/admin");
//       }).catch((err) => {
//         console.error("Creation error", err);
//         toast.error(err.response?.data?.message || err.message || "Product creation failed");
//       });

//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message || "Product creation failed due to server error ");
//       console.error("Creation error", error);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-8">
//       <ToastContainer />
      
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Product Basics */}
//           <div>
//             <div className="space-y-4">
//               <div>
//                 <div className="flex gap-2">
//                   <ShoppingBag className="mr-2 text-blue-600" />
//                   <label className="block mb-2">Product Name *</label>
//                 </div>
//                 <input
//                   type="text"
//                   name="name"
//                   value={productData.name}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                   required
//                 />
//               </div>
              
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-2">Category *</label>
//                   <select
//                     name="category"
//                     value={productData.category}
//                     onChange={handleCategoryChange}
//                     className="w-full p-2 border rounded-md"
//                     required
//                   >
//                     {/* <option value="">Select Category</option>
//                     {categories.map(cat => (
//                       <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
//                     ))}
//                   </select> */}
//                   <option value="">Select Category</option>
//           {["bags", "shoes", "apparel", "accessories"].map(cat => (
//             <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
//           ))}
//         </select>
//                 </div>
                
//                 <div>
//                   <label className="block mb-2">Subcategory *</label>
//                   <select
//                     name="subcategory"
//                     value={productData.subcategory}

//   onChange={(e) => setProductData(prev => ({ ...prev, subcategory: e.target.value }))}
//           className="w-full p-2 border rounded-md"
//           required
//           disabled={!productData.category}
//         >
//           <option value="">Select Subcategory</option>
//           {(availableSubcategories || []).map(sub => (
//             <option key={sub} value={sub}>{sub}</option>
//           ))}
//         </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Collections */}
//           <div>
//             <h2 className="text-lg font-medium mb-4 flex items-center">
//               <Tag className="mr-2 text-blue-600" /> Product Collections
//             </h2>
//             <div className="space-y-4">
//               {productData.collections.map((collection, index) => (
//                 <div key={index} className="border p-4 rounded-md">
//                   <div className="flex justify-between mb-2">
//                     <span className="font-medium">{collection.name}</span>
//                     <button
//                       type="button"
//                       onClick={() => removeCollection(index)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                   <p>{collection.description}</p>
//                   <div className="text-sm text-gray-500">
//                     {collection.startDate?.toLocaleDateString()} - 
//                     {collection.endDate?.toLocaleDateString()}
//                   </div>
//                 </div>
//               ))}
              
//               <div className="border p-4 rounded-md space-y-4">
//                 <select
//                   value={newCollection.name}
//                   onChange={(e) => handleCollectionChange('name', e.target.value)}
//                   className="w-full p-2 border rounded-md"
//                 >
//                   <option value="">Select Collection</option>
//                   {validCollections.map(col => (
//                     <option key={col} value={col}>{col}</option>
//                   ))}
//                 </select>

//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block mb-1 text-sm">Start Date</label>
//                     <DatePicker
//                       selected={newCollection.startDate}
//                       onChange={(date) => handleCollectionChange('startDate', date)}
//                       className="w-full p-2 border rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block mb-1 text-sm">End Date</label>
//                     <DatePicker
//                       selected={newCollection.endDate}
//                       onChange={(date) => handleCollectionChange('endDate', date)}
//                       className="w-full p-2 border rounded-md"
//                       minDate={newCollection.startDate}
//                     />
//                   </div>
//                 </div>

//                 <textarea
//                   placeholder="Collection Description"
//                   value={newCollection.description}
//                   onChange={(e) => handleCollectionChange('description', e.target.value)}
//                   className="w-full p-2 border rounded-md"
//                   rows="2"
//                 />

//                 <button
//                   type="button"
//                   onClick={addCollection}
//                   className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200"
//                   disabled={!newCollection.name}
//                 >
//                   Add Collection
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Color Selection */}
//           <div>
//             <h2 className="text-lg font-medium mb-4 flex items-center">
//               <Palette className="mr-2 text-blue-600" /> Colors *
//             </h2>
//             <div className="space-y-2">
//               {productData.color.map((color, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <input
//                     type="text"
//                     value={color}
//                     onChange={(e) => handleColorChange(index, e.target.value)}
//                     className="w-full p-2 border rounded-md"
//                     placeholder={`Color #${index + 1}`}
//                   />
//                 </div>
//               ))}
//               {productData.color.length < 5 && (
//                 <button
//                   type="button"
//                   onClick={addColorField}
//                   className="text-blue-600 hover:text-blue-700 text-sm"
//                 >
//                   + Add another color
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Size Selection */}
//           <div>
//             <h2 className="text-lg font-medium mb-4 flex items-center">
//               <Ruler className="mr-2 text-blue-600" /> Available Sizes
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//               {sizes.map(size => (
//                 <label key={size} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={productData.size.includes(size)}
//                     onChange={() => handleSizeChange(size)}
//                     className="mr-2"
//                   />
//                   {size}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Pricing & Description */}
//           <div>
//             <h2 className="text-lg font-medium mb-4 flex items-center">
//               <DollarSign className="mr-2 text-blue-600" /> Pricing & Description
//             </h2>
//             <div className="grid gap-4">
//               <div>
//                 <label className="block mb-2">Price *</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={productData.price}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                   min="0"
//                   step="0.01"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block mb-2">Description *</label>
//                 <textarea
//                   name="description"
//                   value={productData.description}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                   rows="4"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Image URLs */}
//           <div>
//   <h2 className="text-lg font-medium mb-4 flex items-center">
//     <Image className="mr-2 text-blue-600" /> Product Images (Max 5)
//   </h2>
//   <div className="space-y-2">
//     {productData.images.map((img, index) => (
//       <div key={index} className="flex items-center gap-2">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => handleImageChange(index, e.target.files[0])}
//           className="w-full p-2 border rounded-md"
//         />
//         {img && (
//           <img
//             src={URL.createObjectURL(img)}
//             alt={`Preview ${index + 1}`}
//             className="w-16 h-16 object-cover"
//           />
//         )}
//       </div>
//     ))}
//     {productData.images.length < 5 && (
//       <button
//         type="button"
//         onClick={addImageField}
//         className="text-blue-600 hover:text-blue-700 text-sm"
//       >
//         + Add another image
//       </button>
//     )}
//   </div>
// </div>


//           {/* Submit Buttons */}
//           <div className="flex justify-between mt-6">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
//             >
//               Create Product
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateNewProduct;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
  ShoppingBag, 
  Tag, 
  Palette, 
  Ruler, 
  DollarSign, 
  Image 
} from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import apiRequest from "../lib/apiRequest";

// Add valid collections array
const validCollections = [
  "Seasonal Collections",
  "Limited Edition Drops",
  "Designer Collaborations",
  "Sustainable Luxury"
];

const CreateNewProduct = () => {
  const navigate = useNavigate();
  const categories = ["bags", "shoes", "apparel", "accessories"];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    subcategory: "",
    collections: [],
    color: [""],
    size: [],
    description: "",
    price: "",
    images: [""]
  });

  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [newCollection, setNewCollection] = useState({
    name: "",
    startDate: null,
    endDate: null,
    description: ""
  });

  const handleCollectionChange = (field, value) => {
    setNewCollection(prev => ({ ...prev, [field]: value }));
  };

  const addCollection = () => {
    if (newCollection.name && newCollection.startDate && newCollection.endDate) {
      setProductData(prev => ({
        ...prev,
        collections: [...prev.collections, newCollection]
      }));
      setNewCollection({
        name: "",
        startDate: null,
        endDate: null,
        description: ""
      });
    }
  };

  const removeCollection = (index) => {
    setProductData(prev => ({
      ...prev,
      collections: prev.collections.filter((_, i) => i !== index)
    }));
  };

  // const handleCategoryChange = async (e) => {
  //   const category = e.target.value;
  //   setProductData(prev => ({ ...prev, category, subcategory: "" }));
    
  //   try {
  //     const response = await axios.get(`/api/products/subcategories/${category}`);
  //     setAvailableSubcategories(response.data);
  //   } catch (error) {
  //     toast.error("Failed to load subcategories");
  //   }
  // };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setProductData(prev => ({ ...prev, category, subcategory: "" }));
    
    try {
      const response = await apiRequest.get(`/products/subcategories/${category}`);
      console.log("Subcategories fetched:", response.data); // Debug log
      // Force array format even if undefined/null
      const subcategories = Array.isArray(response.data) ? response.data : [];
      setAvailableSubcategories(subcategories);
  
    } catch (error) {
      toast.error("Failed to load subcategories", error);
      setAvailableSubcategories([]); // Reset to empty array
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (index, value) => {
    const newColors = [...productData.color];
    newColors[index] = value;
    setProductData(prev => ({ ...prev, color: newColors }));
  };

  const addColorField = () => {
    if (productData.color.length < 5) {
      setProductData(prev => ({ ...prev, color: [...prev.color, ""] }));
    }
  };

  const handleSizeChange = (size) => {
    setProductData(prev => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter(s => s !== size)
        : [...prev.size, size]
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...productData.images];
    newImages[index] = value;
    setProductData(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    if (productData.images.length < 5) {
      setProductData(prev => ({ ...prev, images: [...prev.images, ""] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const colors = productData.color.filter(c => c.trim() !== "");
    if (colors.length === 0) {
      toast.error("At least one color is required");
      return;
    }


 // Validate at least one image URL
 const validImages = productData.images.filter(img => img.trim() !== "");
 if (validImages.length === 0) {
   toast.error("Please provide at least one image URL");
   return;
 }



    try {
      // Process collections for API payload
      const processedCollections = productData.collections.map(c => ({
        ...c,
        startDate: c.startDate?.toISOString(),
        endDate: c.endDate?.toISOString()
      }));

      const payload = {
        ...productData,
        Colors: colors,
        Sizes: productData.size, // Match schema field name
        collections: processedCollections,
        price: parseFloat(productData.price),
        images: validImages
      };
      // Remove old field names
    delete payload.color;
    delete payload.size;

    apiRequest.post(
        "/products/createProduct",
        payload
      ).then((res) => { 
        toast.success("Product created successfully!");
        navigate("/admin");
      }).catch((err) => {
        console.error("Creation error", err);
        toast.error(err.response?.data?.message || err.message || "Product creation failed");
      });

    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Product creation failed due to server error ");
      console.error("Creation error", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <ToastContainer />
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Basics */}
          <div>
            <div className="space-y-4">
              <div>
                <div className="flex gap-2">
                  <ShoppingBag className="mr-2 text-blue-600" />
                  <label className="block mb-2">Product Name *</label>
                </div>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Category *</label>
                  <select
                    name="category"
                    value={productData.category}
                    onChange={handleCategoryChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >

                  <option value="">Select Category</option>
          {["bags", "shoes", "apparel", "accessories"].map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
                </div>
                
                <div>
                  <label className="block mb-2">Subcategory *</label>
                  <select
                    name="subcategory"
                    value={productData.subcategory}

  onChange={(e) => setProductData(prev => ({ ...prev, subcategory: e.target.value }))}
          className="w-full p-2 border rounded-md"
          required
          disabled={!productData.category}
        >
          <option value="">Select Subcategory</option>
          {(availableSubcategories || []).map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
                </div>
              </div>
            </div>
          </div>

          {/* Product Collections */}
          <div>
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <Tag className="mr-2 text-blue-600" /> Product Collections
            </h2>
            <div className="space-y-4">
              {productData.collections.map((collection, index) => (
                <div key={index} className="border p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{collection.name}</span>
                    <button
                      type="button"
                      onClick={() => removeCollection(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <p>{collection.description}</p>
                  <div className="text-sm text-gray-500">
                    {collection.startDate?.toLocaleDateString()} - 
                    {collection.endDate?.toLocaleDateString()}
                  </div>
                </div>
              ))}
              
              <div className="border p-4 rounded-md space-y-4">
                <select
                  value={newCollection.name}
                  onChange={(e) => handleCollectionChange('name', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Collection</option>
                  {validCollections.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm">Start Date</label>
                    <DatePicker
                      selected={newCollection.startDate}
                      onChange={(date) => handleCollectionChange('startDate', date)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">End Date</label>
                    <DatePicker
                      selected={newCollection.endDate}
                      onChange={(date) => handleCollectionChange('endDate', date)}
                      className="w-full p-2 border rounded-md"
                      minDate={newCollection.startDate}
                    />
                  </div>
                </div>

                <textarea
                  placeholder="Collection Description"
                  value={newCollection.description}
                  onChange={(e) => handleCollectionChange('description', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows="2"
                />

                <button
                  type="button"
                  onClick={addCollection}
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200"
                  disabled={!newCollection.name}
                >
                  Add Collection
                </button>
              </div>
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <Palette className="mr-2 text-blue-600" /> Colors *
            </h2>
            <div className="space-y-2">
              {productData.color.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder={`Color #${index + 1}`}
                  />
                </div>
              ))}
              {productData.color.length < 5 && (
                <button
                  type="button"
                  onClick={addColorField}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  + Add another color
                </button>
              )}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <Ruler className="mr-2 text-blue-600" /> Available Sizes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {sizes.map(size => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={productData.size.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="mr-2"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          {/* Pricing & Description */}
          <div>
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <DollarSign className="mr-2 text-blue-600" /> Pricing & Description
            </h2>
            <div className="grid gap-4">
              <div>
                <label className="block mb-2">Price *</label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2">Description *</label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  rows="4"
                  required
                />
              </div>
            </div>
          </div>

          {/* Image URLs */}
          <div>
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <Image className="mr-2 text-blue-600" /> Product Images (Max 5)
            </h2>
            <div className="space-y-2">
              {productData.images.map((img, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="url"
                    value={img}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder={`Image URL #${index + 1}`}
                  />
                </div>
              ))}
              {productData.images.length < 5 && (
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  + Add another image URL
                </button>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Create Product
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewProduct;