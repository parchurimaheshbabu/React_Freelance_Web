import React, { useState } from 'react';
import { Link ,Navigate} from 'react-router-dom';
import axios from 'axios';
import './deleteaccount.css'
const Deleteaccount = () => {
  const id = localStorage.getItem('userid');
        const token = localStorage.getItem('token');

  const [confirmation, setConfirmation] = useState('');
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleChange = (e) => {
    const userInput = e.target.value.toLowerCase();
    setConfirmation(userInput);
    setShowDeleteButton(userInput === 'yes');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const config = {
        headers: {
          'x-token': token,
        },
      };

    if (showDeleteButton) {
      // Perform deletion logic here
      axios.delete(`http://localhost:4000/delete/${id}`,config).then((res) => {
                      return <Navigate to='/login'/>
  

        // Additional actions after successful deletion
      });
                //  return <Navigate to='/dashboard'></Navigate>

    }


  };
 if (!localStorage.getItem('token')){
        return <Navigate to='/login'/>
    }
  return (
          <form onSubmit={submitHandler} >

    <div className='read'>
     
        <h3>Account Deletion Confirmation:</h3>
        <p>
          Before you proceed with account deletion, please take a moment to
          review the following information:
        </p>

        <ol>
          <li>
            <strong>Data Loss:</strong> Deleting your account will result in
            the permanent loss of all associated data, including profile
            information, settings, and any content you've shared on the
            platform.
          </li>
          <li>
            <strong>Recovery:</strong> Once your account is deleted, it cannot
            be recovered. If you ever wish to use our services again, you'll
            need to create a new account.
          </li>
          <li>
            <strong>Connected Services:</strong> If your account is linked to
            any third-party services, such as social media accounts, consider
            the impact on those services.
          </li>
        </ol>

        <h3>Please Confirm:</h3>
        <p>
          To proceed with account deletion, please enter "yes" for
          verification:
        </p>
        <input
          type='text'
          id='confirm'
          placeholder='Enter yes  to proceed to Delete'
          value={confirmation}
          onChange={handleChange}
        ></input>
        {showDeleteButton && (
          <>
            <button type='submit' className='del' onClick={()=>localStorage.removeItem('token')} >Delete</button>
            <p>
              <strong>Note:</strong> By clicking "Delete," you acknowledge and
              confirm the irreversible deletion of your account and associated
              data.
            </p>
          </>
        )}

        <h3>Cancel:</h3>
        <p>
          If you've changed your mind and wish to keep your account, you can{' '}
          <Link to='/myprofile'>Cancel Deletion</Link>.
        </p>

        <h3>Contact Support:</h3>
        <p>
          If you have any concerns or encounter issues, please{' '}
          <a href='mailto:support@example.com'>contact support</a>.
        </p>

        <p>
          Thank you for being a part of our community. We appreciate your
          understanding.
        </p>
    </div>
          </form>

  );
};

export default Deleteaccount;
