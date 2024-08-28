// import {Server} from "socket.io"

// const videoSocket = (server)=>{
//     const io = new Server(server, {
//         cors:{
//             origin: "*"
//         }
//     })

//     const socketIdToEmail = new Map()
//     const EmailToSocketId = new Map()

//     io.on("connection", (socket)=>{
//         console.log("User connected",socket.id)

//         socket.on("room_join", ({email, room})=>{
//             EmailToSocketId.set(email, socket.id)
//             socketIdToEmail.set(socket.id, email)
//             socket.join(room)
//             io.to(room).emit("user_joined", {
//                 email,
//                 id: socket.id
//             })
//             io.to(socket.id).emit("room_join", {
//                 email,
//                 room
//             })

//             socket.on("user_call", ({to, offer})=>{
//                 io.to(to).emit("incomming_call", {
//                     from: socket.id,
//                     offer
//                 })
//             })

//             socket.on("call_accepted", ({to, ans})=>{
//                 io.to(to).emit("call_accepted", {
//                     from: socket.id,
//                     ans
//                 })
//             })

//             socket.on("peer_nego_needed", ({to, offer})=>{
//                 io.to(to).emit("peer_nego_needed", {
//                     from: socket.id,
//                     offer
//                 })
//             })

//             socket.on("peer_nego_done", ({to, ans})=>{
//                 io.to(to).emit("peer_nego_final", {
//                     from: socket.id,
//                     ans
//                 })
//             })

           
//         })
//     })
// }

// export {videoSocket}



import { Server } from "socket.io"

const videoSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    })

    const socketIdToEmail = new Map()
    const emailToSocketId = new Map()

    io.on("connection", (socket) => {
        console.log("User connected", socket.id)

        socket.on("room_join", ({ email, room }) => {
            emailToSocketId.set(email, socket.id)
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
        })

        socket.on("user_call", ({ to, offer }) => {
            io.to(to).emit("incomming_call", {
                from: socket.id,
                offer
            })
        })

        socket.on("call_accepted", ({ to, ans }) => {
            io.to(to).emit("call_accepted", {
                from: socket.id,
                ans
            })
        })

        socket.on("peer_nego_needed", ({ to, offer }) => {
            io.to(to).emit("peer_nego_needed", {
                from: socket.id,
                offer
            })
        })

        socket.on("peer_nego_done", ({ to, ans }) => {
            io.to(to).emit("peer_nego_final", {
                from: socket.id,
                ans
            })
        })

        socket.on("cancel_call", ({ to }) => {
            io.to(to).emit("call_canceled") // Emit the cancel event to the remote user
            io.to(socket.id).emit("call_canceled") // Optionally emit to the caller as well
        })

        socket.on("disconnect", () => {
            const email = socketIdToEmail.get(socket.id)
            emailToSocketId.delete(email)
            socketIdToEmail.delete(socket.id)
            console.log("User disconnected", socket.id)
        })
    })
}

export{
    videoSocket
}
