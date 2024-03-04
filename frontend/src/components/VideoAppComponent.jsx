import React from 'react'
import Heading from './Heading'
import { Link } from 'react-router-dom'

const VideoAppComponent = () => {
  return (
    <div>
      <Heading/>
      <div className=' bg-[#ffe6d0] h-[30rem] flex'>
        <div className='w-[50%] mt-28 ml-20'>
          <h1 className=' font-semibold text-[3rem]'>Skip the travel!</h1>
          <h1 className=' font-semibold text-3xl'>Take Online Doctor Consultation</h1>
          <p className='mt-4 text-xl'> Private consultation +<span>Video Call</span></p>
          <div className=' mt-10'>
            <Link 
              className='px-4 py-2 bg-pink-700 text-white rounded-md hover:bg-pink-400'
              to='/book-appointment'
            >
              Consult
            </Link>
          </div>
        </div>
        <div className=' w-[50%]'>
          <img 
          className='h-[80%] mt-[6.5rem]'
          src='https://digiqure.com/pages/wp-content/uploads/2023/07/whatisteli.png'/>
        </div>
      </div>
    </div>
  )
}

export default VideoAppComponent