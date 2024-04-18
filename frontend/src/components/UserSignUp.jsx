import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { TextField, Select, MenuItem, InputLabel} from "@mui/material"
import Heading from './Heading';

const UserSignUp = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({})

  const handleChange = (e)=>{
      setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {

      const {data} = await axios.post('http://127.0.0.1:4000/api/v1/user/user-register',formData, {
        headers:{"Content-Type":"application/json"}
      })

      console.log(data)

      if(data){
        navigate("/user-login")
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <Heading/>
    <div className='w-[60rem] flex justify-center items-center mt-[5rem] mb-[5rem] pt-5 pb-5 pr-5 bg-gray-300 mx-auto'>  
   <h2 className="w-[30rem] text-4xl mr-[1rem] text-center text-blue-800">User registeration form</h2>
   <form className="space-y-4 w-[30rem]"
   onSubmit={handleSubmit}
   >
    <div>
    <TextField
        id="filled-basic"
        required
        label="First Name"
        variant="outlined"
        name="firstName"
        value={formData.firstName || ''}
        onChange={handleChange}
        className="form-input mt-1 block w-full"
        />
    </div>
    <div>
    <TextField
        id="filled-basic"
        required
        label="Last Name"
        variant="outlined"
        name="lastName"
        value={formData.lastName || ''}
        onChange={handleChange}
        className="form-input mt-1 block w-full"
        />
    </div>
     <div>
     <input
       placeholder='Email'
       type='email'
       name="email"
       value={formData.email || ''}
       onChange={handleChange}
       className="appearance-none block w-full bg-gray-300 text-black border border-gray-400 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-sky-700 placeholder:text-gray-700"
       />
       
     </div>

     

     <div>
     <input
       placeholder='Password'
       type='password'
       name="password"
       value={formData.password || ''}
       onChange={handleChange}
       className="appearance-none block w-full bg-gray-300 text-black border border-gray-400 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-sky-700 placeholder:text-gray-700"
       />
       
     </div>

     <div>
     <InputLabel id="demo-simple-select-label">Gender</InputLabel>
     <Select
       required
       labelId="demo-simple-select-label"
       id="demo-simple-select"
       value={formData.gender || ''}
       name="gender"
       onChange={handleChange}
       className="form-input mt-1 block w-full"
    >
       <MenuItem value="male">Male</MenuItem>
       <MenuItem value="female">Female</MenuItem>
       <MenuItem value="other">Other</MenuItem>
       </Select>
     </div>

     <div>
     <input
       placeholder='DOB'
       type='date'
       name="dob"
       value={formData.dob|| ''}
       onChange={handleChange}
       className="appearance-none block w-full bg-gray-300 text-black border border-gray-400 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-sky-700 placeholder:text-gray-700"
       />
       
     </div>

     <div>
       <button
         type="submit"
         className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600"
       >
         Register
       </button>
     </div>

     <div>
     <p>Already registered? <Link className=' text-indigo-700 font-semibold hover:text-indigo-500' to='/user-login'>Login</Link></p>
     </div>

   </form>
   </div> 
 </div>
  );
};

export default UserSignUp;