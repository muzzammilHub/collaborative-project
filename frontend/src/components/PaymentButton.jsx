import React, {useState} from 'react'
import PaymentGateway from './PaymentGateway'
import { Link } from 'react-router-dom'

const PaymentButton = ({appointmentType}) => {
   
  return (
    <div className='mt-2'>
        <button
        onClick={handleClick}
        className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >Pay ₹{appointmentType}</button>
        
    </div>
  )
}

export default PaymentButton