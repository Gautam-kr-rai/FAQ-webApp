import { create } from "zustand";
import axiosInstance from "../lib/axios.js"; // Axios instance
import toast from "react-hot-toast"; // Notifications
import {  useNavigate } from "react-router-dom";

export const useFaqStore = create((set, get) => ({
  faqs: [], // State to store FAQs
  loading: false, // Loading state
  error: null, // Error state
  // Fetch all FAQs (GET /)
  fetchFaqs: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/faq"); // Matches `router.get("/")`
      set({ faqs: response.data.faqs, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to fetch FAQs", loading: false });
      toast.error("Error fetching FAQs!");
    }
  },

  // Create a new FAQ (POST /create)
  createFaq: async (faqData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/faq/addfaq", faqData); // Matches `router.post("/create")`
      set((prevState) => ({ faqs: [...prevState.faqs, response.data], loading: false }));
      toast.success("FAQ added successfully!");
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to add FAQ", loading: false });
      toast.error("Error adding FAQ!");
    }
  },

  // Update an existing FAQ (PUT /:id)
  updateFaq: async (id, updatedFaq) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/faq/${id}`, updatedFaq); // Matches `router.put("/:id")`
      set((state) => ({
        faqs: state.faqs.map((faq) => (faq._id === id ? response.data : faq)),
        loading: false,
      }));
      toast.success("FAQ updated successfully!");
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to update FAQ", loading: false });
      toast.error("Error updating FAQ!");
    }
  },

  // Delete an FAQ (DELETE /:id)
  deleteFaq: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/faq/${id}`); // Matches `router.delete("/:id")`
      set((state) => ({
        faqs: state.faqs.filter((faq) => faq._id !== id),
        loading: false,
      }));
      toast.success("FAQ deleted successfully!");
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to delete FAQ", loading: false });
      toast.error("Error deleting FAQ!");
    }
  },
 
}));
