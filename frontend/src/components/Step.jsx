import React from 'react'
import { InputLabel, Select, MenuItem} from "@mui/material"
import Heading from './Heading';

const Step = ({ formData, setFormData, nextStep }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
      if(!formData.appointmentType)
        formData.appointmentType="Virtual Meet"
  return (
    <div>
      <Heading/>
     <div className='w-[60rem] flex justify-center items-center mt-[15rem] pt-5 pb-5 pr-5 bg-gray-300 mx-auto'>  
    <h2 className="w-[30rem] text-4xl mr-[1rem] text-center text-blue-800">Appointment Type?</h2>
    <form className="space-y-4 w-[30rem]">
      <div>
      <InputLabel id="demo-simple-select-label">Appointment Type</InputLabel>
      <Select
        required
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={formData.appointmentType || "Virtual Meet"}
        name="appointmentType"
        onChange={handleChange}
        className="form-input mt-1 block w-full"
      >
        <MenuItem value="Virtual Meet">Virtual Meet</MenuItem>
        <MenuItem value="In-person Meet">In-person Meet</MenuItem>
        </Select>
      </div>
      <div>
        {formData.appointmentType === "Virtual Meet" ? "₹199 consultant fees" : "₹500 consultant fees"}
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
  )
}

export default Step