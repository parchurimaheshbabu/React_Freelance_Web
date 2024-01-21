import React, { useState } from 'react';
import './loginpage.css';
import { Navigate  } from 'react-router-dom';
import axios from 'axios';
const Loginpage = () => {
  const [auth,setAuth]=useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const changeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log(data);
    axios.post('http://localhost:4000/login',data).then(
      res => {
        localStorage.setItem('token',res.data.token);
        setAuth(true);
      }
      // console.log(res.data)
    )
  

    // Logging the updated state using a callback
    // setData(prevData => {
    //   console.log('Updated State:', prevData);
    //   return prevData;
    // });

    // Your original console.log statement
    // axios.post('http://localhost:4000/login',data).then(res=>console.log(res.data))
   
  };
  
// if (localStorage.getItem('token')){
//   return <redirect to= '/dashboard'/>
// }
  if (auth) {
return <Navigate to='/dashboard' />
  }
 

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="login-container">
        <h2>Login</h2>

        {/* Email input */}
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" onChange={changeHandler} />

        {/* Password input */}
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" onChange={changeHandler} />

        {/* Login button */}
        <button type="submit" className="login">
          Login
        </button>

        {/* Link to register */}
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </form>
  );
};

export default Loginpage;
