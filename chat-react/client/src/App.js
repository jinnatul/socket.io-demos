import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './App.css';

const socket = io.connect('http://localhost:4000')

function App() {

  const [state, setstate] = useState({ name: '', message: '' })
  const [chats, setChats] = useState([]);
  
  useEffect(() => {
    socket.on('chat message', ({ name, message }) => {
      setChats([...chats, { name, message }])
    })
  })

  const onTextChange = (e) => {
    setstate({ ...state, [e.target.name]: [e.target.value] });
  }

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    if (!name || !message) {
      console.log('problem')
    } else {
      socket.emit('chat message', { name, message });
      setstate({ name, message: '' })
    }
  }

  const renderChats = () => {
    return chats.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  }

  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Message</h1>
        <div className="name-field">
          <TextField 
            name="name" 
            onChange={e => onTextChange(e)}
            value={state.name}
            variant="outlined"
            label="Name" 
          />
        </div>
        <div>
          <TextField 
            name="message" 
            onChange={e => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message" 
          />
        </div>
        <button color="primary">Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChats()}
      </div>
    </div>
  );
}

export default App;
