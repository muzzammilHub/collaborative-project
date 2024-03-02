import { openai } from "../utils/openai.js"
import Razorpay from "razorpay"
import crypto from "crypto"
import {User} from "../models/user.model.js"
import {Appointment} from "../models/appointment.model.js"

const diseasePrediction = async(req, res)=>{
    try {

        const {symptoms} = req.body

        console.log(symptoms)

        const gptQuery = "Act as a symptom based disease prediction." + "Symptom is: " + symptoms + ". Give only five name of disease in a comma separated like for example:  Angina pectoris, Coronary artery disease, Heart attack (Myocardial infarction), Gastroesophageal reflux disease (GERD), Pleurisy. And Also give brief description of diseases in with comma(,) separated and in new line. And suggest one doctor specialist only name not their description at the end and in new line"

        const gptResponse = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });

        return res.status(200).json({
            gptResponse
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
        });
    
        const options = req.body;

        console.log("options: ", options)
        const order = await razorpay.orders.create(options);
    
        if(!order) {
            return res.status(500).send("Error");
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

const orderValidate =  async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature)
    
        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
        console.log("sha************",sha)
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");

        console.log(digest)

        if(digest !== razorpay_signature) {
            return res.status(400).json({ msg: "Transaction is not legit!" });
        }
    
        res.status(200).json({
            msg: "success",
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
    
        });
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
        
        const {firstName, middleName, lastName, dob, gender, street, district, state, country, pinCode, healthIssue, dateSlot, timeSlot} = req.body

        const existingAppointment = await Appointment.findOne({
            user: req.user.id,
            doctor: req.query.doctor_id
        })

        console.log("*********",existingAppointment)

        if(existingAppointment){
            existingAppointment.appointment.push({
                appointmentDate: dateSlot,
                appointmentTime: timeSlot
            })

            existingAppointment.firstName = firstName
            existingAppointment.middleName = middleName || ""
            existingAppointment.lastName = lastName
            existingAppointment.dob = dob
            existingAppointment.gender = gender
            existingAppointment.street = street
            existingAppointment.district = district
            existingAppointment.pinCode = pinCode
            existingAppointment.state = state
            existingAppointment.country = country
            existingAppointment.healthIssue = healthIssue

            await existingAppointment.save()

            return res.status(200).json({
                existingAppointment
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
            appointment: [{
                appointmentDate: dateSlot,
                appointmentTime: timeSlot
            }],
            user: req.user.id,
            doctor: req.query.doctor_id
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


export { 
    diseasePrediction,
    paymentGateway,
    orderValidate,
    userRegisteration,
    userLogin,
    appointmentSchedule
 }