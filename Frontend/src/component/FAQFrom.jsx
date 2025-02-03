import React, { useState, useEffect } from "react";
import { useFaqStore } from "../store/useFaqStore";
import { useNavigate } from "react-router-dom";

const FAQForm = () => {
  // Accessing state from the store
  const navigate = useNavigate();
  const { createFaq, updateFaq, faqToEdit } = useFaqStore();
  
  const [question, setQuestion] = useState(faqToEdit?.question || "");
  const [answer, setAnswer] = useState(faqToEdit?.answer || "");

  // This effect runs whenever faqToEdit changes to ensure the form is updated for editing
  const handleSubmit = (e) => {
    e.preventDefault();
      createFaq({ question, answer });
      navigate("/faq");
    
    // Clear the form after submission
    setQuestion("");
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        "Create FAQ"
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
         Create FAQ
      </button>
    </form>
  );
};

export default FAQForm;
