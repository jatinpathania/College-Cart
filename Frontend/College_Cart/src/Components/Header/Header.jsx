import React, { useContext, useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import icon from "../../assets/logo.jpeg";
import { UserDataContext } from "./context";
import style from "./header.module.css"; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useContext(UserDataContext);
  const [show, setShow] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

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


  return (
    <>
      <div className={style.header}>
        <div className={style.headerLeft}>
          <button className={style.menuButton} onClick={() => setIsOpen(true)}>
            <IoMenu size={40} />
          </button>
          <img src={icon} alt="Logo" className={style.logo} />
        </div>

        <div className={style.searchContainer}>
          <IoMdSearch className={style.searchIcon} size={30}/>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={style.searchInput}
          />
        </div>

        <div className={style.headerRight} ref={profileRef}>
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
