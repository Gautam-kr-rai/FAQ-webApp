import React from "react";

const FAQList = ({ faqs, updateFaq, deleteFaq }) => {
  return (
    <div className="faq-list">
      {faqs.map((faq) => (
        <div key={faq._id} className="faq-item">
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
          <button onClick={() => updateFaq(faq._id, { question: faq.question, answer: faq.answer })}>
            Edit
          </button>
          <button onClick={() => deleteFaq(faq._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default FAQList;
