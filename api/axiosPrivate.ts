import axios from "axios";
import { getTokenFromCookie } from "@/lib/auth";
// Create Axios instance
import { redirect } from "next/navigation";
import { removeCookie } from "@/lib/auth";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL:apiUrl, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the token to each request
axiosInstance.interceptors.request.use(
 async (config) => {
    // Get the token from localStorage or your preferred storage
    const token = await getTokenFromCookie(); // Replace with your storage method (localStorage, cookies, etc.)
    if (token) {
      // Attach the token to the Authorization header
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
    (response) => {
      return response; // If the response is okay, just return it
    },
    async (error) => {
      if (error.response && error.response.status === 403) {
        removeCookie()
        // Clear cookies (implement this function based on your cookie handling method)

        // Optionally, clear other related cookies here
  
        // Redirect to login page
        redirect('/')
         // Redirect to the login page (adjust the URL if needed)
      }
  
      return Promise.reject(error);
    }
  );

export default axiosInstance;