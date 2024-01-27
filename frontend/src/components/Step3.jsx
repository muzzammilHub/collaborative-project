import React from 'react'
import {TextField} from "@mui/material"

const Step3 = ({ formData, setFormData, nextStep, prevStep }) => {

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }

  return (
    <div>
        <div className='w-[60rem] flex justify-center items-center mt-[10rem] pt-5 pb-5 pr-5 pl-4 bg-gray-300 mx-auto'>
            <div>
                <h1 className="w-[30rem] text-4xl mr-[1rem] text-center text-blue-800">Write ur address...</h1>
            </div>
            <form className="space-y-4 w-[30rem]">
            <div>
                <TextField
                id="filled-basic"
                required
                label="Street"
                variant="outlined"
                name="street"
                value={formData.street || ''}
                onChange={handleChange}
                className="form-input mt-1 block w-full"
                />
            </div>  
            <div>  
                <TextField
                id="filled-basic"
                required
                label="District"
                variant="outlined"
                name="district"
                value={formData.district || ''}
                onChange={handleChange}
                className="form-input mt-1 block w-full"
                />
            </div>  
            <div>  
                <TextField
                id="filled-basic"
                required
                label="State"
                variant="outlined"
                name="state"
                value={formData.state || ''}
                onChange={handleChange}
                className="form-input mt-1 block w-full"
                />
            </div>
            <div>
                <TextField
                id="filled-basic"
                required
                label="Country"
                variant="outlined"
                name="country"
                value={formData.country || ''}
                onChange={handleChange}
                className="form-input mt-1 block w-full"
                />
            </div>
            <div>
                <input
                required
                placeholder='Pin Code'
                type='number'
                value={formData.pinCode || ''}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-300 text-black border border-gray-400 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-sky-700 placeholder:text-gray-700"
                />
            </div>
                <div className='flex justify-between'>
                    <button 
                    className=" bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    type='submit'
                    onClick={prevStep}
                    >Back to prev</button>
                    <button
                    className=" bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    type='submit'
                    onClick={nextStep}
                    >Proceed to next</button>
                </div>
            
            </form>
        </div>
    </div>
  )
}

export default Step3