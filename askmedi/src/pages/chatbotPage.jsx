import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api';
import "../assets/css/chatbot/chatbot.css";
import Bot from "../assets/images/bot.png";
import { ToastContainer, toast } from 'react-toastify';

function ChatComponent() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [initials, setInitials] = useState('');
  const [conversationStarted, setConversationStarted] = useState(false);

  useEffect(() => {
    fetchUserData();
    setMessages([{ role: 'assistant', content: "Hello! I'm your virtual health assistant. Please describe your symptoms." }]);
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('users/me/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setUserData(response.data);
      const fullName = response.data.fullname;
      setInitials(getInitials(fullName));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getInitials = (fullName) => {
    const nameParts = fullName.split(' ');
    return nameParts.map(part => part.charAt(0).toUpperCase()).join('');
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    if (!conversationStarted) {
      setConversationStarted(true);
      toast.info("Click 'End Conversation' to get a summary when you're finished.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    try {
      const response = await axios.post('http://localhost:3001/chat', { message: input });
      setMessages([...newMessages, { role: 'assistant', content: response.data.reply }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const endConversation = async () => {
    const user_Id = localStorage.getItem('id');
    try {
      const response = await axios.post('http://localhost:3001/end-conversation', {
        user_Id: user_Id
      });
      console.log(user_Id);
      toast.success(response.data.message);
      setMessages([{ role: 'assistant', content: "The conversation has been ended. How can I assist you today?" }]);
      setConversationStarted(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chat-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
      />
      <h1>Home/Chatbot</h1>
      <div className="chatbot-text">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="bot-reply">
                  <div><img src={Bot} alt="Bot" className="bot-image" /></div>
                  <span className="gray-reply">{msg.content}</span>
                </div>
              )}
              {msg.role === 'user' && (
                <div className='user-reply'>
                  <div className='user-profile-pic'>{initials}</div>
                  <span className='blue-reply'>{msg.content}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="respond-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="chat-input"
          placeholder='Type your message here.....'
        />
        <div className='send-end'>
          <button onClick={endConversation} className="send">End</button>
          <button onClick={sendMessage} className="send">Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;