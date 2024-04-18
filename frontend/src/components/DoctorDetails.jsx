import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import ChatApp from './ChatApp'
import ChatComponent from './ChatComponent'
import AppointmentButton from './AppointmentButton'
import Map from './Map'
import SchoolIcon from '@mui/icons-material/School'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import PinDropIcon from '@mui/icons-material/PinDrop'
import Heading from './Heading'


const DoctorDetails = () => {
    const {id} = useParams()
    const [doctorDetail, setDoctorDetail] = useState({})
    const [openChat, setOpenChat] = useState(false)
    const [openAppointmentInterface, setOpenAppointmentInterface] = useState(false)

    console.log(id)

    const getDoctorDetails = async()=>{
        try {
            
            const response = await axios.post(`http://127.0.0.1:4000/api/v1/doctor/doctor-detail/?id=${id}`)

            console.log(response.data)
            
            setDoctorDetail(response.data)

        } catch (error) {
            console.log("Error: ", error)
        }
    }

    const handleOpenAppointment = ()=>{
        
    }

    useEffect(()=>{
        getDoctorDetails()
    },[])

    const {doctor} = doctorDetail

    const education = doctor?.educationHistory
    console.log(education)

    const handleClick = ()=>{
        
    }

  return (
    <div className='pl-[3rem] pr-[3rem] bg-gray-400 h-auto '>
        <Heading/>
        <div className='shadow-2xl bg-white h-auto'>
        <div className='flex  p-4'>
            <div className='mr-4 w-[50%]'>
                <img
                    src={doctor?.avatar}
                    className='h-[21.8rem] mx-auto'
                    alt='Doctor Avatar'
                />
            </div>
            <div className='w-[50%]  my-20'>
                <p className='text-4xl font-semibold text-gray-800 mb-2'>
                    {doctor?.firstName} {doctor?.lastName}
                </p>
                <p className='text-gray-600 text-lg'>{doctor?.email}</p>
                <p className='text-blue-500 font-semibold'>{doctor?.speciality}</p>
                <p className='text-yellow-500'>⭐ Rating {doctor?.rating} out of 5</p>
                <p className='text-gray-700'>Preferred Language: <span className='text-orange-500'>English, Hindi</span></p>
            </div>
        </div>
        <div className="p-4 ">
            <h2 className="text-xl font-semibold mb-4 text-center">Education <SchoolIcon className='text-blue-800'/></h2>
            <div className="flex overflow-x-auto space-x-4 justify-center items-center">
                {education?.map((degree, index) => (
                <div key={index} className="p-2 bg-white border border-gray-300 rounded-md">
                    {degree}
                </div>
                ))}
            </div>
        </div>
        <div className="p-4 relative">
            <h2 className="text-xl font-semibold mb-4 text-center">Work Experience <LocalHospitalIcon className='text-blue-800'/></h2>
            <div className='flex relative'>
                <div className='border-l-2 border-black relative left-[25rem]'></div>
                <div className="flex flex-col w-[35%] mx-auto space-y-4 relative">
                {doctor?.workExperience?.map((exp, index) => (
                    <div key={index} className="relative">
                    <div className="absolute -top-[0.1rem] left-[-3.79rem] w-4 h-4 rounded-full bg-blue-800"></div>
                    <div className="p-2 bg-white border border-gray-300 rounded-md">
                        {exp}
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
        <div>
            <h1 className="text-xl font-semibold mb-4 text-center">Clinic Location <PinDropIcon className='text-blue-800'/></h1>
            <Map/>
        </div>
        <div className='flex justify-center items-center'>
            <div
            className='m-4'
            onClick={handleClick} 
            >
                {openChat ? 
                <ChatApp 
                setOpenChat={setOpenChat}
                /> : 
                <ChatComponent
                setOpenChat={setOpenChat}
                />}
            </div>
            {!openChat && <div
            className='m-4' 
            >  
                <AppointmentButton id={id}/>
            </div>}
        </div>
        </div>
    </div>

  )
}

export default DoctorDetails