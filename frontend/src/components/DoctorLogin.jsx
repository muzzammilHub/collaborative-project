import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Heading from './Heading';

const DoctorLogin = () => {
    const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {

      const {data} = await axios.post('http://127.0.0.1:4000/api/v1/doctor/doctor-login',{email, password}, {
        headers:{"Content-Type":"application/json"}
      })
      // console.log(doctor)
      if(data){
        const {doctorToken} = data
        localStorage.setItem("doctorToken", doctorToken)
        navigate("/doctor-pannel")
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Heading/>
    <div className='w-[60rem] flex justify-center items-center mt-[10rem] pt-5 pb-5 pr-5 bg-gray-300 mx-auto'>  
   <h2 className="w-[30rem] text-4xl mr-[1rem] text-center text-blue-800">Write your email and password</h2>
   <form className="space-y-4 w-[30rem]"
   onSubmit={handleSubmit}
   >
     <div>
     <input
       placeholder='Email'
       type='email'
       name="email"
       value={email || ''}
       onChange={(e)=>setEmail(e.target.value)}
       className="appearance-none block w-full bg-gray-300 text-black border border-gray-400 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-sky-700 placeholder:text-gray-700"
       />
       
     </div>

     <div>
     <input
       placeholder='Password'
       type='password'
       name="password"
       value={password || ''}
       onChange={(e)=>setPassword(e.target.value)}
       className="appearance-none block w-full bg-gray-300 text-black border border-gray-400 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-sky-700 placeholder:text-gray-700"
       />
       
     </div>

    

     <div>
       <button
         type="submit"
         className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600"
       >
         Login
       </button>
     </div>

     <div>
     <p>New to this portal? <Link className=' text-indigo-700 font-semibold hover:text-indigo-500' to='/doctor-register'>Register</Link></p>
     </div>

   </form>
   </div> 
 </div>
  );
};

export default DoctorLogin;