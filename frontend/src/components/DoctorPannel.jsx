import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import LinkIcon from '@mui/icons-material/Link';
import Heading from './Heading';
import { useDispatch } from 'react-redux';
import { loadLoginDoctor } from '../actions/loadDoctor';
import DeleteIcon from '@mui/icons-material/Delete';

const DoctorPannel = () => {
    const dispatch = useDispatch()
    const [appointments, setAppointments] = useState({})

    const getAllAppointment = async()=>{
        try {
            
            const {data} = await axios.get("http://127.0.0.1:4000/api/v1/doctor/all-appointment",{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("doctorToken")}`
                }
            })

            console.log("data", data)

            const {filteredData} = data

            setAppointments(filteredData)

        } catch (error) {
            console.log("error: ", error)
        }
    }

    useEffect(()=>{
        getAllAppointment()
        dispatch(loadLoginDoctor())
    },[dispatch])

    const getAge = (dob)=>{
        const dobArray = dob.split("-")
        const year = dobArray[0]
        const month = dobArray[1]
        const day = dobArray[2]

        const current = new Date()

        const currentYear = current.getFullYear()
        const currentMonth = current.getMonth()+1
        const currentDay = current.getDate()

        let age = currentYear - year
        const monthDiff = currentMonth - month
        const dayDiff = currentDay - day

        if(monthDiff < 0 || monthDiff == 0 && dayDiff < 0)
            age--

        console.log(age)

        return age

    }

    const handleAppointmentDelete = async(id)=>{
        console.log("*********",id)
        const {data} = await axios.post(`http://127.0.0.1:4000/api/v1/user/delete?id=${id}`)

        console.log(data)
        getAllAppointment()
    }

  return (
    <div>
        <Heading/>
        <div className='mt-2'>
            <ul
            className="flex  p-4 mb-4 bg-slate-200 ">
            <div className='w-[14rem]'><li className=' font-bold'>Name</li></div>
            <div className='w-[5rem] mr-10 ml-10'><li className=' font-bold'>Gender</li></div>
            <div className='mr-8 ml-10'><li className=' font-bold'>Age</li></div>
            <div className='mr-[4.3rem] ml-[2.8rem]'><li className=' font-bold'>Email</li></div>
            <div className='mr-10 ml-[10rem]'><li className=' font-bold'>Appointment Date</li></div>
            <div className='mr-10 ml-10'><li className=' font-bold'>Appointment Time</li></div>
            <div className='mr-10 ml-[2.7rem]'><li className='font-bold'>Country</li></div>
            </ul>
        </div>
        <div>
            { appointments.length >=0 && appointments.map((appointment, index)=>(
                
                <ul key={index} className='flex p-4'>
                    <li className='w-[10rem]'>{appointment.firstName} {appointment.lastName}</li>
                    <li className='w-[5rem] ml-[7rem]'>{appointment.gender}</li>
                    <li className='w-[3rem] ml-[4.5rem]'>{getAge(appointment.dob.split("T")[0])}</li>
                    <li className='w-[15rem] ml-[3.5rem]'>{appointment.user?.email}</li>
                    <li className='w-[6rem] ml-[2rem]'>{appointment.appointmentDate}</li>
                    <li className='w-[6rem] ml-[8rem]'>{appointment.appointmentTime}</li>
                    <li className='w-[5rem] ml-[8rem]'>{appointment.country}</li>
                    <Link to={`/doctor-appointment/${appointment._id}`}><LinkIcon className='text-green-600'/></Link>
                    <button
                    onClick={()=>handleAppointmentDelete(appointment._id)} 
                    className=' ml-6'>
                        <DeleteIcon className='text-red-600'/>
                    </button>
                </ul>
            ))
        }
        </div>
    </div>
  )
}

export default DoctorPannel