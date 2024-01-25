import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import PaymentGateway from './PaymentGateway'

const DoctorDetails = () => {
    const {id} = useParams()
    const [doctorDetail, setDoctorDetail] = useState({})

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

    useEffect(()=>{
        getDoctorDetails()
    },[])

    const {doctor} = doctorDetail

  return (
    <div>
        <div className='flex border p-4 rounded-md shadow-md bg-white'>
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
    <div>
        <PaymentGateway/>
    </div>
    </div>
  )
}

export default DoctorDetails