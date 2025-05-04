import React, { useState, useEffect } from 'react';
import styles from './contactus.module.css';
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane } from 'react-icons/fa';
import Header from '../Header/Header';

const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  return { question: `What is ${num1} + ${num2}?`, answer: (num1 + num2).toString() };
};

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    captchaInput: '',
    checkbox: false,
  });

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [status, setStatus] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.checkbox) {
      setStatus('❌ Please agree to share your details.');
      return;
    }

    if (formData.captchaInput !== captcha.answer) {
      setStatus('❌ Incorrect captcha answer.');
      return;
    }

    setStatus('✅ Message sent successfully!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      captchaInput: '',
      checkbox: false,
    });
    setCaptcha(generateCaptcha());
  };

  return (
    <>
      <div>
        <Header showSearch={false} showMiddleHeader={true} isProductsPage={false} />
      </div>
      <div className={styles.contactContainer}>
        <div className={styles.formCard}>
          <h1 className={styles.formHead}>Contact Us</h1>
          <p className={styles.subtitle}>We're here to help. Reach out anytime.</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
              <FaUser />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputBox}>
              <FaEnvelope />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={`${styles.inputBox} ${styles.select}`}>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select Subject</option>
                <option value="issue">Issue</option>
                <option value="feedback">Feedback</option>
                <option value="query">Product Query</option>
              </select>
            </div>

            <div className={`${styles.inputBox} ${styles.textarea}`}>
              <FaCommentDots />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className={`${styles.inputBox} ${styles.captcha}`}>
              <label className={styles.captchaBox}>{captcha.question}</label>
              <input
                type="text"
                name="captchaInput"
                value={formData.captchaInput}
                onChange={handleChange}
                placeholder="Enter answer"
                required
              />
            </div>

            <div className={styles.checkboxWrap}>
              <input
                type="checkbox"
                name="checkbox"
                checked={formData.checkbox}
                onChange={handleChange}
                required
              />
              <label>I agree to share my details with College Cart for support purposes.</label>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!formData.checkbox}
            >
              <FaPaperPlane /> Send Message
            </button>

            {status && <p className={styles.formStatus}>{status}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
