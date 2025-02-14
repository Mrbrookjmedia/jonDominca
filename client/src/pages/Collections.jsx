 

import img1 from '../assets/images/collection1.png';

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Leaf, Users, Clock } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import apiRequest from '../lib/apiRequest';

const Collection = () => {
  const [activeCategory, setActiveCategory] = useState('seasonal');
  const [isLoading, setIsLoading] = useState(true);

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const [collections, setCollections] = useState({
    seasonal: { title: "Seasonal Collections", items: [] },
    limited: { title: "Limited Edition Drops", items: [] },
    designer: { title: "Designer Collaborations", items: [] },
    sustainable: { title: "Sustainable Luxury", items: [] }
  });

  const categoryIcons = {
    seasonal: <Clock className="w-6 h-6" />,
    limited: <Star className="w-6 h-6" />,
    designer: <Users className="w-6 h-6" />,
    sustainable: <Leaf className="w-6 h-6" />
  };



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
            <p className="text-xl font-bold">${product.price}</p>
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





  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await apiRequest.get('/products/grouped-collections');
        
        // Map backend response to frontend structure
        const formattedCollections = {
          seasonal: {
            title: "Seasonal Collections",
            items: response.data['Seasonal Collections'] || []
          },
          limited: {
            title: "Limited Edition Drops",
            items: response.data['Limited Edition Drops'] || []
          },
          designer: {
            title: "Designer Collaborations",
            items: response.data['Designer Collaborations'] || []
          },
          sustainable: {
            title: "Sustainable Luxury",
            items: response.data['Sustainable Luxury'] || []
          }
        };
        
        setCollections(formattedCollections);
        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to load collections');
        setIsLoading(false);
      }
    };
    
    fetchCollections();
  }, []);

    // Add safe navigation for collections
    const currentCollection = collections[activeCategory] || { title: '', items: [] };

  const ProductCard = ({ product }) => (
    <div className="group relative transform transition-all duration-300 hover:-translate-y-2">
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.images[0] || '/placeholder.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isNew && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            New Arrival
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <button  onClick={() => setQuickViewProduct(product)}
            className="w-full bg-white text-black py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
            // Add quick view handler here
          >
            Quick View
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
        <Link 
          to={`/product/${product._id}`} // Changed from button to Link
          className="mt-3 flex items-center text-blue-600 hover:text-blue-700"
        >
          Shop Now <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">

{quickViewProduct && <QuickViewModal product={quickViewProduct} />}

      {/* Hero Section */}
      <div className="relative h-[70vh] bg-gray-900 overflow-hidden">
        <img
          src={img1}
          alt="Collection Hero"
          className="w-full h-full object-cover opacity-70 transform scale-105 animate-slowZoom"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-light mb-6 animate-fadeSlideDown">
            Collections
          </h1>
          <p className="text-xl max-w-2xl text-center px-4 animate-fadeSlideUp">
            Discover our curated collections that blend timeless elegance with contemporary design
          </p>
        </div>
      </div>

    {/* Category Navigation */}
    <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto py-4 scrollbar-hide">
            {Object.keys(collections).map((collectionKey) => (
              <button
                key={collectionKey}
                onClick={() => setActiveCategory(collectionKey)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                  activeCategory === collectionKey
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {categoryIcons[collectionKey]}
                <span>{collections[collectionKey].title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <h2 className="text-3xl font-light mb-4">
                {currentCollection.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentCollection.items.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    

      

      <style jsx global>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        
        @keyframes fadeSlideDown {
          0% { 
            opacity: 0;
            transform: translateY(-20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeSlideUp {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slowZoom {
          animation: slowZoom 20s ease-out forwards;
        }
        
        .animate-fadeSlideDown {
          animation: fadeSlideDown 1s ease-out forwards;
        }
        
        .animate-fadeSlideUp {
          animation: fadeSlideUp 1s ease-out forwards;
          animation-delay: 0.3s;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Collection;