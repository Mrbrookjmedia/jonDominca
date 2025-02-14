

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Trash2 } from "lucide-react";
import apiRequest from "../lib/apiRequest";
const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiRequest.get("/users");
      setUsers(response.data); // Assuming API returns an array of users
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await apiRequest.delete(`/users/${id}`);
      setUsers(users.filter((user) => user._id !== id)); // Remove deleted user from state
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-6">Admin - Manage Users</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Full Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Username</th>
              <th className="p-3 border">Admin</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center border">
                <td className="p-3 border">{user.fullname}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.username}</td>
                <td className="p-3 border">
                  {user.isAdmin ? (
                    <span className="text-green-600 font-semibold">✔ Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">✖ No</span>
                  )}
                </td>
                <td className="p-3 border">
                  {!user.isAdmin && (
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUser;

