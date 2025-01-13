import React from 'react';
import FAQSection from '../../component/FAQSection';
import './FAQCategory.css';

const DeliveryFAQ = () => {
  const deliveryQuestions = [
    { question: 'How long will my delivery take?', answer: 'Delivery usually takes between 5-7 business days, depending on your location.' },
    { question: 'Can I track my delivery?', answer: 'Yes, once your order has shipped, we will send you a tracking number.' },
    { question: 'Do you ship internationally?', answer: 'Yes, we ship to most countries. Please check our shipping policy for more details.' },
    // Add more questions and answers here
  ];

  return (
    <div className="faq-category-page">
      <h2>Delivery FAQ</h2>
      <FAQSection questions={deliveryQuestions} />
    </div>
  );
};

export default DeliveryFAQ;
