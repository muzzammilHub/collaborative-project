import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    countryCode:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true 
    },
    clinicAddress:{
        type: String,
        required: true 
    },
    pinCode:{
        type: Number,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    speciality:{
        type: String,
        required: true,
        trim: true
    },
    educationHistory:[{
        type: String,
        required: true
    }],
    workExperience: {
        type: String,
        required: true
    },
    avatar:{
        type: String //cloudinary url
    },
    rating: {
        type: Number
    }
},
{timestamps: true})

export const Doctor = mongoose.model("Doctor", doctorSchema)