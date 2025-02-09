import React from 'react';

const StepThree = ({formData, handleChange}) => {
    return (
        <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange}/>
        </div>
    )
};

export default StepThree;