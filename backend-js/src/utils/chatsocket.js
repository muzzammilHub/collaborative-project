import {Server} from "socket.io"

const chatSocket = (server)=>{
    const io = new Server(server, {
        cors:{
            origin: process.env.CORS_ORIGIN,
            credentials: true
        }
    })

    io.on("connection", (socket)=>{
        console.log("User connected",socket.id)
        
        

        socket.on("message", ({message, room})=>{
            console.log(message)
            io.to(room).emit('receive-message', {
                message: message,
                sender: socket.id,
              });
        })
    
        socket.on("disconnect", ()=>{
            console.log("User disconnected", socket.id)
        })
    })
}

export { chatSocket }