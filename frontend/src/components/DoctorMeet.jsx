import React, {useEffect, useState, useRef} from 'react'
import ChatComponent from './ChatComponent'
import ChatApp from './ChatApp'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../actions/loadUser'
import { useParams } from 'react-router-dom'
import Heading from './Heading'
import { loadLoginDoctor } from '../actions/loadDoctor'
import MedicationIcon from '@mui/icons-material/Medication'
import Loader from './Loader'
import generatePdfFromContent from '../actions/prescriptioinSend'
import DotLoader from "react-spinners/DotLoader"
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import axios from 'axios'


const DoctorMeet = () => {
    const {id} = useParams()
    const report = useRef(null)
    const dispatch = useDispatch()
    const [openChat, setOpenChat] = useState(false)
    const [preview, setPreview] = useState(false)
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState(
      `Medicine List:
      1. Medicine A - Dosage: ...
      2. Medicine B - Dosage: ...
  
      Test List:
      1. Test X
      2. Test Y
      `
    )
    

    const {appointment} = useSelector((store)=>store.appointment)
    const {doctor} = useSelector((store)=>store.doctor)

    console.log(appointment?.user?.user?.email)
 
    useEffect(()=>{
        dispatch(loadUser(id))
        dispatch(loadLoginDoctor())
    },[dispatch])

    const handleClick = ()=>{}
    const handleContentChange = (e) => {
      setContent(e.target.value);
    }

    const newContent = content.split('\n')

    const getAge = (dob)=>{
      console.log(dob)
        const dobArray = dob.split("-")
        const year = dobArray[0]
        const month = dobArray[1]
        const day = dobArray[2]

        const current = new Date()

        const currentYear = current.getFullYear()
        const currentMonth = current.getMonth()+1
        const currentDay = current.getDate()

        let age = currentYear - year
        const monthDiff = currentMonth - month
        const dayDiff = currentDay - day

        if(monthDiff < 0 || monthDiff == 0 && dayDiff < 0)
            age--

        console.log(age)

        return age

    }

    const handlePreview = ()=>{
      setPreview(!preview)
    }
    console.log("********",report.current)

    const handleGeneratePdf = () => {
      setLoading(!loading)
      dispatch(generatePdfFromContent(report.current, 'output.pdf', appointment?.user?.user?.email));
    }

    if(!doctor || !appointment)
        return <Loader/>
  return (
    <div>
      <Heading/>
      { appointment && doctor && !preview ? <div className='flex pl-4 pr-4'>
    <div className='flex mx-auto flex-col mt-10 bg-slate-200 flex-[0.5] p-10 h-[35rem]'>
      <ul className='flex justify-center items-center border-b border-b-slate-400'>
        <MedicationIcon/>
        <li className=' text-xl p-2'>Dr.{doctor.doctor.firstName} {doctor.doctor.lastName}</li>
        {/* {doctor?.doctor?.educationHistory.map((edu, index)=>(
          <li>{edu}</li>
        ))} */}
        <li className=' text-xl p-2'>{doctor.doctor.speciality}</li>
      </ul> 

      <ul className=' mt-10 mb-10 pl-12 pr-12'>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Patient name</p>
          <li>{appointment.user.firstName} {appointment.user.lastName}</li>
        </div>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Age</p>
        <li>{getAge(appointment.user.dob)}Y</li>
        </div>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Gender</p>
        <li>{appointment.user.gender}</li>
        </div>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Contact Number</p>
        <li>{appointment.user.contactNumber}</li>
        </div>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Appointment date</p>
        <li>{appointment.user.appointmentDate}</li>
        </div>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Appointment time</p>
        <li>{appointment.user.appointmentTime}</li>
        </div>
      </ul>
      <textarea
        className=" p-4 border resize-none scrollbar-hide ml-10 mr-10 outline-none"
        value={content}
        onChange={handleContentChange}
        placeholder="Start typing medicine..."
      />
      <div className='flex mt-6'>
      <button 
      onClick={handlePreview}
      className='mt-5 border border-black w-[4rem] ml-10'>Preview</button>
      
      </div>
      </div>
      
    </div> : !loading ? <div 
    
    className='flex pl-4 pr-4'>
    <div 
    ref={report}
    className='flex mx-auto flex-col mt-10 bg-slate-200 flex-[0.5] p-10 h-[37rem]'>
      <ul className='flex justify-center items-center border-b border-b-slate-400'>
        <MedicationIcon/>
        <li className=' text-xl p-2'>Dr.{doctor.doctor.firstName} {doctor.doctor.lastName}</li>
        {/* {doctor?.doctor?.educationHistory.map((edu, index)=>(
          <li>{edu}</li>
        ))} */}
        <li className=' text-xl p-2'>{doctor.doctor.speciality}</li>
      </ul> 

      <ul className=' mt-10 mb-10 pl-12 pr-12'>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Patient name</p>
          <li>{appointment.user.firstName} {appointment.user.lastName}</li>
        </div>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Age</p>
        <li>{getAge(appointment.user.dob)}Y</li>
        </div>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Gender</p>
        <li>{appointment.user.gender}</li>
        </div>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Contact Number</p>
        <li>{appointment.user.contactNumber}</li>
        </div>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Appointment date</p>
        <li>{appointment.user.appointmentDate}</li>
        </div>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Appointment time</p>
        <li>{appointment.user.appointmentTime}</li>
        </div>
        
      </ul>
      {newContent.map((item,index)=>(
        <li className=' list-none ml-12' key={index}>{item}</li>
      ))}
      <div className='flex'>
     <button 
      onClick={handlePreview}
      className='mt-5 border border-black w-[4rem] ml-12'>
        Back
      </button>
      <button 
      onClick={handleGeneratePdf}
      className='mt-5 border border-black w-[4rem] ml-12'>
        Send
      </button>
      </div>
      </div> 
    </div>  : <div><DotLoader className=' mx-auto mt-[20rem]'/></div>
}
  
  {/* <div className=" w-[40%] mx-auto" onClick={handleClick}>
    {openChat ? (
      <ChatApp setOpenChat={setOpenChat} />
    ) : (
      <ChatComponent setOpenChat={setOpenChat} />
    )}
  </div> */}
</div>

  )
}

export default DoctorMeet