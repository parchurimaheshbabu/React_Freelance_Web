import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './individualprofile.css';

const Individualprofile = () => {
  const { fullname, email, mobile, id } = useParams();
const[rating,setRating]=useState(null);
  // const [taskprovider,setTaskprovider]=useState(null);

  const submitHandler = e => {
// axios.get('http://localhost:4000/myprofile',{
//   headers:{
//     'x-token':localStorage.getItem('token')
//   }
// }).then(res =>setTaskprovider(res.data.fullname))
let review={
  // taskprovider,
  taskworker:id,
  rating
}

   axios.post('http://localhost:4000/addreview',review,{
headers:{
  'x-token':localStorage.getItem('token')
}
}).then(res=>alert('Rating Added'))
  }
  return (
    <>
          
          <form onSubmit={submitHandler}>

    <div className='singleprf'>
      <nav>
        <h1 className='header'>Developers Hub</h1>
        <div className='links'>
          <Link to='/dashboard'>Profiles</Link>
          <Link to='/login' onClick={() => localStorage.removeItem('token')}>
            Logout
          </Link>
        </div>
      </nav>

      <div className='container'>
        <div className='myprofile'>
          <img
            className='profile-img'
            src='https://via.placeholder.com/100'
            alt='Profile'
          />
          <h2>{fullname}</h2>
          <p>{email}</p>
          <p>{mobile}</p>
          <p>{id}</p>
          <p>India</p>
        </div>
      </div>

        <input
          type='text'
          placeholder='Enter your rating out of 5'
          name='rating'
          
          onChange={e=>setRating(e.target.value)}
          required
        />
        <button type='submit' id='radd'>
          Add
        </button>
      
    </div>
          </form>
</>
    
  );
};

export default Individualprofile;
