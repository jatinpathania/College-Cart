import {React,useContext} from 'react';
import { FaLinkedin, FaGithub, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import './footer.css'
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../Header/context';
const Footer = () => {
  const navigate = useNavigate()
  const {data}= useContext(UserDataContext)
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About College Cart</h4>
          <ul>
            <li><p className="footerLinks" onClick={()=>navigate("/aboutus")}> About Us</p></li>
            <li><p className="footerLinks" onClick={()=>navigate("/our-team")}>Our Team</p></li>
            <li><p className="footerLinks"> Careers</p></li>
            <li><p className="footerLinks" onClick={()=>navigate("/contact-us")}> Contact Us</p></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Sell & Buy</h4>
          <ul>
            <li><p className="footerLinks" onClick={()=>navigate(`/${data._id}/add-products-user`)}> Sell Items</p></li>
            <li><p className="footerLinks" onClick={()=>navigate("/all-products")}> Buy Items</p></li>
            <li><p className="footerLinks"> Exchange Items</p></li>
            <li><p className="footerLinks"> Policies</p></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><p className="footerLinks"> Help Center</p></li>
            <li><p className="footerLinks"> FAQs</p></li>
            <li><p className="footerLinks"> Report Issues</p></li>
            <li><p className="footerLinks"> Feedback</p></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect with Us</h4>
          <div className="social-links">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#" aria-label="GitHub"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 College Cart. All rights reserved.</p>
          <p>Made with ❤️ by College Cart Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;