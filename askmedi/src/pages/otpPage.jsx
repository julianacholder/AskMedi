import React, { useState, useRef, useEffect } from 'react';
import api from '../api'
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Logo from  "../assets/images/logo.png"
import "../assets/css/otp/otp.css"

const OtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6-digit OTP
  const [email, setEmail] = useState('');
  const location = useLocation();
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]; // 6 refs
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location]);
  const handleChange = (index, value) => {
    if (isNaN(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value !== '' && index < 5) { // Changed to 5 for 6-digit OTP
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      const response = await api.post('users/verify-otp/', {  email: email, otp: otpString });
      toast.success('OTP verified successfully');
      setTimeout(() => {
        navigate('/login'); 
      }, 2000);
      console.log(response)
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
      console.error(error.response);
    }
  };

  return (
    <div className='otp-main'>
      <div className="otp-logo">
         <img src={Logo} alt="" />
      </div>
     <div className="otp-text">
      <div className="otp-header">
        <h1>Verify your Account</h1>
        <p>Please enter the OTP code send to your email address</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="otp-input-group">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={inputRefs[index]}
              className="otp-input"
            />
          ))}
        </div>
        <div className="back-resend">
          <p>Back to SignUp</p>
          <h3>Resend Otp</h3>
        </div>
        <div className="signup-button">
        <button type="submit">Verify</button>
        </div>

      </form>
      <ToastContainer
         position="top-center"
         />
     </div>
    </div>
  )
}

export default OtpPage
