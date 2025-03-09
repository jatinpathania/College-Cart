import React, { useContext, useEffect, useState, useRef } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "./messages.css";
import axios from 'axios';
import { UserDataContext } from '../Header/context';
import { getToken } from '../../util/tokenService';
import { io } from "socket.io-client";
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
  const navigate = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_API_URL;
  const socket_url = import.meta.env.VITE_SOCKET_URL;
  const { data } = useContext(UserDataContext);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const userId = data?._id; 

  useEffect(() => {
    if (!socketRef.current && userId) {
      socketRef.current = io(socket_url);
  
      socketRef.current.on("connect", () => {
        console.log("Socket connected:", socketRef.current.id);
        setSocketConnected(true);
      });
  
      socketRef.current.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
        setSocketConnected(false);
      });
  
      socketRef.current.on("disconnect", () => {
        console.log("Socket disconnected");
        setSocketConnected(false);
      });
  
      socketRef.current.on("receive_message", (socketData) => {
        if (socketData.message) {
          if (socketData.senderId !== userId) {
            const formattedMessage = {
              message: socketData.message.text,
              sender: 'other', 
              timestamp: new Date().toISOString(),
            };
            
            setMessages((prev) => [...prev, formattedMessage]);
          }
  
          setConversations((prev) => {
            const updatedConversations = [...prev];
            const convoIndex = updatedConversations.findIndex(
              (conv) => conv.roomId === socketData.joinRoomId
            );
            if (convoIndex !== -1) {
              updatedConversations[convoIndex] = {
                ...updatedConversations[convoIndex],
                lastMessage: socketData.message.text,
                timestamp: new Date().toISOString(),
              };
              updatedConversations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            }
            return updatedConversations;
          });
        }
      });
    }
  
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocketConnected(false);
        console.log("Socket disconnected on cleanup");
      }
    };
  }, [userId, socket_url]); 
  
  useEffect(() => {
    if (socketRef.current && socketConnected && selectedConversation) {
      console.log("Joining room:", selectedConversation.roomId);
      socketRef.current.emit("join_room", { joinRoomId: selectedConversation.roomId });
    }
  }, [selectedConversation, socketConnected]);


  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const token = getToken();
        
        if (!token || !userId) {
          setLoading(false);
          return;
        }

        const roomsResponse = await axios.get(`${backend_url}/joinRooms`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const relevantRooms = roomsResponse.data.filter((room) => 
          room.users && room.users.includes(userId)
        );

        const conversationsData = [];

        for (const room of relevantRooms) {
          try {
            if (!room.users || room.users.length < 3) continue;
            
            const productId = room.users[2];
            const productResponse = await axios.get(`${backend_url}/${productId}/product`, {
              headers: { 'Authorization': `Bearer ${token}` },
            });

            const messagesResponse = await axios.get(`${backend_url}/message/${room._id}`, {
              headers: { 'Authorization': `Bearer ${token}` },
            });

            if (messagesResponse.data.length === 0) continue;

            const lastMessage = messagesResponse.data.length > 0
              ? messagesResponse.data[messagesResponse.data.length - 1].message
              : "No messages yet";

            const isSender = room.users[0] === userId;
            const otherUserId = isSender ? room.users[1] : room.users[0];

            const userResponse = await axios.get(`${backend_url}/user/${otherUserId}`, {
              headers: { 'Authorization': `Bearer ${token}` },
            });

            const otherUserName = userResponse.data.name || (isSender ? "Recipient" : "Sender");
            const otherUserAvatar = userResponse.data.profileImage || "https://via.placeholder.com/40";

            conversationsData.push({
              roomId: room._id,
              product: productResponse.data.product,
              lastMessage,
              otherUserId,
              otherUserName,
              otherUserAvatar,
              timestamp: room.updatedAt || room.createdAt,
              unread: 0,
            });
          } catch (error) {
            console.error("Error fetching details for room:", room._id, error);
          }
        }

        conversationsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setConversations(conversationsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchConversations();
    }
  }, [backend_url, userId]);

  const selectConversation = async (conversation) => {
    setSelectedConversation(conversation);
    
    try {
      const token = getToken();
    
      const messagesResponse = await axios.get(`${backend_url}/message/${conversation.roomId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
  
      const formattedMessages = messagesResponse.data.map((msg) => ({
        message: msg.message,
        sender: msg.senderId === userId ? 'self' : 'other',
        timestamp: msg.createdAt,
      }));
  
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  
  const navigateToProduct = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedConversation || !userId) return;

    const messageData = {
      text: inputMessage,
      sender: 'self',
    };

    const timestamp = new Date().toISOString();
    
    setMessages((prev) => [...prev, { message: inputMessage, sender: 'self', timestamp }]);
    setInputMessage("");

    setConversations((prev) => {
      const updatedConversations = [...prev];
      const convoIndex = updatedConversations.findIndex(
        (conv) => conv.roomId === selectedConversation.roomId
      );
      if (convoIndex !== -1) {
        updatedConversations[convoIndex] = {
          ...updatedConversations[convoIndex],
          lastMessage: inputMessage,
          timestamp,
        };
        updatedConversations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      }
      return updatedConversations;
    });

    if (socketRef.current && socketConnected) {
      socketRef.current.emit("send_message", {
        joinRoomId: selectedConversation.roomId,
        message: messageData,
        senderId: userId,
      });
    } else {
      console.error("Socket not connected, cannot send message in real-time");
    }


    try {
      const token = getToken();
      await axios.post(`${backend_url}/message`, {
        senderId: userId,
        receiverId: selectedConversation.otherUserId,
        message: inputMessage,
        roomId: selectedConversation.roomId,
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatRelativeTime = (timestamp) => {
    if (!timestamp) return "";

    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffTime = Math.abs(now - messageTime);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return messageTime.toLocaleDateString([], { weekday: 'short' });
    } else {
      return messageTime.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };


  if (loading) {
    return (
      <>
        <Header />
        <div className="messages-container">
          <div className="conversation-list">
            <h2 className="conversations-title">Conversations</h2>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <div key={i} className="conversation-item-skeleton">
                <Skeleton 
                  variant="circular" 
                  width={40} 
                  height={40} 
                  sx={{ bgcolor: 'rgba(0, 0, 0, 0.08)' }}
                />
                <div className="conversation-details">
                  <Skeleton variant="text" width={120} height={20} sx={{ bgcolor: 'rgba(0, 0, 0, 0.08)' }} />
                  <Skeleton variant="text" width={180} height={16} sx={{ bgcolor: 'rgba(0, 0, 0, 0.08)' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="message-area">
            <div className="message-header">
              <Skeleton variant="text" width={200} height={28} sx={{ bgcolor: 'rgba(0, 0, 0, 0.08)' }} />
            </div>
            <div className="messages-display">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                <div key={i} className={`message-group ${i % 2 === 0 ? 'self' : 'other'}`}>
                  <div className="message-content-wrapper">
                    <div className={`message-bubble-skeleton ${i % 2 === 0 ? 'self' : 'other'}`}>
                      <Skeleton
                        variant="rectangular"
                        width={i % 2 === 0 ? 180 : 140}
                        height={30}
                        sx={{
                          bgcolor: i % 2 === 0 ? 'rgba(26, 115, 232, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                          borderRadius: '16px',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="message-input-area">
              <Skeleton variant="rectangular" width="100%" height={40} sx={{ bgcolor: 'rgba(0, 0, 0, 0.08)', borderRadius: '24px' }} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="messages-container">
        <div className="conversation-list">
          <h2 className="conversations-title">Conversations</h2>
          {conversations.length === 0 ? (
            <div className="no-conversations">
              <p>No conversations found</p>
              <p className="empty-state-message">Messages related to your products will appear here</p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.roomId}
                className={`conversation-item ${selectedConversation?.roomId === conversation.roomId ? 'active' : ''}`}
                onClick={() => selectConversation(conversation)}
              >
                <div className="conversation-avatar">
                  <img
                    src={conversation.product.image || "https://via.placeholder.com/40"}
                    alt="Product"
                    className="product-thumbnail"
                  />
                </div>
                <div className="conversation-details">
                  <div className="conversation-header">
                    <h3 className="conversation-name">{conversation.otherUserName}</h3>
                    <span className="conversation-time">
                      {formatRelativeTime(conversation.timestamp)}
                    </span>
                  </div>
                  <div className="conversation-preview">
                    <p className="product-name">{conversation.product.name}</p>
                    <p className="last-message">{conversation.lastMessage.substring(0, 30)}
                      {conversation.lastMessage.length > 30 ? '...' : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="message-area">
          {!selectedConversation ? (
            <div className="no-conversation-selected">
              <div className="empty-state-icon">💬</div>
              <h3>Select a conversation to start messaging</h3>
              <p>Chat with buyers and sellers about products</p>
            </div>
          ) : (
            <>
              <div className="message-header">
                <div className="message-header-avatar">
                  <img
                    src={selectedConversation.otherUserAvatar}
                    alt={selectedConversation.otherUserName}
                    className="header-user-avatar"
                  />
                </div>
                <div className="message-header-details">
                  <h2>{selectedConversation.otherUserName}</h2>
                  <p className="product-link" onClick={() => navigateToProduct(selectedConversation.product._id)}>
                    Product: {selectedConversation.product.name}
                  </p>
                </div>
                <div className="product-price">
                  <span>₹{selectedConversation.product.newAmount || selectedConversation.product.price}</span>
                </div>
              </div>

              <div className="messages-display">
                {messages.length === 0 ? (
                  <div className="no-messages">
                    <div className="empty-chat-icon">📩</div>
                    <p>No messages yet</p>
                    <p className="start-chat-prompt">Start the conversation about "{selectedConversation.product.name}"</p>
                  </div>
                ) : (
                  <>
                    <div className="chat-date-header">
                      <span>{new Date().toLocaleDateString([], {weekday: 'long', month: 'long', day: 'numeric'})}</span>
                    </div>
                    {messages.map((msg, index) => {
                      const isFirstMessageOrDifferentSender = index === 0 || messages[index - 1].sender !== msg.sender;

                      return (
                        <div
                          key={index}
                          className={`message-group ${msg.sender === 'self' ? 'self' : 'other'} ${isFirstMessageOrDifferentSender ? 'with-avatar' : ''}`}
                        >
                          {msg.sender === 'other' && isFirstMessageOrDifferentSender && (
                            <div className="message-avatar">
                              <img
                                src={selectedConversation.otherUserAvatar}
                                alt={selectedConversation.otherUserName}
                                className="message-user-avatar"
                              />
                            </div>
                          )}
                          <div className="message-content-wrapper">
                            {isFirstMessageOrDifferentSender && msg.sender === 'other' && (
                              <div className="message-sender-name">{selectedConversation.otherUserName}</div>
                            )}
                            <div className={`message-bubble ${msg.sender}`}>
                              <div className="message-text">{msg.message}</div>
                              <div className="message-time">
                                {msg.timestamp ? formatRelativeTime(msg.timestamp) : ''}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="message-input-area">
                {!socketConnected && (
                  <div className="connection-status-warning">
                    Connection lost. Messages will be saved but not delivered instantly.
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="message-input"
                />
                <button
                  onClick={handleSendMessage}
                  className="send-button"
                  disabled={!inputMessage.trim()}
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Messages;