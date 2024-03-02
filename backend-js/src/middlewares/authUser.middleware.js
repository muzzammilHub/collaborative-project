import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const isAuthenticated = async (req, res, next)=>{

    try {
        
        const token = req.cookies?.userToken || req.header("Authorization")?.replace("Bearer ", "")

        console.log("***********userToken",token)

        if(!token){
            return res.status(401).json({
                message: 'Please login first'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded._id)

        next()

    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token",
            error: error
        })
    }
}

export {isAuthenticated}