// import React, { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { Heart } from 'lucide-react';
// import { toast } from 'react-toastify';
// import apiRequest from "../lib/apiRequest";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";

// const ProductPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [inWishlist, setInWishlist] = useState(false);
//   const { currentUser, refreshUserData} = useContext(AuthContext);

//   const { addToCart } = useCart();
//   const handleAddToCart = () => {
//     addToCart(id, 1); // Use the context's addToCart function
//     toast.success("Added to cart!");
//   };

//   useEffect(() => {
//     // Fetch product details
//     apiRequest.get(`/products/${id}`)
//       .then((res) => setProduct(res.data))
//       .catch((err) => console.error("Error fetching product", err));
    
//     // Check if product is in wishlist
//     if (currentUser) {
//       apiRequest.get("/user/wishlist")
//         .then((res) => {
//           setInWishlist(res.data.some(item => item.product._id === id));
//         })
//         .catch((err) => console.error("Error fetching wishlist", err));
//     }
//   }, [id, currentUser]);
  
//   // const addToCart = () => {
//   //   apiRequest.post("/cart/add", { productId: id, quantity: 1 })
//   //     .then((res) => {
//   //       toast.success("Added to cart!");
//   //     })
//   //     .catch((err) => {
//   //       console.error("Error adding to cart", err);
//   //       toast.error("Failed to add to cart");
//   //     });
//   // };
  
//   const toggleWishlist = async () => {
//     if (!currentUser) {
//       toast.error("Please log in to manage your wishlist");
//       return;
//     }
  
//     try {
//       if (inWishlist) {
//         await apiRequest.delete(`/user/wishlist/${id}`);
//         toast.success("Removed from wishlist");
//       } else {
//         await apiRequest.post("/user/wishlist", { productId: id });
//         toast.success("Added to wishlist");
//       }
      
//       await refreshUserData();
//       setInWishlist(!inWishlist);
//     } catch (error) {
//       console.error("Error updating wishlist:", error);
//       toast.error("Failed to update wishlist");
//     }
//   };

  
//   if (!product) return <div>Loading...</div>;
  
//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//       <div className="flex flex-wrap mb-6">
//         {product.images.map((img, idx) => (
//           <img key={idx} src={img} alt={`${product.name} - ${idx + 1}`} className="w-48 h-48 object-cover m-2" />
//         ))}
//       </div>
//       <p className="text-gray-700 mb-4">{product.description}</p>
//       <p className="text-lg mb-2">Category: <span className="font-semibold">{product.category}</span></p>
//       <p className="text-2xl font-bold mb-4">Price: ${product.price.toFixed(2)}</p>
//       <div className="flex space-x-4">
//         <button 
//           onClick={handleAddToCart}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
//         >
//           Add To Cart
//         </button>
//         <button 
//           onClick={toggleWishlist}
//           className={`flex items-center px-4 py-2 rounded transition duration-300 ${
//             inWishlist ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           <Heart className={`w-5 h-5 mr-2 ${inWishlist ? 'fill-current' : ''}`} />
//           {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;


import React, { useEffect, useState, useContext } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'react-toastify';
import apiRequest from "../lib/apiRequest";
import { useCart } from "../context/CartContext";
import {RelatedProducts} from "../components/RelatedProducts"

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const { currentUser, refreshUserData } = useContext(AuthContext);
  const { addToCart } = useCart();

  useEffect(() => {
    apiRequest.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setMainImage(res.data.images[0]);
      })
      .catch((err) => console.error("Error fetching product", err));
    
    if (currentUser) {
      apiRequest.get("/user/wishlist")
        .then((res) => {
          setInWishlist(res.data.some(item => item.product._id === id));
        })
        .catch((err) => console.error("Error fetching wishlist", err));
    }
  }, [id, currentUser]);

  const handleAddToCart = () => {
    addToCart(id, 1);
    toast.success("Added to cart!");
  };

  const toggleWishlist = async () => {
    if (!currentUser) {
      toast.error("Please log in to manage your wishlist");
      navigate("/login");
      return;
    }

    try {
      if (inWishlist) {
        await apiRequest.delete(`/user/wishlist/${id}`);
      } else {
        await apiRequest.post("/user/wishlist", { productId: id });
      }
      
      // await refreshUserData();
      const updatedWishlist = await apiRequest.get("/user/wishlist");

      setInWishlist(!inWishlist);
      toast.success(`Product ${inWishlist ? 'removed from' : 'added to'} wishlist`);
    } catch (error) {
      console.error("Wishlist error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update wishlist");
    }
  };
  
  if (!product) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-28">
        <div className="space-y-4">
          <img src={mainImage} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow-lg" />
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt={`${product.name} - ${idx + 1}`} 
                className="w-24 h-24 object-cover rounded-md cursor-pointer hover:opacity-75 transition"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400"><Star className="inline" /></span>
            <span className="font-semibold">4.5</span>
            <span className="text-gray-500">(123 reviews)</span>
          </div>
          <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Category: <span className="font-medium">{product.category}</span></p>
          <div className="flex space-x-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add To Cart
            </button>
            <button 
              onClick={toggleWishlist}
              className={`px-6 py-3 rounded-full transition duration-300 flex items-center justify-center ${
                inWishlist ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
        <RelatedProducts currentProductId={id} category={product.category} />
    </div>
  );
};

export default ProductPage;
