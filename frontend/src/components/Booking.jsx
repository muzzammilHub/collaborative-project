import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadSpecificAppointment } from '../actions/loadUser'
import Heading from './Heading'
import { Link } from 'react-router-dom'
import LinkIcon from '@mui/icons-material/Link'

export const Booking = () => {
    const {appointment } = useSelector((store)=>store.appointment)
    
    console.log("app", appointment)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(loadSpecificAppointment())
    }, [dispatch])

  return (
    <div>
      <Heading/>
      <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      {appointment?.appointment?.map((data, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-xl">
          <div className="flex items-center mb-4">
            <img 
              src={data.doctor.avatar} 
              alt={`${data.doctor.firstName} ${data.doctor.lastName}`}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="font-medium text-lg">{data.doctor.firstName} {data.doctor.lastName}</h2>
              <p className="text-gray-500">{data.doctor.speciality}</p>
            </div>
          </div>
          <ul className="space-y-1">
            <li className="font-semibold">{data.appointmentDate}</li>
            <li className="text-gray-600">{data.appointmentTime}</li>
            <li className="text-gray-500">{data.appointmentType}</li>
          </ul>
          <div className="mt-4 flex justify-end">
            <Link 
              to={`/lobby/${data._id}`}
              className="text-green-600 hover:text-green-800 transition duration-300 flex items-center"
            >
              <LinkIcon className="w-6 h-6 mr-1" />
              Join Lobby
            </Link>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}
