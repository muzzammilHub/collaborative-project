import React, { useEffect, useState } from 'react';
import {TextField, Select, MenuItem, InputLabel, FormControl} from "@mui/material"
import { useSelector } from "react-redux"
import Heading from "./Heading"
import { useDispatch } from 'react-redux';
import { loadLoginUser } from '../actions/loadUser';

const Step1 = ({ formData, setFormData, nextStep, prevStep }) => {
  const dispatch = useDispatch()
  const user = useSelector((store)=>store.user)
  console.log(formData)
  console.log("user....", user.user.loginUser)
  const {loginUser} = user?.user
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  if(loginUser){
    formData.firstName = loginUser?.firstName;
    formData.lastName = loginUser?.lastName;
    formData.dob = loginUser?.dob;
    formData.gender = loginUser?.gender;
  }

  useEffect(()=>{
    dispatch(loadLoginUser())
  },[])

  return (
    <div>
      <Heading/>
     <div className='w-[60rem] flex justify-center items-center mt-[6rem] pt-5 pb-5 pr-5 bg-gray-300 mx-auto'>  
    <h2 className="w-[30rem] text-4xl mr-[1rem] text-center text-blue-800">What is your legal name, date of birth & gender?</h2>
    <form className="space-y-4 w-[30rem]">
      <div>
      <TextField
        id="filled-basic"
        required
        label="First Name"
        variant="outlined"
        name="firstName"
        value={formData.firstName || loginUser?.firstName}
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
        value={formData.lastName || loginUser?.lastName}
        onChange={handleChange}
        className="form-input mt-1 block w-full"
        />
      </div>

      <div>
          <input
            placeholder='DOB'
            type="date"
            name="dob"
            value={formData.dob || loginUser?.dob}
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
        value={formData.gender || loginUser?.gender}
        name="gender"
        onChange={handleChange}
        className="form-input mt-1 block w-full"
     >
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="other">Other</MenuItem>
        </Select>
      </div>
      <div className=' flex justify-between'>
      <button
          type="button"
          onClick={prevStep}
          className=" bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Back to prev
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
  );
}

export default Step1