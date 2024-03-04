import React from 'react'
import Heading from './Heading'

const FindDoctor = () => {
  return (
    <div>
        <Heading/>
        <div className=' h-[28rem] bg-[#6BF4F9]'>
            <h1 className='text-center text-2xl pt-20 font-medium'>Search Doctor and Book an Appointment</h1>
            <div className=' flex justify-center'>
            <input
                className='border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                placeholder='Enter'
            />
            </div>
        </div>
    </div>
  )
}

export default FindDoctor