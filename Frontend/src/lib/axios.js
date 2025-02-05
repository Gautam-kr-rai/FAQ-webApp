import axios from "axios"

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.MODE === "production" 
//   ? "http://localhost:3000/api" 
//   : "https://faq-webapp.onrender.com/api", // this assumes that in production the API will be served from the same domain
// withCredentials: true, // send cookies to the server // send cookies to the server
// })

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
});


export default axiosInstance;