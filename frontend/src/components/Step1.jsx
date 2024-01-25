import React, { useState } from 'react';
import {TextField, Select, MenuItem, InputLabel, FormControl} from "@mui/material"
import BasicDateField from './BasicDateField';

const Step1 = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div>
     <div className='w-[60rem] flex justify-center items-center mt-[10rem] pt-5 pb-5 pr-5 bg-gray-300 mx-auto'>  
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
        <BasicDateField
        formData={formData}
        setFormData={setFormData}
        />
      {/* <DateField label="Basic date field" /> */}
        {/* <label className="block mb-2">
          <span className="text-gray-700">Date of Birth:</span>
          <input
            type="date"
            name="dob"
            value={formData.dob || ''}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label> */}
      </div>
      <div>
      <InputLabel id="demo-simple-select-label">Gender</InputLabel>
      <Select
        required
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={formData.gender || ''}
        label="Gender"
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
    </form>
    </div> 
  </div>
  );
}

export default Step1