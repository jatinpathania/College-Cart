import React, { useEffect,useState } from 'react';
import './Faq.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const faqData = [
  {
    question: "Is there any cost to list items on the platform?",
    answer: "No, listing items on College Cart is completely free for all students."
  },
  {
    question: "How can I post an item for sale?",
    answer: "Go to your profile and click on 'Sell an Item'. Fill in the required details like title, description, price, and upload images."
  },
  {
    question: "Can I delete or edit my listing after posting it?",
    answer: "Yes, you can edit or delete your item at any time from your dashboard."
  },
  
  {
    question: "Is it safe to meet on campus?",
    answer: "Yes, we recommend meeting in common areas like the library or cafeteria for safe exchanges."
  },
  {
    question: "Can I report a fake item or scam?",
    answer: "Yes, you can report items via the 'Report' button on the item's page or contact support through the Contact Us page."
  },
  {
    question: "Who can use College Cart?",
    answer: "Only verified students of the college can use the platform to buy, sell, or exchange items."
  },
  {
    question: "Can alumni use College Cart?",
    answer: " Currently, the platform is only for enrolled students. We may expand access in the future."
  }

];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  useState(()=>{
    window.scrollTo(0,0);
  },[])

  const toggleFAQ = (index) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <>
     <Header showSearch={false} showMiddleHeader={true} isProductsPage={false}/>
    
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      {faqData.map((faq, index) => (
        <div
          className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          key={index}
        >
          <div className="question" onClick={() => toggleFAQ(index)}>
            {faq.question}
            <span className="icon">{activeIndex === index ? '▲' : '▼'}</span>
          </div>
          {activeIndex === index && <div className="answer">{faq.answer}</div>}
        </div>
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default Faq;
