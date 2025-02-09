import React from 'react';


const StepOne = ({formData, handleChange}) => {
    return (
        <div>
            <label>First Name:</label>
            <input type="text"  name="name" value={formData.name} onChange={handleChange}/>
        </div>
    )
};

export default StepOne;