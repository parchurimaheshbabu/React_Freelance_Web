import React from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

const Updateprofile = () => {

    const id=localStorage.getItem('userid')

const [reg, setReg] = useState({
  fullname:'',  
  email: '',
  mobile:'',
  skills:'',
   password: '',
   confirmpassword:''
  });

  const changeHandler = e => {
    setReg({ ...reg, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
     console.log('Original State:', reg);
    axios.put(`http://localhost:4000/update/${id}`,reg).then(
      res =>{
        alert('updated Successfully');
      }
    )
    }

     if (!localStorage.getItem('token')){
        return <Navigate to='/login'/>
    }
  return (
<form className='regi' onSubmit={submitHandler}>
     <div className="register-container">
      <h2 className="register-heading">Edit Profile</h2>

      {/* Full Name input */}
      <label htmlFor="fullname" className="register-label" >
        Full Name:
      </label>
      <input type="text" id="fullname" name='fullname' className="register-input" placeholder="Enter your full name"  onChange={changeHandler} required/>

      {/* Email input */}
      <label htmlFor="email" className="register-label">
        Email:
      </label>
      <input type="email" id="email" className="register-input" name='email' placeholder="Enter your email" onChange={changeHandler} required/>

      {/* Mobile input */}
      <label htmlFor="mobile" className="register-label">
        Mobile:
      </label>
      <input type="text" id="mobile" name='mobile' className="register-input" placeholder="Enter your mobile number" onChange={changeHandler} required/>

      {/* Skills input */}
      <label htmlFor="skills" className="register-label">
        Skills:
      </label>
      <input type="text" id="skills" className="register-input" name='skills' placeholder="Enter your skills" onChange={changeHandler} required />
<p>please provide skills by separation of comma(,)</p>
      {/* Password input */}
      <label htmlFor="password" className="register-label">
        Password:
      </label>
      <input type="password" id="password" className="register-input"  name='password' placeholder="Enter your password"onChange={changeHandler} required />

      {/* Confirm Password input */}
      <label htmlFor="confirmpassword" className="register-label">
        Confirm Password:
      </label>
      <input
        type="password"
        id="confirmpassword"
        name='confirmpassword'
        className="register-input"
        placeholder="Confirm your password" required
        onChange={changeHandler}
      />

      {/* Register button */}
      <button className="register-button"  type='submit'>
        Edit
      </button>
      <p>To View Updation Go To <a href='/myprofile'>Profile</a></p>
    </div>
    </form>
    )
}

export default Updateprofile;