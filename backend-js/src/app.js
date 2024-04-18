import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { createServer } from "http"
import {Server} from "socket.io"


const app = express()
const server = createServer(app)
const io = new Server(server)

// import chatSocket
import { chatSocket } from "./utils/chatsocket.js"
io.of('/chat').use(chatSocket(server))
// chatSocket(server)

//import videoSocket
// import { videoSocket } from "./utils/videosocket.js"
// videoSocket(server)



app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//import routes
import userRouter from "./routes/user.routes.js"
import doctorRouter from "./routes/doctor.routes.js"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/doctor", doctorRouter)
app.get("/api/getkey", (req, res)=>{
    return res.status(200).json({
        key: process.env.RAZORPAY_KEY_ID
    })
})


export {app, server}