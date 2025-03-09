import React, { useContext, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../SagaRedux/Slice";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Skeleton from '@mui/material/Skeleton';
import './ProductDetails.css';
import { addToCart } from '../Redux/Slice';
import { cartAdd } from '../SagaRedux/Slice';
import store from '../SagaRedux/Store';
import { io } from "socket.io-client";
import { UserDataContext } from "../Header/context";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, isLoading, error } = useSelector((state) => state.app);
    const [messageModal, setMessageModal] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const socketRef = useRef(null);
    const [roomId, setRoomId] = useState(null);
    const { data } = useContext(UserDataContext);
    const backend_url = import.meta.env.VITE_BACKEND_API_URL;
    const socket_url = import.meta.env.VITE_SOCKET_URL;
    const messagesEndRef = useRef(null);

    useEffect(() => {
        dispatch(fetchProductDetails(id));
    }, [dispatch, id]);


    useEffect(() => {
        if (!socketRef.current && data?._id) {
            socketRef.current = io(socket_url);

            socketRef.current.on("connect", () => {
                console.log("Socket connected:", socketRef.current.id);
            });

            socketRef.current.on("connect_error", (err) => {
                console.error("Socket connection error:", err);
            });

            socketRef.current.on("receive_message", (data) => {
                if (data.message && data.joinRoomId === roomId) {
                    const formattedMessage = {
                        message: data.message.text,
                        sender: data.senderId === data?._id ? 'self' : 'other',
                        timestamp: new Date().toISOString()
                    };
                    setMessages(prev => [...prev, formattedMessage]);
                }
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                console.log("Socket disconnected");
            }
        };
    }, [data?._id, socket_url]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const toggleMessageModal = async () => {
        const newMessageModalState = !messageModal;
        setMessageModal(newMessageModalState);

        if (newMessageModalState && product?.product && data?._id) {
            await handleJoinRoom();
        }
    };

    const handleJoinRoom = async () => {
        try {
            if (product?.product && data?._id) {
                const loginUserId = data._id;
                const sentUserId = product?.product.userId._id;
                const productId = product?.product._id;

                const response = await axios.post(`${backend_url}/joinRoom`, {
                    loginUserId,
                    sentUserId,
                    productId,
                });

                if (response.data && response.data.room) {
                    const joinRoomId = response.data.room._id;
                    setRoomId(joinRoomId);

                    socketRef.current.emit("join_room", { joinRoomId });
                    console.log("Joined Room:", joinRoomId);

                    
                    loadPreviousMessages(joinRoomId);
                }
            }
        } catch (error) {
            console.error("Error joining room:", error);
        }
    };

    const loadPreviousMessages = async (roomId) => {
        try {
            const response = await axios.get(`${backend_url}/message/${roomId}`);
            const formattedMessages = response.data.map(msg => ({
                message: msg.message,
                sender: msg.senderId === data?._id ? 'self' : 'other',
                timestamp: msg.createdAt
            }));
            setMessages(formattedMessages);
        } catch (error) {
            console.error("Error loading previous messages:", error);
        }
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || !roomId || !data?._id) return;

        const messageText = inputMessage.trim();

        const timestamp = new Date().toISOString();
        setMessages(prev => [
            ...prev,
            {
                message: messageText,
                sender: 'self',
                timestamp
            }
        ]);

        
        setInputMessage("");


        socketRef.current.emit("send_message", {
            joinRoomId: roomId,
            message: { text: messageText, sender: 'self' },
            senderId: data._id,
        });

        try {
            await axios.post(`${backend_url}/message`, {
                senderId: data._id,
                receiverId: product.product.userId._id,
                message: messageText,
                roomId: roomId,
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        const totalQuantity = store.getState().cart.totalQuantity;

        setTimeout(() => {
            const updatedState = store.getState().cart.itemList;
            const storeItem = updatedState.find(item => item._id === product.product._id);
            if (storeItem) {
                const cartItem = {
                    productId: storeItem._id,
                    name: storeItem.name,
                    brand: storeItem.brand,
                    category: storeItem.category,
                    selectHostel: storeItem.selectHostel,
                    hostleName: storeItem.hostleName,
                    roomNumber: storeItem.roomNumber,
                    dayScholarContectNumber: storeItem.dayScholarContectNumber,
                    price: storeItem.price,
                    prevPrice: storeItem.prevPrice,
                    totalPrice: storeItem.totalPrice,
                    image: storeItem.image,
                    productQuantity: storeItem.productQuantity,
                    quantity: storeItem.quantity,
                    totalQuantity: totalQuantity
                };

                dispatch(cartAdd(cartItem));
            }
        }, 200);
    };

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="amazon-container">
                    <Skeleton variant="text" width={200} height={20} />

                    <div className="product-grid">
                        <div className="image-column">
                            <div className="main-image-container">
                                <Skeleton variant="rectangular" width="100%" height={400} />
                            </div>
                        </div>
                        <div className="details-column">
                            <Skeleton variant="text" width="80%" height={32} />
                            <Skeleton variant="text" width={150} height={24} />

                            <div className="price-block">
                                <Skeleton variant="text" width={100} height={40} />
                                <Skeleton variant="text" width={100} height={40} />
                                <Skeleton variant="text" width={150} height={20} />
                                <Skeleton variant="text" width={120} height={16} />
                            </div>

                            <div className="delivery-info">
                                <Skeleton variant="text" width={200} height={24} />
                                <Skeleton variant="text" width={150} height={20} />
                            </div>

                            <div className="about-section">
                                <Skeleton variant="text" width={150} height={24} />
                                <Skeleton variant="text" width="100%" height={20} />
                                <Skeleton variant="text" width="100%" height={20} />
                                <Skeleton variant="text" width="80%" height={20} />
                            </div>
                        </div>
                        <div className="buy-box-column">
                            <div className="buy-box">
                                <Skeleton variant="text" width={120} height={32} />
                                <Skeleton variant="text" width={180} height={24} />
                                <Skeleton variant="text" width={200} height={20} />
                                <Skeleton variant="rectangular" width="100%" height={40} style={{ marginBottom: '10px', borderRadius: '20px' }} />
                                <Skeleton variant="rectangular" width="100%" height={40} style={{ borderRadius: '20px' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '100px' }}>
                    <Footer />
                </div>
            </>
        );
    }
    return (
        <>
            <Header />
            <div className="amazon-container">
                <div className="breadcrumb">
                    {product?.product.category} {'>'} {product?.product.brand}
                </div>

                <div className="product-grid">
                    <div className="image-column">
                        <div className="main-image-container">
                            <img
                                src={product?.product.image}
                                alt={product?.product.name}
                                className="main-product-image"
                            />
                            <div className="image-zoom-lens"></div>
                        </div>
                    </div>
                    <div className="details-column">
                        <h1 className="product-name">{product?.product.name}</h1>

                        <div className="price-block">
                            <h2 className="text-black">Quantity: {product?.product.quantity}</h2>
                            <div className="price-section">
                                <span className="rupee-symbol">&#8377; </span>
                                <span className="current-price">{product?.product.newAmount}</span>
                            </div>
                            <div className="original-price">
                                M.R.P.: <span className="strikethrough">&#8377; {product?.product.prevAmount}</span>
                            </div>
                        </div>

                        <div className="delivery-info">
                            {product?.product.selectHostel === "Hostler" ? (
                                <div className="hostel-details">
                                    <div className="location-icon">&#128205;</div>
                                    <div>
                                        <div className="hostel-name">
                                            {product?.product.hostleName} Hostel
                                        </div>
                                        <div className="room-number">
                                            Room {product?.product.roomNumber}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="contact-details">
                                    <div className="phone-icon">&#128222;</div>
                                    <div className="contact-number">
                                        {product?.product.dayScholarContectNumber}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="about-section">
                            <h2>About this item</h2>
                            <div className="description-text">
                                {product?.product.description}
                            </div>
                        </div>
                    </div>

                    {messageModal && (
                        <div 
                            style={{
                                position: 'fixed',
                                top: '50%',
                                right: '20px',
                                transform: 'translateY(-50%)',
                                zIndex: 1000,
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                borderRadius: '8px',
                                background: 'white'
                            }}
                        >
                            <div className="max-w-md mx-auto bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden">
                                <div className="flex flex-col h-[700px]">
                                    <div className="px-4 py-3 border-b dark:border-zinc-700">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-7">
                                                <img 
                                                    className="w-12 h-12 rounded-full border-gray-600 border-2 object-cover shadow-md" 
                                                    src={product?.product.userId.profileImage || "https://via.placeholder.com/40"}
                                                    alt="User Profile"
                                                />
                                                <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
                                                    {product?.product.userId.name || "Seller"}
                                                </h2>
                                            </div>
                                            <div className="flex items-center">
                                                <button 
                                                    onClick={toggleMessageModal}
                                                    className="text-gray-500 w-10 hover:text-gray-700"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2"
                                        id="chatDisplay"
                                    >
                                        {messages.length === 0 ? (
                                            <div className="text-center p-4 text-gray-500">
                                                <p>Start a conversation about this product</p>
                                            </div>
                                        ) : (
                                            messages.map((msg, index) => (
                                                <div
                                                    key={index}
                                                    className={`chat-message ${msg.sender === 'self' ? 'self-end bg-blue-500' : 'self-start bg-zinc-500'} text-white max-w-xs rounded-lg px-3 py-1.5 text-sm flex flex-col`}
                                                >
                                                    <span>{msg.message}</span>
                                                    <span className="text-xs text-white text-opacity-75 self-end mt-1">
                                                        {formatTime(msg.timestamp)}
                                                    </span>
                                                </div>
                                            ))
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                    <div className="px-3 py-2 border-t dark:border-zinc-700">
                                        <div className="flex gap-2">
                                            <input
                                                placeholder="Type your message..."
                                                className="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
                                                value={inputMessage}
                                                onChange={(e) => setInputMessage(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                            />
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
                                                onClick={handleSendMessage}
                                                disabled={!inputMessage.trim()}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div className="buy-box-column">
                        <div className="buy-box">
                            <div className="buy-box-price">
                                <span className="rupee-symbol">₹</span>
                                <span className="price-amount">{product?.product.newAmount}</span>
                            </div>
                            <div className="delivery-message">
                                Available for contact
                            </div>
                            <div className="seller-info">
                                Sold by: {product?.product.selectHostel === "Hostler" ?
                                    `${product?.product.hostleName} Hostel - Room ${product?.product.roomNumber}` :
                                    'Day Scholar'}
                            </div>
                            <button className="buy-now-button">
                                Buy Now
                            </button>
                            <button className="add-to-cart-button" onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                        </div>
                       
                            <button className="messageButton" onClick={toggleMessageModal}>
                                <span className="text">Message</span>
                            </button>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '100px' }}>
                <Footer />
            </div>
        </>
    );
};

export default ProductDetails;