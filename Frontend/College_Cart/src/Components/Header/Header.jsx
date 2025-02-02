import React, { useContext, useState, useEffect, useRef } from 'react';
import { IoMenu } from 'react-icons/io5';
import { IoMdSearch } from 'react-icons/io';
import './header.css';
import Sidebar from '../Sidebar/Sidebar';
import icon from "../../assets/logo.jpeg";
import { UserDataContext } from './context';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data } = useContext(UserDataContext);
  const [show, setShow] = useState(false);
  const profileRef = useRef(null);
  const naviagte = useNavigate()


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
      <div className="header">
        <div className="header-left">
          <button className="menu-button" onClick={() => setIsOpen(true)}>
            <IoMenu size={40} />
          </button>
          <img
            src={icon}
            alt="Logo"
            className="logo"
          />
        </div>

        <div className="search-container">
          <IoMdSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="header-right" ref={profileRef}>
          <div className="profile" onClick={() => setShow(!show)}>
            <img
              src={data.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
              alt="Profile"
              className="avatar"
            />
            <span className="username">{data && data.name ? data.name : 'Loading...'}</span>
          </div>
          {show && (
            <div className="profile-dropdown" onClick={()=>naviagte(`/${data._id}/user-profile`)}>
              <div className="profile-menu">
                <div className="profile-header">
                  <img
                    src={data.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                    alt="Profile"
                    className="dropdown-avatar"
                  />
                  <div className="profile-info">
                    <span className="profile-name" style={{fontSize:20}}>{data.name}</span><br/>
                    <span className="profile-username" style={{fontSize:14}}>@{data.username}</span>
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