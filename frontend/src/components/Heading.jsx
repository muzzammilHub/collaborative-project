import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadLoginUser } from '../actions/loadUser'
import axios from "axios"
import { removeUser } from '../utils/userSlice'
import { removeDoctor } from '../utils/doctorSlice'
import { loadLoginDoctor } from '../actions/loadDoctor'

const Heading = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((store)=>store.user)
    const loginDoctor = useSelector((store)=>store.doctor)
    

    

    const handleClick = ()=>{
    console.log(window.location.pathname)
  }
  const handleLogOutUser = async()=>{
    console.log(localStorage.getItem("userToken"))
    const {data} = await axios.get("http://127.0.0.1:4000/api/v1/user/logout",{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        }
    })

     if(data.success){
        console.log("success*****")
        localStorage.removeItem('userToken')
        dispatch(removeUser())
        navigate("/")
      }
  }

  const handleLogOutDoctor = async()=>{
    const {data} = await axios.get("http://127.0.0.1:4000/api/v1/doctor/logout",{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("doctorToken")}`
        }
    })

    if(data.success){
        console.log("success*****")
        localStorage.removeItem('doctorToken')
        dispatch(removeDoctor())
        navigate("/")
      }
  }

  React.useEffect(()=>{
    dispatch(loadLoginUser())
    dispatch(loadLoginDoctor())
  },[dispatch])
  return (
    <div className={`flex ${!localStorage.getItem("doctorToken") ? 'justify-around' : 'justify-between'} item-center bg-blue-900 text-white`}>
        <div className='m-5'>
            <Link className='mr-2 text-2xl font-semibold' to='/'>HealthChartMD</Link>
        </div>
        {!localStorage.getItem("doctorToken") && <div className='flex m-5'>
            <Link
             onClick={handleClick}
             className={`mr-2 h-6 w-[5.4rem] rounded ${window.location.pathname === '/find-doctor' ? ' underline ' : 'hover:text-red-500'}`} to='/find-doctor'>Find Doctor</Link>
            <Link className={`mr-2 h-6 w-[7.8rem] rounded ${window.location.pathname === '/video-consultant' ? 'underline ' : 'hover:text-red-500'}`} to='/video-consultant'>Video Consultant</Link>
            <Link className={`mr-2 h-6 w-[5.3rem] rounded ${window.location.pathname === '/health-blog' ? ' underline ' : 'hover:text-red-500'}`} to='/health-blog'>Health Blog</Link>
            <Link className={`mr-2 h-6 w-[9.5rem] rounded ${window.location.pathname === '/predict-disease' ? 'hover:text-red-500 underline ' : 'hover:text-red-500'}`} to='/predict-disease'>AI Disease Prediction</Link>
        </div>}
        {!localStorage.getItem("userToken") && !localStorage.getItem("doctorToken") && <div className='flex m-5'>
            <Link className='mr-2' to='/user-register'>User</Link>
            <Link className='mr-2' to='/doctor-register'>Doctor</Link>
        </div>}
        {
            localStorage.getItem("userToken") && user  && <div className='flex items-center'>
                {user && <p className=' text-white mr-2'>{user?.user?.loginUser?.firstName} {user?.user?.loginUser?.lastName}</p>}
                <button 
                    onClick={handleLogOutUser}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:shadow-outline">
                    Logout
                </button>
            </div>
        }
        {
           loginDoctor && localStorage.getItem("doctorToken") && <div className='flex items-center'>
            <Link className={`mr-2 h-6  rounded ${window.location.pathname === '/health-blog' ? 'underline ' : 'hover:text-red-500'}`} to='/health-blog'>Health Blog</Link>
            <Link className={`mr-2 h-6  rounded ${window.location.pathname === '/appointment-pannel' ? 'underline ' : 'hover:text-red-500'}`} to='/appointment-pannel'>Appointment Pannel</Link>
            {loginDoctor && <p className=' text-white mr-2'>{loginDoctor?.doctor?.doctor?.firstName} {loginDoctor?.doctor?.doctor?.lastName}</p>}
            <button 
                onClick={handleLogOutDoctor}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:shadow-outline mr-6">
                Logout
            </button>
        </div>
        }
    </div>
  )
}

export default Heading