import React from 'react'
import {Link} from "react-router-dom"

const Feature = () => {
  return (
    <div className=''>
        <div className='pl-10 pr-10'>
            <div className='flex justify-between items-center bg-blue-900 '>
                <div className='p-4 text-white text-2xl font-semibold'><Link to="/">HealthChart</Link></div>
                <div className='flex text-white text-lg'>
                    <Link className='mr-2' to='/features'>Feature</Link>
                    <Link className='mr-2' to='/user-register'>User</Link>
                    <Link className='mr-2' to='/doctor-register'>Doctor</Link>
                </div>
            </div>
            <div className='h-screen'>
              <div className='bg-gradient-to-b from-sky-300 to-red-300 h-screen'>
                <h1 className='text-3xl text-center pt-10 font-bold text-gray-600'>What you can do with <span className=''>HealthChart</span></h1>
                <div className='flex justify-center mt-[5rem]'>
                  <div className=' pr-8'>
                    <img className='h-[5rem] text-center pl-[3rem]' src='https://cdn-icons-png.flaticon.com/512/4319/4319308.png'/>
                    <p>Schedule & Appointment</p>
                  </div>
                  <div className='pl-[2rem] pr-[2rem]'>
                    <img className='h-[5rem] pl-[0.5rem]' src='https://icons.veryicon.com/png/o/miscellaneous/color-work-icon/payment-gateway.png'/>
                    <p>Pay to Doctor</p>
                  </div>
                  <div className='pl-[2rem] pr-[2rem]'>
                    <img className='h-[5rem] pl-[1.5rem]' src='https://png.pngtree.com/png-vector/20230314/ourmid/pngtree-hazard-icon-vector-png-image_6647993.png'/>
                    <p>Disease Zonal Alert</p>
                  </div>
                  <div className=' pl-8'>
                    <img className='h-[5rem] pl-[1.3rem]' src='https://cdn-icons-png.flaticon.com/512/2312/2312493.png'/>
                    <p>Discussion Forum</p>
                  </div>
                  <div className=' pl-8'>
                    <img className='h-[5rem] pl-[4.5rem] ' src='https://cdn-icons-png.flaticon.com/512/6283/6283290.png'/>
                    <p>Symptom based disease prediction</p>
                  </div>
                  <div className='pr-4 pl-4'>
                    <img className='h-[5rem]' src='https://cdn-icons-png.flaticon.com/512/7572/7572110.png'/>
                    <p>Messaging</p>
                  </div>
                  <div className='pr-4 pl-4'>
                    <img className='h-[5rem]' src='https://cdn-icons-png.flaticon.com/512/8976/8976784.png'/>
                    <p>Messaging</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Feature