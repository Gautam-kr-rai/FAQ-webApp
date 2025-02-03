// src/pages/FAQPage.jsx
import React, { useEffect } from "react";
import { useFaqStore } from "../store/useFaqStore";
import { useUserStore } from "../store/useUserStore";
import { Link } from "react-router-dom";

const FAQPage = () => {
  const { faqs, loading, error, fetchFaqs, deleteFaq } = useFaqStore();
  const { user } = useUserStore();
  const isAdmin = user?.role === "admin";
  
  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      deleteFaq(id);
    }
  };
  const handleUpdate = (faqId) => {
      
    // You could navigate to a different page or open a modal with form to update FAQ
    // Here I am just calling updateFaq directly for now, you can extend it.
    updateFaq(faqId, { question: "Updated Question", answer: "Updated Answer" });
  };
  return (
    <div className="faq-page">
      {/* Error handling */}
      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchFaqs}>Retry</button>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <p>Loading FAQs...</p>
      ) : (
        <div className="faq-list">
          {faqs && faqs.length > 0 ? (
            faqs.map((faq) => (
              <div key={faq._id} className="faq-item bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
                {isAdmin && (
                  <div className="flex justify-end mt-4">
                  
                    <Link to={`/faq/${faq._id}`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"> Update</Link>
                    
                    <button
                      onClick={() => handleDelete(faq._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none"
                    >
                      Delete FAQ
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No FAQs available at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FAQPage;
