import React, { useState } from 'react'
import useAuth from '../useAuth.js'
import './Profile.css'

function Profile() {
  const { auth, setAuth } = useAuth();
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [editAdmin, setEditAdmin] = useState(false);

//   const dummy = [{         //     call this data with auth[0].userId, auth[0].username, etc.
//     "userId": 1,
//     "admin": true,
//     "username": "1234",
//     "password": "1234",
//     "first_name": "Larry", // auth[0].first_name
//     "last_name": "Llama",
//     "base": "Beale AFB",
//     "favorites": "1,2,3,4,5"
// }]

  function pwHandler() {
    console.log('clicked PW Handler button')
    setFlag(!flag)
    if(flag2) {
      document.getElementById('user-edit-password-container').style.display='none';
    } else {
      document.getElementById('user-edit-password-container').style.display='block';
    }
  }

  function userEditHandler() {
    
    console.log('clicked User Edit Handler button');
    setFlag2(!flag)
    if(flag) {
      document.getElementById('user-edit-info-container').style.display='none';
    } else {
      document.getElementById('user-edit-info-container').style.display='block';
    }
    return (
      <></>
    ) 
  }

  return(
    <div className='profile-container'>
      <div className='user-info' id='userName-container'>
        <p id='userName'>USERNAME</p>
      </div>
      <div className='user-info' id='firstName-container'>
        <p id='firstName'>FIRST NAME</p>
      </div>
      <div className='user-info' id='lastName-container'>
        <p id='lastName'>Last NAME</p>
      </div>
      <div className='user-info' id='base-container'>
        <p id='base'>BASE</p>
      </div>
      <div className='user-info' id='rating-container'>
        <p id='rating'>RATING</p>
      </div>
      <div className='profile-edit-option'>
        <button onClick={pwHandler}>Change Password</button>

        <div id='user-edit-password-container'>
          <div className='user-edit-password'>
            <input type='text' onChange={console.log('hey')} ></input>
          </div>
        </div>
        
      </div>
      <div className='profile-edit-option'>
        <button onClick={userEditHandler}>Edit your information</button>
        <div className='user-edit-info'>
            <input type='text' onChange={console.log('hey')} ></input>
        </div>
          {/* <div claseName='user-edit-info'></div>
          <div claseName='user-edit-info'></div>
          <div claseName='user-edit-info'></div>
          <div claseName='user-edit-info'></div>
          <div claseName='user-edit-info'></div> */}
      </div>
    </div>
  )
}

export default Profile;