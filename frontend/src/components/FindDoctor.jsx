import React, {useState} from 'react'
import Heading from './Heading'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addDoctor } from '../utils/doctorSlice'
import { useNavigate } from 'react-router-dom'

const FindDoctor = () => {
    const [speciality, setSpeciality] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = async()=>{
        const {data} = await axios.post("http://127.0.0.1:4000/api/v1/doctor/find-specialist",{speciality})
        console.log("**********", data)
        dispatch(addDoctor(data))
        navigate(`/specialist/${speciality}`)
    }
  return (
    <div>
        <Heading/>
        <div className='h-5 bg-black'></div>
        <div className=' h-[30rem] relative' style={{ backgroundImage: 'url("https://www.practostatic.com/web-assets/home/assets/images/homepage.06859593240c3efd483fe48951cfe6ff.svg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className=' absolute left-[22rem]'>
            <h1 className='text-center text-3xl pt-20 font-bold text-white'>Search Doctor and Book an Appointment</h1>
            <h1 className='font-semibold text-center mt-10 text-xl text-white'>Find and Book</h1>
            <div className=' flex justify-center'>
                
            <input
                
                className='w-[17rem] border p-3 m-0 focus:outline-none focus:border-black mt-2'
                placeholder='➤ Type Location'
            />
            <input
                onChange={(e)=>setSpeciality(e.target.value)}
                className='w-[30rem] border p-3 m-0 focus:outline-none focus:border-black mt-2'
                placeholder='⚲ Type speciality'
            />
            <button 
            onClick={handleClick}
            className='w-20 bg-pink-700 text-white h-[3.2rem] mt-[0.5rem] hover:bg-pink-400 text-xl'>Search</button>
            </div>
            </div>
        </div>
        <div className='bg-black h-[9.8rem]'></div>
    </div>
  )
}

export default FindDoctor