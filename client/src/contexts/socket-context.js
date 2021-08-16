import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { auth } from '../firebase'

const SocketContext = React.createContext()


export function SocketProvider({ children }) {
  const [socket, setSocket] = useState()
  const id = auth.currentUser.email

  useEffect(() => {
    const newSocket = io(
      'http://localhost:5000',
      { query: { id } }
    )
    setSocket(newSocket)

    return () => newSocket.close()
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContext