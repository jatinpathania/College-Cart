import React from 'react';
import { IoMdClose } from 'react-icons/io';
import './sidebar.css';
import icon from "../../assets/logo.jpeg";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img
            src={icon}
            alt="Logo"
            className="sidebar-logo"
          />
          <button className="close-button" onClick={onClose}>
            <IoMdClose size={24} />
          </button>
        </div>

        <div className="sidebar-content">
          <div className="menu-item">
            <span className="menu-icon">🏠</span>
            <span className="menu-title">Dashboard</span>
          </div>

          <div className="menu-item">
            <span className="menu-icon">👤</span>
            <span className="menu-title">Profile</span>
          </div>

          <div className="menu-item">
            <span className="menu-icon">⚙️</span>
            <span className="menu-title">Settings</span>
          </div>

          <div className="menu-item">
            <span className="menu-icon">✉️</span>
            <span className="menu-title">Messages</span>
          </div>

          <div className="menu-item">
            <span className="menu-icon">📊</span>
            <span className="menu-title">Product</span>
          </div>

          <div className="menu-item">
            <span className="menu-icon">❓</span>
            <span className="menu-title">Help</span>
          </div>

          <div className="menu-item">
            <span className="menu-icon">🚪</span>
            <span className="menu-title">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;