import React from 'react';
import FAQSection from '../../component/FAQSection';
import './FAQCategory.css';

const PaymentFAQ = () => {
  const paymentQuestions = [
    { question: 'What payment methods are accepted?', answer: 'We accept all major credit cards, PayPal, and Apple Pay.' },
    { question: 'Is my payment information secure?', answer: 'Yes, we use SSL encryption to ensure that your payment information is secure.' },
    { question: 'Can I save my payment information for future purchases?', answer: 'Yes, you can save your payment details securely on your account for quicker checkouts.' },
    // Add more questions and answers here
  ];

  return (
    <div className="faq-category-page">
      <h2>Payment FAQ</h2>
      <FAQSection questions={paymentQuestions} />
    </div>
  );
};

export default PaymentFAQ;
