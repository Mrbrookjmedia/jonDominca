// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Filter from "../components/Filter";
// import SearchBar from "../components/SearchBar";
// import apiRequest from "../lib/apiRequest";

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [filters, setFilters] = useState({ 
//     price: 500, 
//     color: "", 
//     category: "", 
//     size: "", 
//     subcategory: "", 
//     search: "" 
//   });
  
//   useEffect(() => {
//     apiRequest.get("/products/allproducts")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error fetching products", err));
//   }, []);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   // Filter products based on all criteria
//   const filteredProducts = products.filter((product) => {
//     const matchPrice = product.price <= filters.price;
//     const matchColor = filters.color ? product.color === filters.color : true;
//     const matchSize = filters.size ? product.size === filters.size : true;
//     const matchSubcategory = filters.subcategory ? 
//       product.subcategory === filters.subcategory : true;
//     const matchSearch = product.name.toLowerCase()
//       .includes(filters.search.toLowerCase());
    
//     return matchPrice && matchColor && matchSize && 
//            matchSubcategory && matchSearch;
//   });

//   // Group products by category
//   const groupedProducts = filteredProducts.reduce((acc, product) => {
//     acc[product.category] = acc[product.category] || [];
//     acc[product.category].push(product);
//     return acc;
//   }, {});

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="container mx-auto p-4">
//         <SearchBar 
//           value={filters.search} 
//           onSearch={(value) => handleFilterChange("search", value)} 
//         />
        
//         <div className="flex flex-col md:flex-row">
//           <Filter 
//             filters={filters} 
//             onFilterChange={handleFilterChange} 
//           />
          
//           <div className="flex-1">
//             {Object.entries(groupedProducts).map(([category, products]) => (
//               <div key={category} className="mb-8">
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">
//                   {category}
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {products.map((product) => (
//                     <div 
//                       key={product._id} 
//                       className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//                     >
//                       <div className="aspect-w-1 aspect-h-1">
//                         <img 
//                           src={product.images[0]} 
//                           alt={product.name}
//                           className="w-full h-64 object-cover"
//                         />
//                       </div>
//                       <div className="p-4">
//                         <h3 className="text-lg font-semibold text-gray-800">
//                           {product.name}
//                         </h3>
//                         <p className="text-gray-600 mb-2">
//                           {product.subcategory}
//                         </p>
//                         <div className="flex justify-between items-center">
//                           <p className="text-xl font-bold text-gray-900">
//                             ${product.price.toFixed(2)}
//                           </p>
//                           <Link 
//                             to={`/product/${product._id}`}
//                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
//                           >
//                             View Details
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
            
//             {Object.keys(groupedProducts).length === 0 && (
//               <div className="text-center py-10 text-gray-500">
//                 No products found matching your criteria
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;


import axios from "axios";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import apiRequest from "../lib/apiRequest";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ 
    price: 10000, 
    color: "", 
    size: "", 
    subcategory: "", 
    search: "" 
  });
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    apiRequest.get("/products/allproducts")
    // axios.get("http://localhost:4000/api/products/allproducts")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (!product) return false; // Handle undefined products
    
    const matchPrice = product.price <= Number(filters.price);
    
    // Handle Colors/Sizes with correct case and array fallbacks
    const colors = Array.isArray(product.Colors) ? product.Colors : [];
    const sizes = Array.isArray(product.Sizes) ? product.Sizes : [];
    
    const matchColor = filters.color ? colors.includes(filters.color) : true;
    const matchSize = filters.size ? sizes.includes(filters.size) : true;
    const matchSubcategory = filters.subcategory ? 
      product.subcategory === filters.subcategory : true;
    const matchSearch = product.name.toLowerCase()
      .includes(filters.search.toLowerCase());

    return matchPrice && matchColor && matchSize && 
           matchSubcategory && matchSearch;
  });

  // Group products by category
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  // Quick View Modal
  const QuickViewModal = ({ product }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
        <div className="grid md:grid-cols-2 gap-6">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div>
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p> 
            <p className="text-gray-600 mb-4">
  <b> {product.Colors?.join(", ")} </b>
</p>

<p className="text-gray-600 mb-4">
  <b> {product.Sizes?.join(", ")} </b>
</p>

            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
              <Link
                to={`/product/${product._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {quickViewProduct && <QuickViewModal product={quickViewProduct} />}
      
      <div className="container mx-auto p-4">
        <SearchBar 
          value={filters.search} 
          onSearch={(value) => handleFilterChange("search", value)} 
        />
        
        <div className="lg:flex md:flex-row">
          <Filter 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
          
          <div className="flex-1">
            {Object.entries(groupedProducts).map(([category, products]) => (
              <div key={category} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 capitalize">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div 
                      key={product._id} 
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="relative">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-64 object-cover"
                        />
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="absolute bottom-4 left-4 bg-white/90 text-black px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition-all"
                        >
                          Quick View
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-2 capitalize">
                          {product.subcategory}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-xl font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                          </p>
                          <Link 
                            to={`/product/${product._id}`}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {Object.keys(groupedProducts).length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No products found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

