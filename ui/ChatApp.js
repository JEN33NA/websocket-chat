import React, { useState, useEffect } from 'react';
import './ChatApp.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  // Connect to WebSocket server
  useEffect(() => {
    const ws = new WebSocket('http://localhost:8080/chat');  // WebSocket endpoint
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };
    ws.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    setSocket(ws);

    return () => {
      ws.close();  // Close the WebSocket connection when the component unmounts
    };
  }, []);

  const sendMessage = () => {
    if (socket && newMessage.trim()) {
      socket.send(newMessage);  // Send the message to the server
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h1>WebSocket Chat</h1>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">{msg}</div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
