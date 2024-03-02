import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { MenuItem, Select, InputLabel } from '@mui/material'
import axios from "axios"

const appointmentTime = ["10:00-10:20", "10:40-11:00", "11:20-11:40", "12:00-12:20", "12:40-1:00", "15:00-15:20", "15:40-16:00", "16:20-16:40", "17:20-18:00"]

const Step3 = ({ formData, setFormData, prevStep }) => {
    const {id} = useParams()
    console.log(formData)
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const numberOfDaysToShow = 7
    const [availableDates, setAvailableDates] = useState([]);
  
    useEffect(() => {
      const currentDate = new Date();
      const availableDatesArray = [];
  
      for (let i = 0; i < numberOfDaysToShow; i++) {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + i);
  
        const formattedDate = nextDate.toISOString().split('T')[0];
        availableDatesArray.push(formattedDate);
      }
  
      setAvailableDates(availableDatesArray);
    }, [numberOfDaysToShow]);

    const handleSubmit = async(e)=>{
      e.preventDefault()

      try {

        const {data} = await axios.post(`http://127.0.0.1:4000/api/v1/user/appointment?doctor_id=${id}`, formData,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
              }
        })

        console.log(data)
        
      } catch (error) {
        console.log(error)
      }
    }
  
    return (
        <div>
        <div className='w-[60rem] flex justify-center items-center mt-[10rem] pt-5 pb-5 pr-5 pl-4 bg-gray-300 mx-auto'>  
       <h2 className="w-[30rem] text-4xl mr-[1rem] text-center text-blue-800">Write about your current health issue.</h2>
       <form 
       className="space-y-4 w-[30rem]"
       onSubmit={handleSubmit}
       >
         <div>
            <label htmlFor="healthIssue" className="block text-sm font-medium text-gray-600 mb-2">Brief Description of Health Issue:</label>
            <textarea
            id="healthIssue"
            name="healthIssue"
            rows="4" 
            value={formData.healthIssue || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 transition duration-150 bg-gray-300 resize-none"
            ></textarea>
            <p className="mt-2 text-sm text-gray-500">Provide a brief description of your health issue.</p> 
         </div>
         <div>
         <InputLabel id="demo-simple-select-label">Available Dates</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.dateSlot || ''}
            name="dateSlot"
            onChange={handleChange}
            className="form-input mt-1 block w-full"
        >
            {
              availableDates.map((date, index)=>(
                <MenuItem key={index} value={date}>{date}</MenuItem>
              ))
            }
            </Select>
         </div>
        
         <div>
         <InputLabel id="demo-simple-select-label">Available Time Slot</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.timeSlot || ''}
            name="timeSlot"
            onChange={handleChange}
            className="form-input mt-1 block w-full"
        >
            {
              appointmentTime.map((time, index)=>(
                <MenuItem key={index} value={time}>{time}</MenuItem>
              ))
            }
            </Select>
         </div>
         <div className='flex justify-between'>
            <button
             type="button"
             onClick={prevStep}
             className=" bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600"
           >
             back to prev
           </button>
           <button
             type="submit"
             className=" bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600"
           >
             Submit
           </button>
         </div>
       </form>
       </div> 
     </div>
    );
  }

  export default Step3