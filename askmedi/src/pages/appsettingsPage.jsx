import React, { useState, useEffect } from 'react';
import api from '../api';
import "../assets/css/appsettings/appsettings.css";
import Settings from "../assets/images/Group 1000011159 (1).png";

const Appsettings = () => {
  const [userData, setUserData] = useState(null);
  const [initials, setInitials] = useState('');

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('users/me/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setUserData(response.data);
      const fullName = response.data.fullname;
      setInitials(getInitials(fullName));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getInitials = (fullName) => {
    const nameParts = fullName.split(' ');
    return nameParts.map(part => part.charAt(0).toUpperCase()).join('');
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className='app-settings'>
      <h1 className='settings-header'>Settings</h1>
      <div className="first-part">
        <div className="left-settings">
          <div className="left-initial">
            <h1>{initials}</h1>
          </div>
          <div className='ok-user'>
            <h2>User</h2>
            <h1>{userData ? userData.fullname : 'Loading...'}</h1>
          </div>
        </div>

        <div className="right-settings">
          <p>Gender: {userData ? userData.gender : 'Loading...'}</p>
          <p>Age: {userData ? userData.age : 'Loading...'}</p>
          <p>User ID: {userData ? userData.id : 'Loading...'}</p>
        </div>
      </div>

      <div className="second-part">
        <div className="user-icon">
          <img src={Settings} alt="" />
        </div>

        <div className='hospitals'>
          <div className="individual-hosiptals">
            <div className="hospital-icon">
              <i className="fa-solid fa-truck-medical"></i>
            </div>
            <p>Hospitals near me</p>
          </div>
          <div className="individual-hosiptals">
            <div className="hospital-icon">
              <i className="fa-solid fa-stethoscope"></i>
            </div>
            <p>Speak with a doctor</p>
          </div>
          <div className="individual-hosiptals">
            <div className="hospital-icon">
              <i className="fa-solid fa-user-nurse"></i>
            </div>
            <p>Speak with the <br />AskMedi team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appsettings;
