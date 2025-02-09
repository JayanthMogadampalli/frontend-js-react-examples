import React from 'react';

const StepTwo = ({formData, handleChange}) => {
    return (
        <div>
            <label>Email:</label>
            <input type="text" name="email" value={formData.email} onChange={handleChange}/>
        </div>
    )
};

export default StepTwo;
