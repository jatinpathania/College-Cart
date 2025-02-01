import React, { useContext, useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { IoMdSearch } from 'react-icons/io';
import './header.css';
import Sidebar from '../Sidebar/Sidebar';
import icon from "../../assets/logo.jpeg"
import { UserDataContext } from './context';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {data} = useContext(UserDataContext);
  // console.log(data)
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

        <div className="header-right">
          <div className="profile">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41A81cAVOwJ6e58SZMxg_Fh-VSwnYIWb3Bw&s"
              alt="Profile"
              className="avatar"
            />
            <span className="username">{data.name}</span>
          </div>
        </div>
      </div>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;