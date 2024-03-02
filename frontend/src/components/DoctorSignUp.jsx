import React, {useState} from 'react'
import DStep1 from './DStep1'
import DStep2 from './DStep2'
import DStep3 from './DStep3'

const DoctorSignUp = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({})

    const nextStep = ()=>{
        setCurrentStep(currentStep+1)
    }

    const prevStep = ()=>{
        setCurrentStep(currentStep-1)
    }


  return (
    <div>
        {currentStep===1 && <DStep1 nextStep={nextStep} formData={formData} setFormData={setFormData}/>}
        {currentStep===2 && <DStep2 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData}/>}
        {currentStep===3 && <DStep3 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData}/>}
    </div>
  )
}

export default DoctorSignUp