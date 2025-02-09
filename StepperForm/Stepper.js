import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepperControls from './StepperControls';

const Stepper = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState(["StepOne", "StepTwo", "StepThree"]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const nextStep = () => {
        if(currentStep < steps.length - 1)
        setCurrentStep(currentStep + 1);
    }

    const previousStep = () => {
        if(currentStep > 0)
        setCurrentStep(currentStep - 1);
    }

    const handleSubmit = () => {    
        console.log(formData);
    }

    return (
        <div style={{width: '400px', margin: '50px auto', textAlign: 'center'}}>
            <h2>Multi step form</h2>
            <p>Step {currentStep + 1} of {steps.length}: {steps[currentStep]} </p>
            {currentStep === 0 && <StepOne formData={formData} handleChange={handleChange} />}
            {currentStep === 1 && <StepTwo formData={formData} handleChange={handleChange} />}
            {currentStep === 2 && <StepThree formData={formData} handleChange={handleChange} />}

            <StepperControls currentStep={currentStep} nextStep={nextStep} previousStep={previousStep}  totalSteps={steps.length} handleSubmit={handleSubmit} />
        </div>
    )
}

export default Stepper;