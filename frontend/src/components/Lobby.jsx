import React, {useState, useEffect, useCallback, useContext} from 'react'
import { SocketContext } from '../context/Socket'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadLoginUser } from '../actions/loadUser'
import { loadLoginDoctor } from '../actions/loadDoctor'
import { useParams } from 'react-router-dom'


const Lobby = ({onClose}) => {
    const {id} = useParams()
    console.log("id", id)
    const socket = useContext(SocketContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const doctor = useSelector((store)=>store.doctor)
    const {user} = useSelector((store)=>store.user)
    
    console.log("************",user)

    // console.log(socket)

    const [email, setEmail] = useState("")
    const [room, setRoom] = useState(id)

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

    React.useEffect(()=>{
        dispatch(loadLoginUser())
        dispatch(loadLoginDoctor())
      },[dispatch])

  return (
    <div>
    <h1 className="text-2xl font-bold mb-4">Lobby</h1> 
    <form onSubmit={handleSubmitForm}>
        <div className="mb-4">
            <label htmlFor='email' className="block text-sm font-medium text-gray-700">Email:</label>
            <input
                disabled
                type='email'
                id='email'
                value={localStorage.getItem("doctorToken") ? doctor?.doctor?.doctor?.email : user?.loginUser?.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
        <div className="mb-4">
            <label htmlFor='room' className="block text-sm font-medium text-gray-700">Room:</label>
            <input
                type='text'
                disabled
                id='room'
                placeholder='123'
                value={id}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
        <div className="flex justify-between items-center">
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                Join
            </button>
            <button
                onClick={onClose}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">
                Close
            </button>
        </div>
    </form>
</div>
  )
}

export default Lobby