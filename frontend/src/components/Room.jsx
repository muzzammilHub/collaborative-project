import React, { useEffect , useContext, useCallback, useState} from 'react'
import { SocketContext } from '../context/Socket'
import ReactPlayer from 'react-player'
import peer from '../service/peer'


function Room() {
    const socket = useContext(SocketContext)
    const [remoteSocketId, setRemoteSocketId] = useState("")
    const [myStream, setMyStream] = useState(null)
    const [remoteStream, setRemoteStream] = useState(null)

    const handleCallUser = useCallback(async()=>{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })

        const offer = await peer.getOffer()
        console.log("send offer",offer)
        socket.emit("user_call", {to: remoteSocketId, offer})
        setMyStream(stream)
    }, [remoteSocketId, socket])

    const handleUserJoined = useCallback(({email, id})=>{
        console.log(`User joined with email ${email} and id ${id}`)
        setRemoteSocketId(id)
    })

    const handleIncommingCall = useCallback(async({from, offer})=>{
        console.log(from, offer)
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
        setMyStream(stream)
        setRemoteSocketId(from)
        const ans = await peer.getAnswer(offer)
        socket.emit("call_accepted", {to: from, ans})
    },[socket])

    const sendStream = useCallback(()=>{
        for(const track of myStream.getTracks()){
            peer.peer.addTrack(track, myStream)
        }
    },[myStream])

    const handleCallAccepted = useCallback(({from, ans})=>{
        peer.setLocalDescription(ans)
        console.log("call accepted")
        sendStream()
    }, [sendStream])

    const handleNegotiationNeeded = useCallback(async()=>{
        const offer = await peer.getOffer()
        socket.emit("peer_nego_needed", {to: remoteSocketId, offer})
    },[remoteSocketId, socket])

    const handleNegoNeededIncoming = useCallback(async({from, offer})=>{
        const ans = await peer.getAnswer(offer)
        socket.emit("peer_nego_done", {to: from, ans})
    },[socket])

    const handleNegoFinal = useCallback(async({from, ans})=>{
        await peer.setLocalDescription(ans)
    },[])

    useEffect(()=>{
        peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded)

        return ()=>{
            peer.peer.removeEventListener("negotiationneeded", handleNegotiationNeeded)
        }
    },[handleNegotiationNeeded])

    useEffect(()=>{
        peer.peer.addEventListener("track", async(ev)=>{
            const remoteStream = ev.streams
            console.log("remoteStream", remoteStream)
            setRemoteStream(remoteStream[0])
        })
    },[])

    useEffect(()=>{
        socket.on("user_joined", handleUserJoined)
        socket.on("incomming_call", handleIncommingCall)
        socket.on("call_accepted", handleCallAccepted)
        socket.on("peer_nego_needed", handleNegoNeededIncoming)
        socket.on("peer_nego_final", handleNegoFinal)

        return ()=>{
            socket.off("user_joined", handleUserJoined)
            socket.off("incomming_call", handleIncommingCall)
            socket.off("call_accepted", handleCallAccepted)
            socket.off("peer_nego_needed", handleNegoNeededIncoming)
            socket.off("peer_nego_final", handleNegoFinal)
        }
    },[socket, handleUserJoined, handleIncommingCall, handleCallAccepted, handleNegoFinal, handleNegoNeededIncoming])
  return (
    <div>
        {remoteSocketId ? <h1>Connected</h1> : <h1>Room</h1>}
        {remoteSocketId && <button
        onClick={handleCallUser}
        >Call</button>}
        {remoteSocketId && <button
        onClick={sendStream}>Send Stream
            </button>}
        
        {myStream &&
        <><h1>My Stream</h1>
        <ReactPlayer playing muted url={myStream} width='30%'
          height='30%'/>
          </> }
        {
            remoteStream && 
            <><h1>Remote Stream</h1>
            <ReactPlayer playing muted url={remoteStream} width='30%'
            height='30%'/>
            </>
        }
    </div>
  )
}

export default Room