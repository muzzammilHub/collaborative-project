import jwt from "jsonwebtoken"
import { Doctor } from "../models/doctor.model.js"

const isAuthenticated = async (req, res, next)=>{

    try {
        
        const token = req.cookies?.doctorToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log("***********",token)

        if(!token){
            return res.status(401).json({
                message: 'Please login first'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.doctor = await Doctor.findById(decoded._id)

        next()

    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token",
            error: error
        })
    }
}

export {isAuthenticated}