import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
  ? "http://localhost:3000/api" 
  : "/api", // this assumes that in production the API will be served from the same domain
withCredentials: true, // send cookies to the server // send cookies to the server
})

export default axiosInstance;