import React, {useEffect, useState} from 'react'
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step from './Step';
import { useDispatch } from 'react-redux';
import { loadLoginUser } from '../actions/loadUser';

const Appointment = () => {
    const dispatch = useDispatch()
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
  
    const nextStep = () => {
      setCurrentStep(currentStep + 1);
    };
  
    const prevStep = () => {
      setCurrentStep(currentStep - 1);
    };
  
    useEffect(()=>{
      dispatch(loadLoginUser())
    },[dispatch])
    return (
      <div>
        {currentStep === 0 && <Step formData={formData} setFormData={setFormData} nextStep={nextStep} />}
        {currentStep === 1 && <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
        {currentStep === 2 && <Step2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
        {currentStep === 3 && <Step3 formData={formData} setFormData={setFormData}  prevStep={prevStep} />}
      </div>
    );
}

export default Appointment