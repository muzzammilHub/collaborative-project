import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-gray-200'>
        <div className='pl-10 pr-10'>
            <div className='flex justify-between items-center bg-blue-900 w-[94.8%] fixed'>
                <div className='p-4 text-white text-2xl font-semibold'>HealthChart</div>
                <div className='flex text-white text-lg'>
                    <Link className='mr-2' to='/features'>Feature</Link>
                    <Link className='mr-2' to='/user-register'>User</Link>
                    <Link className='mr-2' to='/doctor-register'>Doctor</Link>
                </div>
            </div>
            <div>
                <img className=' w-full object-cover shadow-2xl' src='https://img.freepik.com/free-vector/medical-healthcare-blue-color_1017-26807.jpg?w=1060&t=st=1707203578~exp=1707204178~hmac=81260c245bb825b1591ba90d2190c38c98960c34b2ac5e7ffbe52860e267b3ca'/>
            </div>
        </div>
    </div>
  )
}

export default Home