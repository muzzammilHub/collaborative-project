import {Server} from "socket.io"

const videoSocket = (server)=>{
    const io = new Server(server, {
        cors:{
            origin: "*"
        }
    })

    const socketIdToEmail = new Map()
    const EmailToSocketId = new Map()

    io.on("connection", (socket)=>{
        console.log("User connected",socket.id)

        socket.on("room_join", ({email, room})=>{
            EmailToSocketId.set(email, socket.id)
            socketIdToEmail.set(socket.id, email)
            socket.join(room)
            io.to(room).emit("user_joined", {
                email,
                id: socket.id
            })
            io.to(socket.id).emit("room_join", {
                email,
                room
            })

            socket.on("user_call", ({to, offer})=>{
                io.to(to).emit("incomming_call", {
                    from: socket.id,
                    offer
                })
            })

            socket.on("call_accepted", ({to, ans})=>{
                io.to(to).emit("call_accepted", {
                    from: socket.id,
                    ans
                })
            })

            socket.on("peer_nego_needed", ({to, offer})=>{
                io.to(to).emit("peer_nego_needed", {
                    from: socket.id,
                    offer
                })
            })

            socket.on("peer_nego_done", ({to, ans})=>{
                io.to(to).emit("peer_nego_final", {
                    from: socket.id,
                    ans
                })
            })
        })
    })
}

export {videoSocket}