import React from 'react';

const StepperControls = ({currentStep, nextStep, previousStep, totalSteps, handleSubmit}) => {
    return (
        <div>
             <button onClick={previousStep} disabled={currentStep > 0}>Previous</button>
            {currentStep < totalSteps - 1 && <button onClick={nextStep}>Next</button>}
      {currentStep === totalSteps - 1 && <button onClick={handleSubmit}>Submit</button>}


        </div>
    );
};

export default StepperControls;