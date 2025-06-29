import { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, X } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm John from College Cart. Ask me about available products.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

 
  const backend_url =  'https://ip-project-c0sb.onrender.com/api';

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
     
      const token = localStorage.getItem("token");
       console.log(token)
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }

      const response = await fetch(`http://localhost:8002/api/agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ input })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please login again.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log(data.agentRecord)
      if (data.agentRecord?.output) {
        setMessages(prev => [...prev, { text: data.agentRecord.output, sender: 'bot' }]);
      } else if (data.response) {
        setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
      } else {
        throw new Error('No response from server');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, 
        { text: `Sorry, ${error.message}`, sender: 'bot' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
     
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'hidden' : 'bg-black text-white hover:bg-gray-800'
        }`}
        aria-label="Open chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 h-96 bg-white rounded-t-xl shadow-xl flex flex-col border border-gray-300">
          <div className="bg-black text-white p-3 rounded-t-xl flex justify-between items-center">
            <h3 className="font-semibold">College Cart Assistant</h3>
          </div>

          <div className="flex-1 p-3 overflow-y-auto bg-white">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-2 max-w-[80%] p-2 rounded-lg text-sm ${
                  message.sender === 'user' 
                    ? 'ml-auto bg-black text-white rounded-br-none' 
                    : 'mr-auto bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
                }`}
              >
                {message.text}
              </div>
            ))}
          
            {isLoading && (
              <div className="mr-auto bg-gray-100 text-gray-800 p-2 rounded-lg rounded-bl-none max-w-[80%] mb-2 border border-gray-200">
                <div className="flex space-x-1 justify-start">
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t border-gray-300 bg-white flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-black text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-black text-white p-2 rounded-r-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-10 transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;