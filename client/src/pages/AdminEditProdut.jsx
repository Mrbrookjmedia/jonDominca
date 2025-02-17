
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import apiRequest from "../lib/apiRequest";
const validCollections = [
  "Seasonal Collections",
  "Limited Edition Drops",
  "Designer Collaborations",
  "Sustainable Luxury"
];

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State initialization with proper defaults
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    subcategory: "",
    collections: [],
    color: [],
    size: [],
    description: "",
    price: 0,
    images: []
  });

  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCollection, setNewCollection] = useState({
    name: "",
    startDate: null,
    endDate: null,
    description: ""
  });

  const categories = ["bags", "shoes", "apparel", "accessories"];
  const sizes = ["S", "M", "L", "XL", "XXL"];

  // Enhanced data fetching with error handling
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { data } = await apiRequest.get(`/products/${id}`);
        
        const processedData = {
          ...data,
          size: Array.isArray(data.Sizes) ? data.Sizes : [],
          color: Array.isArray(data.Colors) ? data.Colors : [],
          images: Array.isArray(data.images) ? data.images : [],
          collections: Array.isArray(data.collections) 
            ? data.collections.map(c => ({
                ...c,
                startDate: c.startDate ? new Date(c.startDate) : null,
                endDate: c.endDate ? new Date(c.endDate) : null
              }))
            : []
        };

        setProductData(processedData);

        if (processedData.category) {
          const { data: subcategories } = await apiRequest.get(
            `/products/subcategories/${processedData.category}`
            // { headers: { 'Cache-Control': 'no-cache' } }
          );
          setAvailableSubcategories(Array.isArray(subcategories) ? subcategories : []);
        }
      } catch (error) {
        toast.error("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  // Optimized category change handler
  const handleCategoryChange = async (e) => {
    const category = e.target.value.toLowerCase();
    setProductData(prev => ({ ...prev, category, subcategory: "" }));

    try {
      const { data } = await apiRequest.get(
        `/products/subcategories/${category}`
        // { headers: { 'Cache-Control': 'no-cache' } }
      );
      setAvailableSubcategories(Array.isArray(data) ? data : []);
    } catch (error) {
      setAvailableSubcategories([]);
      toast.error("Failed to load subcategories");
    }
  };

  // Unified input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  // Collection management functions
  const handleCollectionChange = (field, value) => {
    setNewCollection(prev => ({ ...prev, [field]: value }));
  };

  const addCollection = () => {
    if (newCollection.name && newCollection.startDate && newCollection.endDate) {
      setProductData(prev => ({
        ...prev,
        collections: [...prev.collections, {
          ...newCollection,
          startDate: newCollection.startDate,
          endDate: newCollection.endDate
        }]
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

  // Color management
  const handleColorChange = (index, value) => {
    const newColors = [...(productData.color || [])];
    newColors[index] = value;
    setProductData(prev => ({ ...prev, color: newColors }));
  };

  // Size management
  const handleSizeChange = (size) => {
    setProductData(prev => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter(s => s !== size)
        : [...prev.size, size]
    }));
  };

  // Image management
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

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest.put(
        `/products/${id}`,
        {
          ...productData,
          Colors: productData.color.filter(c => c.trim() !== ""),
          Sizes: productData.size,
          price: Number(productData.price)
        },
        {
          // withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
        

      );  
      //  delete payload.color;
      // delete payload.size;

      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <div className="p-4 text-center">Loading product...</div>;
  if (!productData) return <div className="p-4 text-center">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Product</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Information Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleCategoryChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subcategory *</label>
                <select
                  name="subcategory"
                  value={productData.subcategory}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={!productData.category}
                >
                  <option value="">Select Subcategory</option>
                  {availableSubcategories.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Collections Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Collections</h2>
            {productData.collections.map((collection, index) => (
              <div key={index} className="border p-4 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-lg">{collection.name}</h3>
                  <button
                    type="button"
                    onClick={() => removeCollection(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-sm text-gray-600">{collection.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  {collection.startDate?.toLocaleDateString()} - {collection.endDate?.toLocaleDateString()}
                </div>
              </div>
            ))}

            <div className="border p-4 rounded-lg space-y-4 bg-gray-50">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Collection Name *</label>
                  <select
                    value={newCollection.name}
                    onChange={(e) => handleCollectionChange('name', e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Collection Type</option>
                    {validCollections.map(col => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date *</label>
                    <DatePicker
                      selected={newCollection.startDate}
                      onChange={(date) => handleCollectionChange('startDate', date)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date *</label>
                    <DatePicker
                      selected={newCollection.endDate}
                      onChange={(date) => handleCollectionChange('endDate', date)}
                      minDate={newCollection.startDate}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newCollection.description}
                  onChange={(e) => handleCollectionChange('description', e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>

              <button
                type="button"
                onClick={addCollection}
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                disabled={!newCollection.name}
              >
                Add Collection
              </button>
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Colors</h2>
            <div className="space-y-2">
              {productData.color.map((color, index) => (
                <input
                  key={index}
                  type="text"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder={`Color #${index + 1}`}
                />
              ))}
              {productData.color.length < 5 && (
                <button
                  type="button"
                  onClick={() => handleColorChange(productData.color.length, "")}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  + Add Color
                </button>
              )}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Available Sizes</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {sizes.map(size => (
                <label key={size} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={productData.size?.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pricing & Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Price (USD) *</label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                />
              </div>
            </div>
          </div>

          {/* Image Management */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Product Images</h2>
            <div className="space-y-2">
              {productData.images.map((img, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="url"
                    value={img}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  + Add Image URL
                </button>
              )}
            </div>
          </div>

          {/* Submission Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProduct;

