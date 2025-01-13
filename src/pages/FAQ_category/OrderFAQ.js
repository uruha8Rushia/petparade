import React from 'react';
import FAQSection from '../../component/FAQSection';
import './FAQCategory.css';

const OrderFAQ = () => {
  const orderQuestions = [
    { question: 'How do I place an order?', answer: 'To place an order, select the items you want, add them to the cart, and proceed to checkout.' },
    { question: 'Can I modify my order?', answer: 'Once the order is placed, it cannot be modified. However, you can cancel your order within 30 minutes and place a new one.' },
    { question: 'Can I track my order?', answer: 'Yes, after placing the order, you will receive a tracking number via email.' },
    // Add more questions and answers here
  ];

  return (
    <div className="faq-category-page">
      <h2>Order FAQ</h2>
      <FAQSection questions={orderQuestions} />
    </div>
  );
};

export default OrderFAQ;
