import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/loginPage';
import SignUp from './pages/signupPage';
import Dashboard from './pages/dashboardPage';
import UserReport from './pages/userReportPage';
import Otp from "./pages/otpPage"
import Loader from './assets/components/loader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<UserReport />} />
        <Route path="/otp" element={<Otp />} />
        <Route path='/loader' element={<Loader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
