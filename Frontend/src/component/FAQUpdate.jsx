import React, { useState, useEffect } from "react";
import { useFaqStore } from "../store/useFaqStore";
import { useNavigate, useParams } from "react-router-dom";

const FAQUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the FAQ ID from the route parameters
  const { updateFaq, faqs } = useFaqStore(); // Assuming faqs are available in your store
  
  // Find the FAQ to edit from the store by ID
  const faqToEdit = faqs.find((faq) => faq._id === id); 

  const [question, setQuestion] = useState(faqToEdit?.question || "");
  const [answer, setAnswer] = useState(faqToEdit?.answer || "");

  // Update the form state when faqToEdit changes
  useEffect(() => {
    if (faqToEdit) {
      setQuestion(faqToEdit.question);
      setAnswer(faqToEdit.answer);
    }
  }, [faqToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (faqToEdit) {
      await updateFaq(faqToEdit._id, { question, answer });
      navigate("/faq"); // Navigate to the FAQ list page after update
    }

    // Clear the form after submission
    setQuestion("");
    setAnswer("");
  };

  if (!faqToEdit) {
    return <p>Loading...</p>; // Show a loading message if FAQ is not yet found
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Update FAQ
      </h2>

      <div className="mb-4">
        <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
          Question
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
          Answer
        </label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Update FAQ
      </button>
    </form>
  );
};

export default FAQUpdate;
