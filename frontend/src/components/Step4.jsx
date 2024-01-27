import { TextField } from '@mui/material';


const Step4 = ({ formData, setFormData, nextStep, prevStep }) => {
    console.log(formData)
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    return (
        <div>
        <div className='w-[60rem] flex justify-center items-center mt-[10rem] pt-5 pb-5 pr-5 pl-4 bg-gray-300 mx-auto'>  
       <h2 className="w-[30rem] text-4xl mr-[1rem] text-center text-blue-800">Write about your current health issue.</h2>
       <form className="space-y-4 w-[30rem]">
         <div>
         <TextField
           id="filled-basic"
           required
           label="Health"
           variant="outlined"
           name="health"
           value={formData.health || ''}
           onChange={handleChange}
           className="form-input mt-1 block w-full"
           /> 
         </div>
         <div>
            <p>Available time slot</p>
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
    );
  }

  export default Step4