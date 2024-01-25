import React from 'react'
import { Link } from 'react-router-dom'

const AppointmentButton = () => {
    
  return (
    <Link
        to={"/appointment"}
      className=" flex items-center justify-center cursor-pointer w-[8rem] h-12 rounded bg-blue-800 text-white  mx-auto"
    >
       Appointment
    </Link>
  )
}

export default AppointmentButton