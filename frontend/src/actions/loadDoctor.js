import { addDoctor } from "../utils/doctorSlice";
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

