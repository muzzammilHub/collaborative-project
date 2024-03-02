import { addUser } from "../utils/userSlice";
import axios from 'axios'

export const loadUser = ()=> async(dispatch)=>{
    try {
        const {data} = await axios.get("http://127.0.0.1:4000/api/v1/doctor/all-appointment",{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("doctorToken")}`
            }
        })
        console.log(data.filteredData)
        dispatch(addUser(data.filteredData))
    } catch (error) {
        console.error(error)
    }
}

