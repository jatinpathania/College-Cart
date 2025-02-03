import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import { UserDataContext } from '../Header/context';
import "./profile.css"
import { motion } from 'framer-motion';

const Profile = () => {
    const { data } = useContext(UserDataContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Header />
            <div className="profile-page">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-image-container">
                            <img
                                className="profile-image"
                                src={data.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                alt={data.name}
                            />
                        </div>
                        <div className="profile-info">
                            <h1 className="profile-name">{data.name}</h1>
                            <p className="profile-username">@{data.username}</p>
                            <p className="profile-email">{data.email}</p>
                        </div>
                    </div>
                    <div className='accountCreateContainer'>
                        <div>
                            <p className='accountCreate'>Account Create: {new Date(data.createdAt).toLocaleDateString()}, {new Date(data.createdAt).toLocaleTimeString()}</p>
                            <p className='profileUpdate'>Profile Update: {new Date(data.updatedAt).toLocaleDateString()}, {new Date(data.updatedAt).toLocaleTimeString()}</p>
                        </div>
                        <div className='btnEditProfileContainer' onClick={()=>setIsOpen(true)}>
                            <motion.button whileHover={{scale:1.05}}
                            transition={{type:"spring", stiffness:300, damping:20}}
                            className='btn'>
                                Edit Profile
                                </motion.button>
                        </div>
                        <div className=''>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;