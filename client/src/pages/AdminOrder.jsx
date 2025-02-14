// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import apiRequest from "../lib/apiRequest";
// import { toast, ToastContainer } from "react-toastify";

// const AdminOrder = () => {
//   const { currentUser, setCurrentUser, refreshUserData } = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("orders");


//   useEffect(() => {
//     console.log("AdminDashboard: currentUser from context:", currentUser);
//     if (currentUser === null || currentUser === undefined) {
//       // Try to load from localStorage
//       const stored = localStorage.getItem("user");
//       if (stored) {
//         const parsed = JSON.parse(stored);
//         console.log("AdminDashboard: read user from storage:", parsed);
//         setCurrentUser(parsed);
//       }
//     }
//     setIsLoading(false);
//   }, [currentUser, setCurrentUser]);

//   const fetchOrders = async () => {
//     try {
//       const response = await apiRequest.get("/orders/all");
//       console.log("Orders response:", response.data);
//       setOrders(response.data);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       toast.error("Failed to fetch orders");
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       if (currentUser && currentUser.isAdmin) {
//         if (activeTab === "orders") {
//           await fetchOrders();
//         }
//       }
//     };
//     loadData();
//   }, [currentUser]);
//   // removed , activeTab from the useEffect modify array

//   const handleStatusUpdate = async (orderId, newStatus) => {
//     try {
//       await apiRequest.put(`/orders/${orderId}/status`, { status: newStatus });
//       await fetchOrders();
//       toast.success("Order status updated");
//     } catch (err) {
//       console.error("Error updating order status:", err);
//       toast.error("Failed to update order status");
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }
//   if (!currentUser || !currentUser.isAdmin) {
//     return (
//       <div className="text-center py-10 text-red-500">
//         Access denied. Admin privileges required.
//       </div>
//     );
//   }

//   return (
//     <div>
//       <ToastContainer />
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

//           {orders.length === 0 ? (
//             <p>No orders found.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full">
//                 <thead>
//                   <tr className="bg-gray-50">
//                     <th className="px-6 py-3 text-left">Order ID</th>
//                     <th className="px-6 py-3 text-left">Customer</th>
//                     <th className="px-6 py-3 text-left">Items</th>
//                     <th className="px-6 py-3 text-left">Total</th>
//                     <th className="px-6 py-3 text-left">Status</th>
//                     <th className="px-6 py-3 text-left">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {orders.map((order) => (
//                     <tr key={order._id}>
//                       <td className="px-6 py-4">{order._id}</td>
//                       <td className="px-6 py-4">
//                         <div>{order.user.fullname}</div>
//                         <div className="text-sm text-gray-500">
//                           {order.user.email}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           Phone: {order.user.phone || "N/A"}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           Address: {order.user.address || "N/A"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         {order.orderItems.map((item, idx) => (
//                           <div key={idx}>
//                             {item.product.name} x {item.quantity}
//                           </div>
//                         ))}
//                       </td>
//                       <td className="px-6 py-4">
//                         ${order.totalAmount.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4">
//                         <span
//                           className={`px-2 py-1 rounded ${
//                             order.status === "Delivered"
//                               ? "bg-green-100 text-green-800"
//                               : order.status === "Processing"
//                               ? "bg-blue-100 text-blue-800"
//                               : "bg-yellow-100 text-yellow-800"
//                           }`}
//                         >
//                           {order.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <select
//                           value={order.status}
//                           onChange={(e) =>
//                             handleStatusUpdate(order._id, e.target.value)
//                           }
//                           className="border rounded px-2 py-1"
//                         >
//                           <option value="Pending">Pending</option>
//                           <option value="Processing">Processing</option>
//                           <option value="Shipped">Shipped</option>
//                           <option value="Delivered">Delivered</option>
//                         </select>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//     </div>
//   )
// }

// export default AdminOrder


import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { toast, ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-700 rounded-lg">
      <p>Something went wrong:</p>
      <pre className="whitespace-pre-wrap">{error.message}</pre>
      <button 
        onClick={resetErrorBoundary}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Try Again
      </button>
    </div>
  );
}

const AdminOrder = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await apiRequest.get("/orders/all");
      setOrders(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders");
      toast.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.isAdmin) {
      fetchOrders();
    }
  }, [currentUser]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await apiRequest.put(`/orders/${orderId}/status`, { status: newStatus });
      await fetchOrders();
      toast.success("Order status updated");
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error("Failed to update order status");
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading orders...</div>;
  }

  if (!currentUser?.isAdmin) {
    return (
      <div className="text-center py-10 text-red-500">
        Admin privileges required
      </div>
    );
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ToastContainer />
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">Order Management</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {orders.length === 0 ? (
            <p className="text-center text-gray-500">No orders found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {order._id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>
                          {order.user?.fullname || "Customer name unavailable"}
                        </div>
                        <div className="text-gray-500">
                          {order.user?.email || "No email provided"}
                        </div>
                        <div className="text-gray-500">
                          Phone: {order.user?.phone || "N/A"}
                        </div>
                        <div className="text-gray-500">
                          Address: {order.user?.address || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {(order.orderItems || []).map((item, idx) => (
                          <div key={idx}>
                            {item.product?.name || "Product unavailable"} x{" "}
                            {item.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ${(order.totalAmount || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusUpdate(order._id, e.target.value)
                          }
                          className="border rounded px-3 py-1 text-sm"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AdminOrder;
