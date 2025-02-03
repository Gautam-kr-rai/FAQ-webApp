
import FAQ from "../models/faq.model.js";

// ✅ GET all FAQs
export const getAllQuestions = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json({faqs});
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQs", error: error.message });
  }
};

// ✅ CREATE a new FAQ (Admin Only)
export const createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ message: "Question and Answer are required" });
    }

    const newFaq = new FAQ({ question, answer });
    await newFaq.save();
    res.status(201).json(newFaq);
  } catch (error) {
    res.status(500).json({ message: "Error creating FAQ", error: error.message });
  }
};

// ✅ UPDATE an existing FAQ (Admin Only)
export const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFaq = await FAQ.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedFaq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.status(200).json(updatedFaq);
  } catch (error) {
    res.status(500).json({ message: "Error updating FAQ", error: error.message });
  }
};

// ✅ DELETE an FAQ (Admin Only)
export const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFaq = await FAQ.findByIdAndDelete(id);

    if (!deletedFaq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting FAQ", error: error.message });
  }
};
