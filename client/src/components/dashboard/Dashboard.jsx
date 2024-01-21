import React from 'react'
import { useState,useEffect } from 'react';
import { Link ,Navigate} from 'react-router-dom';
import axios from 'axios';

import './dashboard.css'
const Dashboard = () => {
    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:4000/allprofiles',{
            headers:{
                'x-token':localStorage.getItem('token')
            }
        }).then(res=>setData(res.data))
    },[])
    // if not a token in localstorage
    if (!localStorage.getItem('token')){
        return <Navigate to='/login'/>
    }
  return (
    <div className='content'>
        
  <nav>
    <h1 className='header'>Developers Hub</h1>
       <div className="links">
         <Link to='/myprofile'>My Profile</Link>
        <Link to='/login' onClick={()=>localStorage.removeItem('token')}>Logout</Link>
    
       </div>
  </nav>

  <div className="container">
     {data.length>=1 ?
     data.map(profile=>
     <div className="dashboard">
<div className="img">
          <img className="profile-img" src="https://via.placeholder.com/100" alt="Profile" />

</div>
     <div className="info">
         <h2>{profile.fullname}</h2>
      <p>{profile.email}</p>
      {/* <p>{profile.skills}</p> */}
      <p>India</p>
<Link to={`/individualprofile/${profile.fullname}/${profile.email}/${profile.skills}/${profile.mobile}/${profile._id}`}>    <button class="view-profile-btn">View Profile</button></Link>
     </div>
      <div className="skills">
        <ul>
        {profile.skills.split(',').map(skills=>
            <li>*{skills}</li>
            )}
      </ul>
      </div>
    </div> ):null }
    


  </div>
    </div>
  )
}

export default Dashboard