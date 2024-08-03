import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import '../assets/css/dashboard/dashboard.css';
import Logo from '../assets/images/logo.png';
import Chatbot from './chatbotPage';
import UserReport from './userReportPage';
import Appsettings from './appsettingsPage';
import { ToastContainer, toast } from 'react-toastify';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [initials, setInitials] = useState('');
  const [medicalHistory, setMedicalHistory] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('users/me/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setUserData(response.data);
      const id = response.data.id;
      localStorage.setItem('id', id);

      const fullName = response.data.fullname;
      setUsername(fullName);
      setInitials(getInitials(fullName));
      fetchMedicalHistory(id);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const signOut = async () => {
    try {
      const response = await api.post('users/logout/', {}, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) { 
        localStorage.removeItem('token');
        localStorage.removeItem('id'); 
        console.log(response)
        toast.success('Successfully logged out');
        setTimeout(() => {
          navigate('/login');
        }, 2000); 
      } else {
        toast.error('Error logging out');
      }
    } catch (error) {
      toast.error('Error logging out');
      console.error('Error logging out:', error);
    }
  };

  const fetchMedicalHistory = async (id) => {
    try {
      const response = await api.get(`users/user-summaries/${id}/`);
      setMedicalHistory(response.data);
    } catch (error) {
      console.error('Error fetching medical history:', error);
    }
  };

  const getInitials = (fullName) => {
    const nameParts = fullName.split(' ');
    return nameParts.map(part => part.charAt(0).toUpperCase()).join('');
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleTabClick = (event, tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className='dashboard'>
       <ToastContainer
         position="top-center"
         />
      <div className="blue-side">
        <div className="signup-logo">
          <img src={Logo} alt="" />
        </div>
        <div className="dashboard-tabs">
          <div className='active-tabs'>
            <div className={`icon-name ${activeTab === 'dashboard' ? 'active' : ''}`}>
              <i className="fa-solid fa-chart-bar"></i>
              <button className='tablinks' onClick={(event) => handleTabClick(event, 'dashboard')}>
                Dashboard
              </button>
            </div>
            <div className={`icon-name ${activeTab === 'chatbot' ? 'active' : ''}`}>
              <i className="fa-solid fa-comment-medical"></i>
              <button className="tablinks" onClick={(event) => handleTabClick(event, 'chatbot')}>
                Chatbot
              </button>
            </div>
            <div className={`icon-name ${activeTab === 'userreport' ? 'active' : ''}`}>
              <i className="fa-solid fa-file-prescription"></i>
              <button className="tablinks" onClick={(event) => handleTabClick(event, 'userreport')}>
                User report
              </button>
            </div>
            <div className='icon-name'>
              <i className="fa-solid fa-bell"></i>
              <button className="tablinks" onClick={(event) => handleTabClick(event, 'personal')}>
                Personal
              </button>
            </div>
          </div>
          <div className="app-sign">
            <button className='start' onClick={(event) => handleTabClick(event, 'chatbot')}>Start chat
            </button>
            <div className={`icon-name ${activeTab === 'appsettings' ? 'active' : ''}`}>
              <i className="fa-solid fa-gear"></i>
              <button className="tablinks" onClick={(event) => handleTabClick(event, 'appsettings')}>
                App settings
              </button>
            </div>
            <div className='icon-name'>
              <i className="fa-solid fa-right-from-bracket"></i>
              <button className="tablinks" onClick={signOut}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {activeTab === 'dashboard' && (
          <div className='row'>
            <h1>Home/Dashboard</h1>
            <div className="hello-user">
              <div className="hand">
                <i className="fa-solid fa-hand"></i>
              </div>
              <div className="header-text">
                <h1>Hello, {userData ? userData.fullname : 'User'} </h1>
                <p>Today is a good day to see how you're feeling. Your health status looks good, and you are 
                  close to reaching your daily activity goal. Keep it up!</p>
              </div>
            </div>
            <div className='how-feeling'>
              <div className="smile-text">
                <div className="emoji-border">
                  <i className="fa-solid fa-person-running"></i>
                </div>
                <h2>Get started</h2>
                <p>200 active users online</p>
              </div>
              <div className="smile-text">
                <div className="emoji-border">
                  <i className="fa-regular fa-face-laugh-beam"></i>
                </div>
                <h2>Check your health</h2>
                <p>How are you today?</p>
              </div>
              <div className="smile-text">
                <div className="emoji-border">
                  <i className="fa-solid fa-stethoscope"></i>
                </div>
                <h2>Diagnosis</h2>
                <p>Personalized diagnosis</p>
              </div>
            </div>
            <div className="medical-why">
              <div className="medical">
                <h1>Medical History (Summary)</h1>
                {medicalHistory.length > 0 ? (
                  medicalHistory.map((item, index) => (
                    <p key={index}>- {item.diagnosis_content}</p>
                  ))
                ) : (
                  <p>No medical history available.</p>
                )}
              </div>
              <div className="why">
                <h1>Why AskMedi?</h1>
                <div className="check-text">
                  <i className="fa-solid fa-circle-check"></i>
                  <p>Accurate diagnosis</p>
                </div>
                <div className="check-text">
                  <i className="fa-solid fa-circle-check"></i>
                  <p>Accessible Healthcare</p>
                </div>
                <div className="check-text">
                  <i className="fa-solid fa-circle-check"></i>
                  <p>Less hospital visits</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chatbot' && <Chatbot />}
        {activeTab === 'userreport' && <UserReport />}
        {activeTab === 'personal' && <div><h1>Personal</h1></div>}
        {activeTab === 'appsettings' && <Appsettings />}
      </div>

      <div className="dashboard-profile">
        {activeTab === 'dashboard' && (
          <div className="outer-border">
            <div className="bell">
              <i className="fa-solid fa-bell"></i>
            </div>
            <div className="user-details">
              <div className="initials">
                <h1>{initials}</h1>
              </div>
              <div className="name">
                <h2>{userData ? userData.fullname : 'User'}</h2>
              </div>
              <div className="gender-age">
                <p>Gender: {userData ? userData.gender : 'Not provided'}</p>
                <p>Age: {userData ? userData.age : 'Not provided'}</p>
              </div>
            </div>
            <div className="more-resources">
              <h3>More Resources</h3>
              <div className="individual-resource">
                <div className='resource-border'>
                  <i className="fa-solid fa-dumbbell"></i>
                </div>
               <a href="https://www.muscleandstrength.com/workout-routines"> <p>Fitness Routine</p></a>
              </div>
              <div className="individual-resource">
                <div className='resource-border'>
                  <i className="fa-solid fa-suitcase-medical"></i>
                </div>
               <a href="https://medlineplus.gov/healthcheckup.html"><p>Medical Checkup</p></a> 
              </div>
              <div className="individual-resource">
                <div className='resource-border'>
                  <i className="fa-solid fa-spa"></i>
                </div>
                <a href="https://www.youtube.com/watch?v=6l7EKVHnRcc"><p>Mindfulness</p></a>
              </div>
            </div>
          </div>
        )}
        {['chatbot', 'userreport', 'personal', 'appsettings'].includes(activeTab) && (
          <div className="footer">
            <ul>
              <li>About us</li>
              <li>Contact us</li>
              <li>Privacy Policy</li>
              <li>Help</li>
              <li>Terms of service</li>
              <li>FAQs</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
