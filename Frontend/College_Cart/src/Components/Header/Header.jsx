import React, { useContext, useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import icon from "../../assets/logo.jpeg";
import { UserDataContext } from "./context";
import style from "./header.module.css";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getToken } from "../../util/tokenService";
import axios from "axios";

const backend_url = import.meta.env.VITE_BACKEND_API_URL;
const Header = ({ showSearch = true, showMiddleHeader = true, isProductsPage = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useContext(UserDataContext);
  const [show, setShow] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useContext(UserDataContext);
  const [cartItems, setCartItems] = useState([]);
  const { totalQuantity } = (useSelector((state) => state.cart));
  // const totalQuantity1 = obj.itemList.length;
  // console.log( totalQuantity);
  const isAuthenticated = Boolean(data && data._id);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 480px)");
    const handleChange = (e) => {
      setIsMobile(e.matches);
      console.log("Is mobile:", e.matches);
    };
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const token = getToken()
      try {
        const res = await axios.get(`${backend_url}/all-cart-product`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        setCartItems(res.data.item);
        // console.log(res.data.item)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cartItems.length]);
  // console.log(cartItems.length)


  return (
    <>
      <div className={style.header}>
        <div className={style.headerLeft}>
          <button className={style.menuButton} onClick={() => setIsOpen(true)}>
            <IoMenu size={40} />
          </button>
          <img src={icon} alt="Logo" className={style.logo} />
        </div>
        {showMiddleHeader && (
            <div className={`${style.middleHeader} ${isProductsPage && isMobile ? style.hideOnMobile : ''}`}>
            <p className={style.navLink} onClick={() => navigate("/all-products")}>Products</p>
            <p className={style.navLink} onClick={() => navigate("/aboutus")}>About Us</p>
            <p className={style.navLink} onClick={() => navigate("/our-team")}>Our Team</p>
            <p className={style.navLink} onClick={() => navigate("/contact-us")}>Contact</p>
          </div>
        )}

        {showSearch && (
          <div className={style.searchContainer}>
            <IoMdSearch className={style.searchIcon} size={30} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={style.searchInput}
            />
          </div >
        )}

        <div className={style.addProductCart} onClick={() => navigate('/addCartProudct')}>
          <FaCartPlus className={style.cart} size={44} />
          <div className={style.productCountInCart}>
            <p>{cartItems.length || totalQuantity}</p>
          </div>
        </div>

        <div className={style.headerRight} ref={profileRef}>
          {isAuthenticated ?
            (
              <div className={style.profile} onClick={() => setShow(!show)}>
                <motion.img
                  src={data.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="Profile"
                  className={style.avatar}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <span className={style.username}>{data?.name || "John Doe"}</span>
              </div>
            ) : (
              <>
                <div className={`${style.person}`}>
                  <motion.button className={`bg-yellow-300 p-2 font-bold rounded-lg w-16 hover:bg-yellow-400 ${style.login}`} whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 100, damping: 90 }} onClick={() => navigate("/login")}>Login</motion.button>
                  <motion.button className={`text-white bg-black font-bold rounded-lg w-20 hover:bg-slate-800' ${style.signup}`} whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 100, damping: 90 }} onClick={() => navigate('/signup')}>Signup</motion.button>
                </div>
              </>
            )
          }
          {show && (
            <div className={style.profileDropdown} onClick={() => navigate(`/${data._id}/user-profile`)}>
              <div className={style.profileMenu}>
                <div className={style.profileHeader}>
                  <img
                    src={data.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt="Profile"
                    className={style.dropdownAvatar}
                  />
                  <div className={style.profileInfo}>
                    <span className={style.profileName}>{data.name || "John Doe"}</span>
                    <br />
                    <span className={style.profileUsername}>@{data.username || "jhondoe"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
