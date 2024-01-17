import { Doctor } from "../models/doctor.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const doctorRegisteration = async(req, res)=>{
    try {
        
        const { firstName, lastName, email, speciality, gender, dob, phoneNumber, clinicAddress, pinCode, state, country, educationHistory, workExperience, rating, countryCode } = req.body

        if(
            [firstName, lastName, email, speciality].some( (field) => 
            field?.trim() === ""
            )
        ){
            return res.status(400).json({
                message: "All fields are required!"
            })
        }

        const existedDoctor = await Doctor.findOne({email: email})

        if(existedDoctor){
            return res.status(401).json({
                message: "User already exist!!"
            })
        }

        const avatarLocalPath = req.file?.path 

        if(!avatarLocalPath){
            return res.status(400).json({
                message: "avatar file required"
            })
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath)

        console.log(avatar?.url)

        if(!avatar){
            return res.status(400).json({
                message: "avatar not uploaded successfully"
            })
        }

        const doctor = await Doctor.create({
            firstName,
            lastName,
            email,
            speciality,
            avatar: avatar?.url,
            gender,
            dob, 
            countryCode,
            phoneNumber, 
            clinicAddress, 
            pinCode, 
            state, 
            country, 
            educationHistory, workExperience, 
            rating
        })

        return res.status(200).json({
            doctor
        })

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

const findDoctor = async(req, res)=>{
    try {
        
        const {specialist} = req.body

        const Specialist = specialist.split(".")[0].trim()

        if(!Specialist){
            return res.status(401).json({
                message: "Specialist not found!!"
            })
        }

        console.log(Specialist)

        const matchedSpecialityDoctor = await Doctor.find({speciality: Specialist})

        if(!matchedSpecialityDoctor){
            return res.status(400).json({
                message: "Not found doctor"
            })
        }

        return res.status(200).json({
            matchedSpecialityDoctor,
        })



    } catch (error) {
        return res.status(500).json({
            error:error?.message
        })
    }
}

const getDoctorDetail = async(req, res)=>{
    try {

        const id = req.query.id

        const doctor = await Doctor.findById(id)

        if(!doctor){
            return res.status(400).json({
                message: "Something issue in fetching doctor"
            })
        }

        return res.status(200).json({
            doctor
        })
        
    } catch (error) {
       return res.status(500).json({
        error: error.message
       }) 
    }
}


export {
    doctorRegisteration,
    findDoctor,
    getDoctorDetail
}