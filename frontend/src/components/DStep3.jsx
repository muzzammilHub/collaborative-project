import React, {useState, useEffect} from 'react'
import { TextField, Autocomplete } from '@mui/material'
import axios from 'axios'
import { useNavigate, Link} from 'react-router-dom'

const medicalDegrees = [
    "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
    "Doctor of Medicine (MD)",
    "Master of Surgery (MS)",
    "Doctor of Osteopathy (DO)",
    "Bachelor of Dental Surgery (BDS)",
    "Doctor of Dental Surgery (DDS)",
    "Bachelor of Veterinary Science (BVSc)",
    "Master of Veterinary Science (MVSc)",
    "Bachelor of Ayurvedic Medicine and Surgery (BAMS)",
    "Bachelor of Homeopathic Medicine and Surgery (BHMS)",
    "Bachelor of Naturopathy and Yogic Sciences (BNYS)",
    "Bachelor of Unani Medicine and Surgery (BUMS)",
    "Bachelor of Pharmacy (BPharm)",
    "Doctor of Pharmacy (PharmD)",
    "Bachelor of Science in Nursing (BSc Nursing)",
    "Post Basic B.Sc Nursing",
    "Master of Science in Nursing (MSc Nursing)",
    "Bachelor of Physiotherapy (BPT)",
    "Master of Physiotherapy (MPT)",
    "Bachelor of Occupational Therapy (BOT)",
    "Master of Occupational Therapy (MOT)",
    "Bachelor of Science in Medical Laboratory Technology (BMLT)",
    "Master of Science in Medical Laboratory Technology (MMLT)",
    "Bachelor of Optometry (B.Optom)",
    "Master of Optometry (M.Optom)",
    "Doctor of Naturopathy and Yogic Sciences (NDYS)",
    "Master of Public Health (MPH)",
    "Doctor of Public Health (DrPH)",
    "Doctor of Science (DSc) in Medical Sciences",
    "Master of Hospital Administration (MHA)",
    "Master of Health Administration (MHA)"
]

const DStep3 = ({nextStep, prevStep, formData, setFormData}) => {
    const navigate = useNavigate()
    const [file, setFile] = useState(null)

    const handleFileChange = (e)=>{
        setFile(e.target.files[0])
      }

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleAutocompleteChange = (event, newValue) => {
        setFormData({...formData, educationHistory:newValue})
      };

    

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const formFile = new FormData()
        formFile.append("avatar", file)

        try {
            const {data} = await axios.post("http://127.0.0.1:4000/api/v1/doctor/registeration",formData)

            const {email} = data.doctor

            if(data && file){
              const response = await axios.post(`http://127.0.0.1:4000/api/v1/doctor/image-upload?email=${email}`,formFile)

              console.log(response)
              // navigate("/doctor-login")
            }
            
        } catch (error) {
            console.log("error: ", error)
        }
    }

  return (
    <div>
    <div className='w-[60rem] flex justify-center items-center mt-[10rem] pt-5 pb-5 pr-5 bg-gray-300 mx-auto'>  
   <div>
   <h2 className="w-[30rem] text-4xl mr-[1rem] text-center text-blue-800">What is your legal name, date of birth & gender?</h2>
    
   </div>
   <form
   className="space-y-4 w-[30rem]"
   onSubmit={handleSubmit}
   >
     <div>
     <TextField
       id="filled-basic"
       required
       label="Speciality"
       variant="outlined"
       name="speciality"
       value={formData.speciality || ''}
       onChange={handleChange}
       className="form-input mt-1 block w-full"
       />
     </div>

     <div>
     <Autocomplete
        multiple
        id="tags-outlined"
        options={medicalDegrees}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        onChange={handleAutocompleteChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Education"
            placeholder="Education"
          />
        )}
      />
     </div>
       
     <div>
     <TextField
          id="outlined-multiline-flexible"
          label="Work Experience"
          multiline
          maxRows={20}
          name='workExperience'
          value={formData.workExperience || ""}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
     </div>
     <div className='flex justify-between items-center'>
            <button
             type="button"
             onClick={prevStep}
             className=" bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600"
           >
             back to prev
           </button>
           <div className=''>
            <label htmlFor="avatar" className="cursor-pointer bg-blue-800 text-white py-2 px-4 rounded-md">
            Select Avatar
            </label>
            <input
                id="avatar"
                type="file"
                className="hidden pt-6"
                name='avatar'
                onChange={handleFileChange}
            />
            </div>
           <button
           type='submit'
             className=" bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600"
           >
             Register
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

export default DStep3