import React, { useContext, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import styles from './sidebar.module.css';
import icon from "../../assets/logo.jpeg";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../SagaRedux/Slice';
import { useDispatch } from 'react-redux';
import { UserDataContext } from '../Header/context';
import { motion } from "framer-motion"
import { SquarePlus, LayoutDashboard, User, Settings,Mail, LogOut,LogIn,KeyRound, Barcode } from 'lucide-react';


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

  useEffect(() => {
          if(isOpen){
              document.body.style.overflow = 'hidden';
          }else{
              document.body.style.overflow = 'auto';
          }
          return () => {
              document.body.style.overflow = 'auto';
          };
  }, [isOpen]);
  
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
      {isOpen && <div className={styles.sidebarOverlay} onClick={onClose} />}
      <motion.div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVaraints}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >

        <div className={styles.sidebarHeader}>
          <img
            src={icon}
            alt="Logo"
            className={styles.sidebarLogo}
          />
          <motion.button className={styles.closeButton} onClick={onClose}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={backdropVaraints}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
          >
            <IoMdClose size={24} />
          </motion.button>
        </div>

        <motion.div className={styles.sidebarContent}
          variants={containerVaraints}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        >
          <motion.div className={styles.menuItem} onClick={() => navigate("/dashboard")}
            variants={itemsVaraints} whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <span className={styles.menuIcon}>  <LayoutDashboard color='black'/></span>
            <span className={styles.menuTitle}>Dashboard</span>
          </motion.div>

          <motion.div variants={itemsVaraints} whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className={styles.menuItem} onClick={() => navigate(`/${data._id}/user-profile`)}>
            <span className={styles.menuIcon}> <User/></span>
            <span className={styles.menuTitle}>Profile</span>
          </motion.div>

          <motion.div variants={itemsVaraints} whileHover={{ scale: 1.05 }}
          onClick={()=>navigate("/setting")}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className={styles.menuItem}>
            <span className={styles.menuIcon}>  <Settings /></span>
            <span className={styles.menuTitle}>Settings</span>
          </motion.div>

         { isAuthenticated && 
          <motion.div className={styles.menuItem} onClick={()=>navigate("/messages")}
          variants={itemsVaraints} whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }} >
          <span className={styles.menuIcon}> <Mail /></span>
          <span className={styles.menuTitle}>Messages</span>
        </motion.div>}

          <motion.div className={styles.menuItem}
            variants={itemsVaraints} whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }} onClick={()=>navigate("/all-products")}>
            <span className={styles.menuIcon}> <Barcode /></span>
            <span className={styles.menuTitle}>Products</span>
          </motion.div>

          <motion.div className={styles.menuItem}
            variants={itemsVaraints} whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }} onClick={()=>navigate("/all-products-exchange-books")}>
            <span className={styles.menuIcon}> <Barcode /></span>
            <span className={styles.menuTitle}>Exchange Books</span>
          </motion.div>

         {
          isAuthenticated && 
          <>
          <motion.div className={styles.menuItem} onClick={()=>navigate(`/${data._id}/add-products-user`)}
          variants={itemsVaraints} whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}>
          <span className={styles.menuIcon}><SquarePlus /></span>
          <span className={styles.menuTitle}>Add Products</span>
        </motion.div>

         <motion.div className={styles.menuItem} onClick={()=>navigate(`/${data._id}/exchange-add-product-form`)}
         variants={itemsVaraints} whileHover={{ scale: 1.05 }}
         transition={{ type: "spring", stiffness: 300, damping: 15 }}>
         <span className={styles.menuIcon}><SquarePlus /></span>
         <span className={styles.menuTitle}>Exchange Book Add</span>
       </motion.div>
          </>
         }

          {
            isAuthenticated ?
              (
                <motion.div className={styles.menuItem} onClick={handleLogout}
                  variants={itemsVaraints} whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                  <span className={styles.menuIcon}>  <LogOut /></span>
                  <span className={styles.menuTitle}>Logout</span>
                </motion.div>
              ) : (
                <motion.div className={styles.menuItem} onClick={() => navigate("/login")}
                  variants={itemsVaraints} whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                  <span className={styles.menuIcon}>    <KeyRound /></span>
                  <span className={styles.menuTitle}>Signup / Signin</span>
                </motion.div>
              )
          }
        </motion.div>

        {
          isAuthenticated ?
          (
            <div className={styles.sidebarFooter}>
            <div className={styles.profileContainer}>
              <div>
                <img className={styles.image} src={data.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="Profile" />
              </div>
              <div>
                <span className={styles.nameUser}>{data.name || 'Jhon Doe'}</span><br />
                <span className={styles.emailUser}>{localPart || 'jhondow1215.be23'} <br />@{domainPart || 'chitkarauniversity.edu.in'}</span>
              </div>
            </div>
          </div>
          ):(
            // <>
            <div className={`flex ${styles.sidebarFooter}`}>
              <button className='bg-yellow-500 p-2 font-bold rounded-none hover:bg-yellow-600' onClick={()=>navigate("/login")}>Login</button>
              <button className='text-white bg-black font-bold rounded-none hover:bg-slate-900' onClick={()=>navigate('/signup')}>Signup</button>
            </div>
            // </>
          )
        }
      </motion.div>

    </>
  );
};

export default Sidebar;