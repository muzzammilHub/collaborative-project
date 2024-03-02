import React, {useEffect, useState} from 'react'
import ChatComponent from './ChatComponent'
import ChatApp from './ChatApp'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../actions/loadUser'

const DoctorMeet = () => {
    const dispatch = useDispatch()
    const [openChat, setOpenChat] = useState(false)

    const {user} = useSelector((store)=>store.user)

    console.log("******",user)

 
    useEffect(()=>{
        dispatch(loadUser())
    },[dispatch])

    const handleClick = ()=>{}

    const getAge = (dob)=>{
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
  <div className="bg-gray-300 rounded-md shadow-md p-6">
    
    <div className="text-2xl text-center font-bold mb-4">Patient Information</div>
    
    {user && user.length > 0 && user.map((u, i) => (
      <div key={i} className="mb-6">
        <ul className="pl-4">
        <div className=' flex justify-between'>
          <span className=' font-bold'>Name</span><li className="text-lg font-semibold mb-2">{u.firstName} {u.lastName}</li>
        </div>
        <div className=' flex justify-between'>
          <span className=' font-bold'>Gender</span><li>{u.gender}</li>
        </div>
        <div className=' flex justify-between'>
          <span className=' font-bold'>Email</span><li>{u.user.email}</li>
        </div>
        <div className=' flex justify-between'>
          <span className=' font-bold'>Age</span><li>{getAge(u.user.dob)}</li>
        </div>
        <div className=' flex justify-between'>
          <span className=' font-bold'>Street</span><li>{u.street}</li>
        </div>
        <div className=' flex justify-between'>
          <span className=' font-bold'>District</span><li>{u.district}</li>
        </div> 
        <div className=' flex justify-between'>
          <span className=' font-bold'>State</span><li>{u.state}</li>
        </div>
        <div className=' flex justify-between'>
          <span className=' font-bold'>Pin Code</span><li>{u.pinCode}</li>
        </div>
        <div className=' flex justify-between'>
          <span className=' font-bold'>Health Issue</span><li>{u.healthIssue}</li>
        </div>
        <div className=' flex justify-between'> 
          <span className=' font-bold'>Appointment Date</span><li>{u.appointment[0].appointmentDate}</li>
        </div>
        <div className=' flex justify-between'>
          <span className=' font-bold'>Appointment Time</span><li>{u.appointment[0].appointmentTime}</li>
        </div>
        </ul>
      </div>
    ))}
  </div>
  <div className="bg-blue-500 rounded-md shadow-md p-6 text-white cursor-pointer" onClick={handleClick}>
    {openChat ? (
      <ChatApp setOpenChat={setOpenChat} />
    ) : (
      <ChatComponent setOpenChat={setOpenChat} />
    )}
  </div>
</div>

  )
}

export default DoctorMeet