
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link,useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cart, loading, error, updateQuantity, removeItem, clearCart,fetchCart } = useCart();
  const { currentUser, refreshUserData } = useAuth();
  const navigate = useNavigate();
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist on mount
  React.useEffect(() => {
    if (currentUser) {
      apiRequest.get("/user/wishlist")
        .then(res => setWishlist(res.data))
        .catch(err => console.error("Error fetching wishlist:", err));
    }
  }, [currentUser]);



  const handleRemoveFromWishlist = async (productId) => {
    try {
      await apiRequest.delete(`/user/wishlist/${productId}`);
      setWishlist(wishlist.filter(item => item.product?._id !== productId));
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    }
  };




  const handleCheckout = async () => {
        if (!currentUser) {
          toast.error("Please login to place an order");
          navigate("/login");
          return;
        }
    
        setIsProcessingOrder(true);
        try {
          const orderData = {
            orderItems: cart
              .map(item => ({
                product: item.product?._id,
                quantity: item.quantity,
                price: item.product?.price ?? 0
              }))
              .filter(item => item.product), // Filter out invalid items
            shippingAddress: {
              address: currentUser?.address || "",
              city: "",
              phone: currentUser?.phone || ""
            },
            paymentMethod: "COD",
            totalAmount: total
          };
    
          await apiRequest.post("/orders", orderData);
          clearCart();
          toast.success("Order placed successfully!");
          navigate("/user-dash");
        } catch (error) {
          console.error("Error creating order:", error);
          toast.error(error.response?.data?.message || "Failed to place order");
        } finally {
          setIsProcessingOrder(false);
        }
      };

  const handleAddFromWishlist = async (productId) => {
    try {
      await apiRequest.post("/cart/add", { productId, quantity: 1 });
      // await refreshUserData();
      await fetchCart(); // Force refresh cart data
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      {/* Cart Items */}
      <div className="bg-white rounded-lg shadow mb-8">
        {cart.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-xl mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {cart.map((item) => (
  <div key={item.product?._id} className="flex items-center p-4 border-b">
    <Link 
      to={`/product/${item.product?._id}`}
      className="flex items-center flex-1"
    >
      <img
        src={item.product?.images?.[0] || '/placeholder.jpg'}
        alt={item.product?.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="ml-4">
        <h3 className="font-semibold hover:text-blue-600">{item.product?.name}</h3>
        <p className="text-gray-600">${(item.product?.price || 0).toFixed(2)}</p>
      </div>
    </Link>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.product._id)}
                  className="ml-4 text-red-500 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 text-red-500 hover:text-red-600"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={isProcessingOrder}
                  className={`bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 ${
                    isProcessingOrder ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessingOrder ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>


{/* Wishlist Section */}
<div className="bg-white rounded-lg shadow p-6 mt-8">
  <h2 className="text-xl font-bold mb-4">Your Wishlist</h2>
  {wishlist.map((item) => (
    <div key={item._id} className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        {item.product ? (
          <Link 
            to={`/product/${item.product._id}`} 
            className="flex items-center hover:text-blue-600"
          >
            <img
              src={item.product.images?.[0]}
              alt={item.product.name}
              className="w-16 h-16 object-cover mr-4"
            />
            <span className="ml-2">{item.product.name}</span>
          </Link>
        ) : (
          <span className="text-red-500">Product no longer available</span>
        )}
      </div>
      <div className="flex gap-2">
        {item.product && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAddFromWishlist(item.product._id);
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFromWishlist(item.product?._id);
          }}
          className="text-red-500 hover:text-red-600 px-2"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  ))}
</div>


    </div>
  );
};

export default CartPage;
