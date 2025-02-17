import React, { createContext, useContext, useState, useEffect } from 'react';
import apiRequest from '../lib/apiRequest';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {  
      
      const response = await apiRequest.get('/cart');
      setCart(response.data.items || []);
      setError(null);
      // await fetchCart();
    } catch (err) {
      setError("Failed to load cart, kindly refresh the page");
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

 

  const updateQuantity = async (productId, quantity) => {
    try {
      await apiRequest.put('/cart/update', { productId, quantity });
      await fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await apiRequest.delete(`/cart/remove/${productId}`);
      await fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const clearCart = async () => {
    try {
      await apiRequest.post('/cart/clear');
      // setCart([]);
      await fetchCart(); // Refresh from server after clear
      toast.success("Cart cleared successfully");
    } catch (err) {
      console.error("Error clearing cart:", err);
      toast.error("Failed to clear cart");
    }
  };
  const addToCart = async (productId, quantity) => {
    try {
      await apiRequest.post('/cart/add', { productId, quantity });
      await fetchCart(); // Immediately fetch updated cart
      toast.success("Product added to cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
  };



   useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      error,
      updateQuantity,
      removeItem,
      clearCart,
      fetchCart,
      addToCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
