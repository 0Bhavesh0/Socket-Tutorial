import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { nanoid } from 'nanoid'

const userName = nanoid(4)

function App() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io('http://localhost:3000')
    setSocket(newSocket)
   
    newSocket.on('chat', (payload) => {
      setChat((prevChat) => [...prevChat, payload])
    })
    
    return () => {
      newSocket.off('chat') 
      newSocket.disconnect() 
    }
  }, []) 


  const sendChat = (e) => {
    e.preventDefault()
    if (socket) {
      socket.emit('chat', { message, userName }) 
      setMessage('')
    }
  }

  return (
    <>
      <h1>Hello</h1>

      {chat.map((payload, index) => (
        <p key={index}>
          {payload.message}: <span>id: {payload.userName}</span>
        </p>
      ))}

      <form onSubmit={sendChat}>
        <input
          type="text"
          name="client"
          placeholder="send text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default App
