import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { TextField, InputLabel, MenuItem, Select } from '@mui/material'
import BasicDateField from './BasicDateField'
import Heading from './Heading'

const DStep1 = ({nextStep, formData, setFormData}) => {
    
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value} )
    }

  return (
    <div>
      <Heading/>
    <div className='w-[60rem] flex justify-center items-center mt-[5rem] pt-5 pb-5 pr-5 bg-gray-300 mx-auto'>  
   <h2 className="w-[30rem] text-4xl mr-[1rem] text-center text-blue-800">What is your legal name, date of birth & gender?</h2>
   <form className="space-y-4 w-[30rem]">
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
       label="Middle Name"
       variant="outlined"
       name="middleName"
       value={formData.middleName || ''}
       onChange={handleChange}
       className="form-input mt-1 block w-full"
       />
       
     </div>

     <div>
     <TextField
       required
       id="filled-basic"
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
            placeholder='DOB'
            type="date"
            name="dob"
            value={formData.dob || ''}
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
       <button
         type="button"
         onClick={nextStep}
         className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600"
       >
         Proceed to next
       </button>
     </div>
     <div>
     <p>New to this portal? <Link className=' text-indigo-700 font-semibold hover:text-indigo-500' to='/doctor-login'>Login</Link></p>
     </div>
   </form>
   </div> 
 </div>
  )
}

export default DStep1