import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../assets/css/chatbot/chatbot.css"; 
import Bot from "../assets/images/bot.png";
import { ToastContainer, toast } from 'react-toastify';

function ChatComponent() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    setMessages([{ role: 'assistant', content: "Hello! I'm your virtual health assistant. Please describe your symptoms." }]);
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

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
      console.log(user_Id)
      toast.success(response.data.message); 
      setMessages([{ role: 'assistant', content: "The conversation has been ended. How can I assist you today?" }]); // Reset messages
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chat-container"> 
     <ToastContainer
         position="top-center"
         autoClose={2000}
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
                  <div className='user-profile-pic'>You</div>
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
        <button onClick={endConversation} className="send">End</button>
        <button onClick={sendMessage} className="send">Send</button>
      </div>
    </div>
  );
}

export default ChatComponent;





