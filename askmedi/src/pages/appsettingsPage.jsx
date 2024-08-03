import React from 'react'
import "../assets/css/appsettings/appsettings.css"
import Settings from "../assets/images/Group 1000011159 (1).png"

const Appsettings = () => {
  return (
    <div className='app-settings'>
      <h1>Settings</h1>
      <div className="first-part">
      <div className="left-settings">
        <div className="left-initial">
          <h1>JD</h1>
        </div>

        <div className='ok-user'>
          <h2>User</h2>
          <h1>John Doe</h1>
        </div>
      </div>

      <div className="right-settings">
        <p>Gender: Male</p>
        <p>Age: 18</p>
        <p>User ID: 012456</p>
      </div>
      </div>

      <div className="second-part">
        <div className="user-icon">
          <img src={Settings} alt="" />
        </div>

        <div className='hospitals'>
           <div className="individual-hosiptals">
            <div className="hospital-icon">
            <i class="fa-solid fa-truck-medical"></i>
            </div>
            <p>Hospitals near me</p>
           </div>

           <div className="individual-hosiptals">
            <div className="hospital-icon">
            <i class="fa-solid fa-stethoscope"></i>
            </div>
            <p>Speak with a doctor</p>
           </div>

           <div className="individual-hosiptals">
            <div className="hospital-icon">
            <i class="fa-solid fa-user-nurse"></i>
            </div>
            <p>Speak with the <br />AskMedi team</p>
           </div>
        </div>
      </div>
    </div>
  )
}

export default Appsettings
