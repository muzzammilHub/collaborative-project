import React from 'react'
import { Link } from 'react-router-dom'

const Heading = () => {
  return (
    <div className='flex justify-around justify-center bg-blue-900 text-white'>
        <div className='m-5'>
            <Link className='mr-2 text-2xl' to='/'>Health Chart</Link>
        </div>
        <div className='flex m-5'>
            <Link className='mr-2' to='/find-doctor'>Find Doctor</Link>
            <Link className='mr-2' to='/video-consultant'>Video Consultant</Link>
            <Link className='mr-2' to='/articles'>Health Blog</Link>
        </div>
        <div className='flex m-5'>
            <Link className='mr-2' to='/user-register'>User</Link>
            <Link className='mr-2' to='/doctor-register'>Doctor</Link>
        </div>
    </div>
  )
}

export default Heading