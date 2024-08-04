import React, { useState } from 'react';
import api from '../api'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import "../assets/css/main.css";
import "../assets/css/signup/signup.css";
import Logo from "../assets/images/logo.png";
import Welcome from "../assets/images/welcomeimg.png";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    gender: '',
    age: '',
    password: '',
  });
  const [showSignupFields, setShowSignupFields] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const response = await api.post('users/register/', formData);
      toast.success("Registration Successful");
      setTimeout(() => {
        navigate('/otp', { state: { email: formData.email } });
      }, 2000); 
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
      console.log(error.response)
    }
  };

  const toggleSignupFields = () => {
    setShowSignupFields(!showSignupFields);
  };

  return (
    <div className='signup-content'>
      <ToastContainer position="top-center" />
      <div className='signup-main'>
        <div className={`signup-fields ${showSignupFields ? 'show-mobile' : ''}`}>
          <h1>Create a Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className='input-field'>
              <label htmlFor="fullname">Full name</label>
              <input
                type="text"
                name="fullname"
                placeholder='Enter your full name'
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>

            <div className='input-field'>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className='input-field'>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder='******'
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className='input-field'>
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                placeholder=''
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className='input-field'>
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className='inputs-field'>
              <input type="checkbox" />
              <label htmlFor="">I agree to the <span>terms & policy</span></label>
            </div>

            <div className="signup-button">
              <button type="submit">Signup</button>
              <h4>Or</h4>
              <h2>Have an account? <Link to="/login">Login</Link></h2>
            </div>
          </form>
        </div>

        <div className={`signup-welcome ${showSignupFields ? 'hide-mobile' : ''}`}>
          <div className="signup-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="welcome-content">
            <div className='welcome-text'>
              <h1>Welcome to AskMedi!</h1>
              <div className='display'>
                <button className='mobile-signup' onClick={toggleSignupFields}>Sign up</button>
               <Link to={"/login"}><button className='mobile-signup'>Login</button></Link> 
              </div>
              <p>AskMedi is your trusted AI-powered online <br /> health assistant, providing instant answers <br />
                to your medical questions and personalized <br />
                diagnosis support.</p>
            </div>

            <div className='main-img'>
              <img src={Welcome} alt="Welcome" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

