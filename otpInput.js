import React, {useRef, useState} from 'react';

export default function OtpInput ({length = 6}) {
    const [otp, setOtp] = useState(Array(length).fill(''));
    const inputsRef = useRef([]);

    const handleChange = (e, idx) => {
        const value = e.target.value;
        if (!/^[0-9]?$/.test(value)) return; 

        const newOtp = [...otp];
        newOtp[idx] = value;
        setOtp(newOtp);

        if (value && idx < length - 1) {
            inputsRef.current[idx + 1].focus();
        }
    };

    const handleKeyDown = (e, idx) => {
      if (e.key === 'Backspace') {
        if (otp[idx] === '') {
          if (idx > 0) inputsRef.current[idx - 1].focus();
        }
      }
    }

    const handlePaste = (e) => {  
        e.preventDefault();
        const paste = e.clipboardData.getData('text');
        if (!/^[0-9]+$/.test(paste)) return; 

        const newOtp = [...otp];
        const digits = paste.slice(0, length).split('');
        digits.forEach((digit, index) => {
            if (index < length) {
                newOtp[index] = digit;
                if (index < length - 1) inputsRef.current[index + 1].focus();
            }
        });

        setOtp(newOtp);
    }

    return (
      <div onPaste={handlePaste} style={{display: 'flex', gap: '2px'}}>
      {otp.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          value={digit}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          style={{width: '40px', height: '40px', textAlign: 'center', borderRadius: '5px', border: '1px solid #ccc'}}
          ref={(el) => (inputsRef.current[idx] = el)}
          maxLength={1}
        />
      )
      )}
      </div>
    );
}