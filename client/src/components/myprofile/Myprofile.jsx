import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import './myprofile.css'
const Myprofile = () => {
     const [data,setData]=useState(null);
     const [review ,setReview]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:4000/myprofile',{
            headers:{
                'x-token':localStorage.getItem('token')
            }
        }).then(res=>setData(res.data))
        axios.get('http://localhost:4000/myreview',{
            headers:{
                'x-token':localStorage.getItem('token')
            }
        }).then(res=>setReview(res.data))
    },[])
    // if not a token in localstorage
    if (!localStorage.getItem('token')){
        return <Navigate to='/login'/>
    }
  return (
    <div className='content'>
        
  <nav>
    <h1 className='header'>Developers Hub</h1>
        <div className="uls">
          <Link to='/dashboard'>Profiles</Link>
        <Link to='/updateprofile'>Update Profile</Link>
        <Link to='/deleteaccount'>Delete Profile</Link>
        <Link to='/login' onClick={()=>localStorage.removeItem('token')}>Logout</Link>
    
        </div>
  </nav>

  <div className="container">
     {data  &&

     <div className="myprofile">
      <img className="profile-img" src="https://via.placeholder.com/100" alt="Profile" />
      <h2>{data.fullname}</h2>
            <p>Location:India</p>

      <p>Email:{data.email}</p>
      <p>Phone:{data.mobile}</p>
              <p>Proficient In</p>

      <ul className='myskills'>
        {data.skills.split(',').map(skills=>
            <li>*{skills}</li>
            )}
      </ul> 
      {/* <button class="view-profile-btn">View Profile</button> */}
    </div>  }
    <h4 className='ratingheader'>Rating & Reviews</h4>
    {review ?
      review.map(review=>
        <div className='rating'>
            <p>{review.taskprovider}</p>
            <p>{review.rating}/5</p>
        </div>
        ):
        <p>No Reviws Yet</p>
      }


  </div>
    </div>
  )
}

export default Myprofile