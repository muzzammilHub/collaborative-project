import { addDoctor } from "../utils/doctorSlice";
import { addAppointment } from "../utils/appointmentSlice";
import axios from 'axios'

export const loadDoctor = ()=> async(dispatch)=>{
    try {
        const {data} = await axios.get("http://127.0.0.1:4000/api/v1/user/alldoctor",{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("userToken")}`
            }
        })
        console.log(data)
        dispatch(addDoctor(data))
    } catch (error) {
        console.error(error)
    }
}

export const loadAppointment = (doctorId)=> async(dispatch)=>{
    try {
        console.log(doctorId)
        const {data} = await axios.get(`http://127.0.0.1:4000/api/v1/user/all-appointment?id=${doctorId}`)
        console.log(data.filteredData)
        dispatch(addAppointment(data.filteredData))
    } catch (error) {
        console.error(error)
    }
}

export const loadSpecialist = (speciality)=> async(dispatch)=>{
    try {
        console.log(speciality)
        const {data} = await axios.post("http://127.0.0.1:4000/api/v1/doctor/find-specialist",{speciality})
        console.log("&&&&&&&&",data)
        dispatch(addDoctor(data))
    } catch (error) {
        console.error(error)
    }
}

export const loadLoginDoctor = ()=> async(dispatch)=>{
    try {
        const {data} = await axios.get("http://127.0.0.1:4000/api/v1/doctor/get-doctor",{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("doctorToken")}`
            }
        })
        console.log("&&&&&&&&",data)
        dispatch(addDoctor(data))
    } catch (error) {
        console.error(error)
    }
}



