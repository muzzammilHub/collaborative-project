import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
    password:{
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
    workExperience: [{
        type: String
    }],
    avatar:{
        type: String //cloudinary url
    },
},
{timestamps: true})

doctorSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

doctorSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

doctorSchema.methods.generateToken = function(){
    return jwt.sign({
        _id: this._id
    }, 
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.TOKEN_EXPIRY
    }
)
}

export const Doctor = mongoose.model("Doctor", doctorSchema)