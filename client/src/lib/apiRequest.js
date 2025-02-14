// client/src/lib/apiReques.js

import axios from "axios";
const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api",
  
  //  baseURL: "https://phoenixlabs-agal.onrender.com/api", //for deployment
  withCredentials: true,
});
export default apiRequest;
