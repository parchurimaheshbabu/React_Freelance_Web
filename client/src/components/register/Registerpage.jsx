import React ,{useState}from 'react'
import './Registerpage.css'
import axios from 'axios';
const Registerpage = () => {
  
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
    axios.post('http://localhost:4000/register',reg).then(
      res =>{
        alert('Registerd Successfully');
      }
    )
   

    // // Logging the updated state using a callback
    // setData(prevData => {
    //   console.log('Updated State:', prevData);
    //   return prevData;
    // });
    //  // Your original console.log statement
  }


  return (
<form className='regi' onSubmit={submitHandler}>
     <div className="register-container">
      <h2 className="register-heading">Register</h2>

      {/* Full Name input */}
      <label htmlFor="fullname" className="register-label" >
        Full Name:
      </label>
      <input type="text" id="fullname" name='fullname' className="register-input" placeholder="Enter your full name" onChange={changeHandler} required/>

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
        Register
      </button>
      <p>Already Have An Account <a href='login'>Sign in</a></p>
    </div>
    </form>
  );
    

    
}

export default Registerpage