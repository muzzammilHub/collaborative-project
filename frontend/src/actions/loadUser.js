import { addAppointment } from "../utils/appointmentSlice";
import { addUser } from "../utils/userSlice";
import axios from 'axios'

export const loadLoginUser = ()=> async(dispatch)=>{
    try {
        const {data} = await axios.get("http://127.0.0.1:4000/api/v1/user/user",{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("userToken")}`
            }
        })
        console.log("********",data)
        dispatch(addUser(data))
    } catch (error) {
        console.error(error)
    }
}

export const loadUser = (user_id)=> async(dispatch)=>{
    try {
        const {data} = await axios.post(`http://127.0.0.1:4000/api/v1/user/specific-user?id=${user_id}`)
        console.log("********",data)
        dispatch(addAppointment(data))
    } catch (error) {
        console.error(error)
    }
}

