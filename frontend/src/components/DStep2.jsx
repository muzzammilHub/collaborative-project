import React, {useState} from 'react'
import { TextField, InputLabel, MenuItem, Select } from '@mui/material'
import Heading from './Heading';

const statesInIndia = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];

const DStep2 = ({nextStep, prevStep, formData, setFormData}) => {
    // console.log(formData)
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    
  return (
    <div>
      <Heading/>
    <div className='w-[60rem] flex justify-center items-center mt-[5rem] mb-[5rem] pt-5 pb-5 pr-5 bg-gray-300 mx-auto'>  
   <h2 className="w-[30rem] text-4xl mr-[1rem] text-center text-blue-800">What is your legal name, date of birth & gender?</h2>
   <form className="space-y-4 w-[30rem]">
     <div>
     <TextField
       id="filled-basic"
       required
       label="Email"
       variant="outlined"
       name="email"
       value={formData.email || ''}
       onChange={handleChange}
       className="form-input mt-1 block w-full"
       />
     </div>

     <div>
     <input
        type='password'
       required
       placeholder='Password'
       name="password"
       value={formData.password || ''}
       onChange={handleChange}
       className="appearance-none block w-full bg-gray-300 text-black border border-gray-400 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-sky-700 placeholder:text-gray-700"
       />
     </div>

     <div>
     <input
      placeholder='Phone Number'
      type='tel'
      name='phoneNumber'
      value={formData.phoneNumber || ""}
      onChange={handleChange}
      className="appearance-none block w-full bg-gray-300 text-black border border-gray-400 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-sky-700 placeholder:text-gray-700"
     />  
     </div>
     <div>
     <TextField
       required
       multiline
       maxRows={20}
       id="filled-basic"
       label="Clinic Address"
       variant="outlined"
       name="clinicAddress"
       value={formData.clinicAddress || ''}
       onChange={handleChange}
       className="form-input mt-1 block w-full"
       />
     </div>

     <div>
       <input
       placeholder='Pin Code'
       type='number'
       name='pinCode'
       value={formData.pinCode || ""}
       onChange={handleChange}
       className="appearance-none block w-full bg-gray-300 text-black border border-gray-400 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-sky-700 placeholder:text-gray-700"
       />
     </div>
     <div>
     <InputLabel id="demo-simple-select-label">State</InputLabel>
     <Select
       required
       labelId="demo-simple-select-label"
       id="demo-simple-select"
       value={formData.state || ''}
       name="state"
       onChange={handleChange}
       className="form-input mt-1 block w-full"
    >
       {statesInIndia.map((state,index)=>
       (<MenuItem value={state} key={index}>{state}</MenuItem>)
       )}
       </Select>
     </div>
     <div>
     <InputLabel id="demo-simple-select-label">Country</InputLabel>
     <Select
       required
       labelId="demo-simple-select-label"
       id="demo-simple-select"
       value={formData.country || ''}
       name="country"
       onChange={handleChange}
       className="form-input mt-1 block w-full"
    >
       <MenuItem value="India">India</MenuItem>
       </Select>
     </div>
     <div className='flex justify-between'>
            <button
             type="button"
             onClick={prevStep}
             className=" bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600"
           >
             back to prev
           </button>
           <button
             type="button"
             onClick={nextStep}
             className=" bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600"
           >
             Proceed to next
           </button>
         </div>
   </form>
   </div> 
 </div>
  )
}

export default DStep2