import React, { useContext, useState,useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import './sidebar.css';
import icon from "../../assets/logo.jpeg";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../SagaRedux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import { UserDataContext } from '../Header/context';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const {status, token, user} = useSelector((state)=>state.app);
  const {data} = useContext(UserDataContext)
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false); 
  const email = data.email || "";
  const [localPart, domainPart] = email.includes("@") ? email.split("@") : ["", ""];


   const handleLogout=()=>{
     dispatch(logout());
     toast.success("Logout success")
     setTimeout(() => {
      navigate("/login")
     }, 5000);
   }

   useEffect(() => {
    if (token && user && status === 'success') {
      setShowLogout(true);
    } else {
      setShowLogout(false);
    }
  }, [token, user, status]);


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
          <div className="menu-item" onClick={()=>navigate("/dashboard")}>
            <span className="menu-icon">🏠</span>
            <span className="menu-title">Dashboard</span>
          </div>

          <div className="menu-item" onClick={()=>navigate(`/${data._id}/user-profile`)}>
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

         {
          showLogout ? 
         (
          <div className="menu-item" onClick={handleLogout}>
          <span className="menu-icon">🚪</span>
          <span className="menu-title">Logout</span>
        </div>
         ) :(
          <div className="menu-item" onClick={()=>navigate("/login")}>
          <span className="menu-icon">🚪</span>
          <span className="menu-title">Signup / Signin</span>
        </div>
         )
         }
        </div>
       
        <div className="sidebar-footer">
  <div className="profileContainer">
    <div>
      <img className="image" src={data.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="Profile" />
    </div>
    <div>
      <span className="name">{data.name || 'Jhon Doe'}</span><br />
      <span className="email">{localPart || 'jhondow1215.be23'} <br />@{domainPart || 'chitkarauniversity.edu.in'}</span>
    </div>
  </div>
</div>
      </div>
      
    </>
  );
};

export default Sidebar;