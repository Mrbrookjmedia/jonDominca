import React, { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import axios from "axios";
const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await apiRequest.get("/contact");
        // const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/contact`);

        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Contact Submissions</h1>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">First Name</th>
              <th className="border border-gray-300 p-2">Last Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Order Number</th>
              <th className="border border-gray-300 p-2">Message</th>
              <th className="border border-gray-300 p-2">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td className="border border-gray-300 p-2">{contact.firstName}</td>
                <td className="border border-gray-300 p-2">{contact.lastName}</td>
                <td className="border border-gray-300 p-2">{contact.email}</td>
                <td className="border border-gray-300 p-2">{contact.orderNumber || "N/A"}</td>
                <td className="border border-gray-300 p-2">{contact.message}</td>
                <td className="border border-gray-300 p-2">{new Date(contact.submittedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminContact;
