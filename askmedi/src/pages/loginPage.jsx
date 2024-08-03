import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import api from '../api'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "../assets/css/login/login.css"
import Logo from "../assets/images/logo.png"
import Login from "../assets/images/loginimg.png"

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const response = await api.post('users/login/', formData);
     
        const token = response.data.token;
        localStorage.setItem('token', token);

        console.log('Login successful, token stored.');
     
      toast.success("Login Successful");
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); 
      console.log(response)
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
      console.log(error.response)
    }
  };

  return (
    <div>
    <div className='login-page'>
      <div className="logo-img">
      <div className="signup-logo">
         <img src={Logo} alt="" />
        </div>

        <div className='login-img'>
        <img src={Login} alt="" />
        </div>
      </div>

      <div className="welcome-input">
      <div>
        <h1>Welcome back!</h1>
        <p>Enter your Credentials to access your account</p>
      </div>

     
      <form onSubmit={handleSubmit}>
      <ToastContainer
         position="top-center"
         />
<div className='input-field'>
  <label htmlFor="Full name">Email</label>
  <input type="text" placeholder='Enter your email' name='email'  value={formData.email}
                onChange={handleChange} />
</div>

<div className='input-field'>
  <div className='password'>
  <label htmlFor="">Password</label>
  <p>forgot password</p>
  </div>
  <input type="text" placeholder='*****'  value={formData.password}
   name='password'             onChange={handleChange}/>
</div>

<div className='inputs-field'>
          <input type="checkbox" />
          <label htmlFor="">Remember me</label>
        </div>
          <div className="signup-button">
            <button>Login</button>
            <h4>Or</h4>
            <h2>Don't have an account? <Link to="/">Signup</Link></h2>
          </div>
</form>
      
      </div>
    </div>
    </div>
  )
}

export default LoginPage
