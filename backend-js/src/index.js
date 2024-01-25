import dotenv from "dotenv"
import {app,server} from "./app.js"
import { connectDB } from "./db/index.js"

dotenv.config({
    path: "./.env"
})

server.listen(5000)

connectDB()
    .then(()=>{
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server is up and running on port ${process.env.PORT || 8000}`)
        })
    })
    .catch((error)=>{
        console.log(`MongoDB connection failed: ${error}`)
    })
