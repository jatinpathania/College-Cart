import React, { useContext, useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import './sidebar.css';
import icon from "../../assets/logo.jpeg";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../SagaRedux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import { UserDataContext } from '../Header/context';
import { motion } from "framer-motion"
import { SquarePlus } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const { data } = useContext(UserDataContext)
  const dispatch = useDispatch();
  const email = data.email || "";
  const [localPart, domainPart] = email.includes("@") ? email.split("@") : ["", ""];

  const isAuthenticated = Boolean(data && data._id);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout success")
      navigate("/login")
  }
  
  const sidebarVaraints = {
    open: { x: 0, opacity: 1, scale: 1 },
    closed: { x: "-100%", opacity: 0, scale: 0.9 }
  }

  const backdropVaraints = {
    open: { opacity: 0.6 },
    closed: { opacity: 0 },
  }

  const containerVaraints = {
    open: {
      transition: {
        staggerChildren: 0.2,
        dealyChildren: 0.1,
      }
    },
    closed: {
      transition: {
        staggerChildren: 0.2,
        dealyChildren: 0,
      }
    }
  }

  const itemsVaraints = {
    open: { opacity: 1, y: 0, scale: 1 },
    closed: { opacity: 0, y: -20, scale: 0.95 }
  }

  // useEffect(() => {
  //   console.log("Auth Status:", isAuthenticated);
  //   console.log("Current User Data:", data);
  // }, [isAuthenticated, data]);

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <motion.div className={`sidebar ${isOpen ? 'open' : ''}`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVaraints}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >

        <div className="sidebar-header">
          <img
            src={icon}
            alt="Logo"
            className="sidebar-logo"
          />
          <motion.button className="close-button" onClick={onClose}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={backdropVaraints}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
          >
            <IoMdClose size={24} />
          </motion.button>
        </div>

        <motion.div className="sidebar-content"
          variants={containerVaraints}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        >
          <motion.div className="menu-item" onClick={() => navigate("/dashboard")}
            variants={itemsVaraints} whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <span className="menu-icon">🏠</span>
            <span className="menu-title">Dashboard</span>
          </motion.div>

          <motion.div variants={itemsVaraints} whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="menu-item" onClick={() => navigate(`/${data._id}/user-profile`)}>
            <span className="menu-icon">👤</span>
            <span className="menu-title">Profile</span>
          </motion.div>

          <motion.div variants={itemsVaraints} whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="menu-item">
            <span className="menu-icon">⚙️</span>
            <span className="menu-title">Settings</span>
          </motion.div>

         { isAuthenticated && 
          <motion.div className="menu-item" onClick={()=>navigate("/messages")}
          variants={itemsVaraints} whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }} >
          <span className="menu-icon">✉️</span>
          <span className="menu-title">Messages</span>
        </motion.div>}

          <motion.div className="menu-item"
            variants={itemsVaraints} whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }} onClick={()=>navigate("/all-products")}>
            <span className="menu-icon">📊</span>
            <span className="menu-title">Products</span>
          </motion.div>

         {
          isAuthenticated && 
          <motion.div className="menu-item" onClick={()=>navigate(`/${data._id}/add-products-user`)}
          variants={itemsVaraints} whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}>
          <span className="menu-icon"><SquarePlus color='red' /></span>
          <span className="menu-title">Add Products</span>
        </motion.div>
         }

          {
            isAuthenticated ?
              (
                <motion.div className="menu-item" onClick={handleLogout}
                  variants={itemsVaraints} whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                  <span className="menu-icon">🚪</span>
                  <span className="menu-title">Logout</span>
                </motion.div>
              ) : (
                <motion.div className="menu-item" onClick={() => navigate("/login")}
                  variants={itemsVaraints} whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                  <span className="menu-icon">🚪</span>
                  <span className="menu-title">Signup / Signin</span>
                </motion.div>
              )
          }
        </motion.div>

        <div className="sidebar-footer">
          <div className="profileContainer">
            <div>
              <img className="image" src={data.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="Profile" />
            </div>
            <div>
              <span className="nameUser">{data.name || 'Jhon Doe'}</span><br />
              <span className="emailUser">{localPart || 'jhondow1215.be23'} <br />@{domainPart || 'chitkarauniversity.edu.in'}</span>
            </div>
          </div>
        </div>
      </motion.div>

    </>
  );
};

export default Sidebar;