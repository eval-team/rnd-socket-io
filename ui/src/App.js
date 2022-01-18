import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from './Messages';
import MessageInput from './MessageInput';

import './App.css';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log(window.location.hostname);
    const newSocket = io(`http://${window.location.hostname}:3002`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  return (
    <div className="App">
      
      <header className="app-header">
        React Chat
      </header>
      <div className='chat-box-container'>
      { socket ? (
        <div className="chat-container">
          <div className='message-container-text'>
          <Messages socket={socket} />
          </div>
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
      </div>
    </div>
  );
}

export default App;