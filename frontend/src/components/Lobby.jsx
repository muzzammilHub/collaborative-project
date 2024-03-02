import React, {useState, useEffect, useMemo, useCallback, useContext} from 'react'
import { SocketContext } from '../context/Socket'
import { useNavigate } from 'react-router-dom'


const Lobby = () => {
    const socket = useContext(SocketContext)
    const navigate = useNavigate()

    // console.log(socket)

    const [email, setEmail] = useState("")
    const [room, setRoom] = useState("")

    const handleSubmitForm = useCallback((e)=>{
        e.preventDefault()
        socket.emit("room_join", {email, room})
    },[email, room, socket])

    const handleJoinRoom = useCallback(({email, room})=>{
        console.log({
            email, room
        })

        navigate(`/room/${room}`)
        
    },[])

    useEffect(()=>{
        socket.on("room_join", handleJoinRoom)

        return ()=>{
            socket.off("room_join", handleJoinRoom)
        }
    }, [socket])

  return (
    <div>
       <h1>Lobby</h1> 
       <form
       onSubmit={handleSubmitForm}
       >
        <label htmlFor='email'>Email:</label>
        <input
        style={{display:"block"}}
        type='email'
        id='email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <label htmlFor='room'>Room:</label>
        <input
        style={{display:"block"}}
        type='text'
        id='room'
        value={room}
        onChange={(e)=>setRoom(e.target.value)}
        />
        <button
        >Join</button>
       </form>
    </div>
  )
}

export default Lobby