// import { openai } from "../utils/openai.js"
import { genAI } from "../utils/geminiai.js"
import Razorpay from "razorpay"
import crypto from "crypto"
import {User} from "../models/user.model.js"
import {Appointment} from "../models/appointment.model.js"
import { instance } from "../index.js"
import { Feedback } from "../models/feedback.model.js"
import { Doctor } from "../models/doctor.model.js"


const diseasePrediction = async(req, res)=>{
    try {

        const {symptoms} = req.body

        console.log(symptoms)

        const gptQuery = `Give brief description about disease ${symptoms}`

        // const gptResponse = await openai.chat.completions.create({
        //     messages: [{ role: 'user', content: gptQuery }],
        //     model: 'gpt-3.5-turbo',
        // })

        const model = genAI.getGenerativeModel({ model: "gemini-pro"})
      
        const result = await model.generateContent(gptQuery)
        const response = await result.response
        const text = response.text()
        console.log(text)

        return res.status(200).json({
            text
        })
        
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

const paymentGateway = async(req, res)=>{
    try {
        const razorpay = new Razorpay({

            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        })
    
        const options = req.body

        console.log("options: ", options)
        const order = await razorpay.orders.create(options)
    
        if(!order) {
            return res.status(500).send("Error")
        }
    
        
            res.status(200).json({
                order
            })

        
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

const checkout = async(req, res)=>{
    try {
        const options = {
            amount : Number(req.body.amount)*100,
            currency: "INR"
        }
    
        const order = await instance.orders.create(options)
    
        console.log(order)
        return res.status(200).json({
            order
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

const paymentVerification = async(req, res)=>{
    try {
        const doctor_id = req.query.id
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        const body = razorpay_order_id + "|" + razorpay_payment_id
        
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                        .update(body.toString())
                                        .digest("hex")

        const isAuthentic = expectedSignature === razorpay_signature
        if(isAuthentic){
            res.redirect(
                `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}&doctor_id=${doctor_id}`
            )
        }
        else{
            return res.status(400).json({
                success: false
            })
        }
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

const orderValidate =  async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        const body = razorpay_order_id + "|" + razorpay_payment_id
        
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                        .update(body.toString())
                                        .digest("hex")
        
        res.status(200).json({
            msg: "success",
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
    
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

const userRegisteration = async(req, res)=>{
    try {

        const {firstName, lastName, email, password, gender, dob} = req.body

        if(
            [firstName, lastName, email, password, gender, dob].some( (field) => 
            field?.trim() === ""
            )
        ){
            return res.status(400).json({
                message: "All fields are required!"
            })
        }

        const isExistedUser = await User.findOne({email:email})

        if(isExistedUser){
            return res.status(401).json({
                message: "user already exist!!"
            })
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            dob,
            gender
        })

        if(!user){
            return res.status(400).json({
                message: "something issue in creating user"
            })
        }

        return res.status(200).json({
            user
        })

    } catch (error) {

        return res.status(500).json({
            error
        })
    }
}
 

const userLogin = async(req, res)=>{
    try {

        const {email, password} = req.body

        if(!email && !password){
            return res.status(400).json({
                message: "email and password is required"
            })
        }

        const existingUser = await User.findOne({email: email})
        console.log(existingUser)
        if(!existingUser){
            return res.status(401).json({
                message: "User not existed"
            })
        }
        const isPasswordCorrect = await existingUser.isPasswordCorrect(password)

        if(!isPasswordCorrect){
            return res.status(400).json({
                message: "Password not matched!!"
            })
        }
        const userToken = existingUser.generateToken()

        const options = {
            httpOnly: true,
            secure: true
        }
        return res
        .status(200)
        .cookie("userToken", userToken, options)
        .json({
            existingUser,
            userToken
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error
        })
    }
}

const appointmentSchedule = async(req, res)=>{
    try {
        console.log(req.user.id)
        console.log(req.query.doctor_id)
        // console.log(req.body)
        
        const {firstName, middleName, lastName, dob, gender, street, district, state, country, pinCode, healthIssue, dateSlot, timeSlot, appointmentType, contactNumber} = req.body

        const existingAppointment = await Appointment.findOne({
            user: req.user.id,
            doctor: req.query.doctor_id
        })

        console.log("*********",existingAppointment)

        if(existingAppointment){
            

            return res.status(400).json({
                message: "appointment already registered"
            })
        }

        const newAppointment = await Appointment.create({
            firstName,
            middleName: middleName || "",
            lastName,
            gender,
            dob,
            street,
            district,
            pinCode,
            state,
            country,
            healthIssue,
            appointmentDate: dateSlot,
            appointmentTime: timeSlot,
            user: req.user.id,
            doctor: req.query.doctor_id,
            appointmentType,
            contactNumber
        })

        if(!newAppointment){
            return res.status(400).json({
                message: "Issue in creating appointment"
            })
        }

        return res.status(200).json({
            newAppointment
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error
        })
    }
}

const updateAppointment = async(req, res)=>{
    try {
        
        console.log("**********",req.user.id)
        console.log("**************",req.query.doctor_id)

        const { referenceNumber } = req.body
        console.log("******************", referenceNumber)

        
        const existingAppointment = await Appointment.findOne({
            user: req.user.id,
            doctor: req.query.doctor_id
        })
        let appointment
        if(existingAppointment){
            appointment = await existingAppointment.updateOne({
                paymentId: referenceNumber
            })
        }else{
            return res
                .status(403)
                .json({
                    message: "Appointment not found!!"
                })
        }

        return res
            .status(200)
            .json({
                appointment
            })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error
        })
    }
}

const getLoginUser = async(req, res)=>{
    try {

        const userId = req.user.id

        if(!userId){ return res.status(401).json({
            message: "User id not exists!!"
            })
        }

        const loginUser = await User.findById(userId)

        if(!loginUser){
            return res.status(401).json({
                message: "User is not found!!"
            })
        }

        return res.status(200).json({
            loginUser
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

const logoutUser = async(req, res)=>{
    try {


        return res.status(200).cookie("userToken",null, {
                    expires: new Date(Date.now()), 
                    httpOnly: true
                }).json({
                    success: true,
                    message: "successfully logout"
                })
        
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

const getSpecificUser = async(req, res)=>{
    try {
        const id = req.query.id
        const user = await Appointment
                            .findById(id)
                            .populate("user")
                            .select("-password")

        if(!user){
            return res.status(400).json({
                message: "User not found!!"
            })
        }

        return res.status(200).json({
            user
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

const deleteAppointment = async(req, res)=>{
    try {
        
        const id = req.query.id
        const deleteAppointment = await Appointment.deleteOne({_id:id})

        console.log(deleteAppointment)

        return res.status(200).json({
            message: "delete successfully"
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

const specificAppointment = async(req, res)=>{
    try {
        const user_id = req.user._id

        const appointment = await Appointment.find({
            user: user_id
        }).populate("doctor")

        return res.status(200).json({
            appointment
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

const submitFeedback = async (req, res) => {
    const { doctorId } = req.params
    const { rating, feedback } = req.body

    console.log("****************", doctorId, rating, feedback)

    try {
        const doctor = await Doctor.findById(doctorId)
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' })
        }

        // Create a new feedback entry
        const newFeedback = new Feedback({
            user: req.user._id,
            doctor: doctorId,
            rating,
            feedback,
        })

        // Save the feedback to the database
        await newFeedback.save()

        // Respond with a success message
        res.status(201).json({ message: 'Feedback saved successfully' })
    } catch (error) {
        console.error('Error saving feedback:', error)
        res.status(500).json({ message: 'Server error, could not save feedback' })
    }
}




export { 
    checkout,
    paymentVerification,
    diseasePrediction,
    paymentGateway,
    orderValidate,
    userRegisteration,
    userLogin,
    appointmentSchedule,
    getLoginUser,
    logoutUser,
    getSpecificUser,
    deleteAppointment,
    updateAppointment,
    specificAppointment,
    submitFeedback
 }