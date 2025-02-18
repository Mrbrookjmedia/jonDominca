
import React, { useState, useEffect } from "react";
import { User, MapPin, Phone, Mail, Edit, LogOut, Trash2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";

const UserPage = () => {
  const navigate = useNavigate();
  const { currentUser, logout, refreshUserData } = useAuth();
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data (orders and wishlist)
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("JWT Token:", localStorage.getItem("jwt")); // Debugging log
        const [ordersRes, wishlistRes] = await Promise.all([
          apiRequest.get("/orders/user", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
          }   ),
          apiRequest.get("/user/wishlist" , {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
          }),
        ]);

        setOrders(ordersRes.data);
        setWishlist(wishlistRes.data);
        // await refreshUserData();
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Header debug:", localStorage.getItem("jwt"));
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser) fetchData();
  }, [currentUser]);

  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await apiRequest.post("/auth/logout");
      toast.success(response.data.message);
      setTimeout(() => {
        logout();
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  // Remove item from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    try {
      await apiRequest.delete(`/user/wishlist/${productId}`);
      toast.success("Item removed from wishlist");
      setWishlist(wishlist.filter((item) => item.product?._id !== productId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove item from wishlist");
    }
  };

  // Helper function for editable fields
  const renderEditableField = (label, value, editLink) => (
    <div className="flex items-center text-gray-600">
      {value || label}
      {!value && (
        <Link
          to={editLink}
          className="ml-2 text-blue-600 hover:text-blue-700 flex items-center text-sm"
        >
          <Edit className="w-4 h-4 mr-1" /> Add {label}
        </Link>
      )}
    </div>
  );

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl h-screen mx-auto px-4 py-8">
      <ToastContainer />

      {/* Profile Overview */}
      <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-medium">My Account</h1>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Personal Information</h2>
              <Link
                to="/setting"
                className="text-blue-600 hover:text-blue-700 flex items-center"
              >
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-3" />
                {currentUser?.fullname || "Name not set"}
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3" />
                {currentUser?.email || "Email not set"}
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-3" />
                {renderEditableField(
                  "Phone number",
                  currentUser?.phone,
                  "/setting"
                )}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Shipping Address</h2>
              <Link
                to="/setting"
                className="text-blue-600 hover:text-blue-700 flex items-center"
              >
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Link>
            </div>
            <div className="flex items-start text-gray-600">
              <MapPin className="w-5 h-5 mr-3 mt-1" />
              {renderEditableField(
                "Address",
                currentUser?.address,
                "/setting"
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Recent Orders */}
      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-medium">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="border rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <p className="font-semibold">Order ID: {order._id}</p>
                <span
                  className={`px-2 py-1 rounded ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Processing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: ${order.totalAmount?.toFixed(2) || "0.00"}</p>
              <div className="mt-2">
                <p className="font-medium">Items:</p>
                {order.orderItems?.map((item, index) => (
                  <div key={index} className="flex justify-between py-1">
                    <span>{item.product?.name || "Unknown product"} x {item.quantity}</span>
                    <span>${((item.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Wishlist Section */}
     {/* Wishlist Section */}
<div className="bg-white rounded-lg p-6 shadow-sm">
  <h2 className="text-lg font-medium mb-6">Wishlist</h2>
  {!wishlist || wishlist.length === 0 ? (
    <p>No items in wishlist</p>
  ) : (
    wishlist.map((item) => (
      <div key={item.product?._id} className="flex items-center space-x-4 border rounded-lg p-4 mb-4">
        <Link 
          to={`/product/${item.product?._id}`}
          className="flex items-center space-x-4 flex-1"
        >
          <img
            src={item.product?.images?.[0] || "/placeholder.jpg"}
            alt={item.product?.name}
            className="w-[50px] h-[50px] object-cover rounded-md"
          />
          <span className="hover:text-blue-600">{item.product?.name}</span>
        </Link>
        <button
          onClick={() => handleRemoveFromWishlist(item.product?._id)}
          className="text-red-500 hover:text-red-600 flex items-center space-x-2"
        >
          <span>Remove</span>
          <Trash2 size={20} />
        </button>
      </div>
    ))
  )}
</div>

    </div>
  );
};

export default UserPage;
