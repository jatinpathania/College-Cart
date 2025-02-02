import React, { useContext } from 'react';
import Header from '../Header/Header';
import { UserDataContext } from '../Header/context';
import "./profile.css"


const Profile = () => {
    const { data } = useContext(UserDataContext);
    
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;