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
    setFlag(!flag)
    flag ? document.getElementById('user-edit-password-container').style.display='none' 
      : document.getElementById('user-edit-password-container').style.display='block'
  }

  function userEditHandler() {    //  Add fetch for a list of all Bases (for select options ~line 85)
    setFlag2(!flag2);

    flag2 ? document.getElementById('user-edit-info-container').style.display='none' 
      : document.getElementById('user-edit-info-container').style.display='block'
  }

  return(
    <div className='profile-container'>
      <h1 className='centered'>Welcome to your Profile Page</h1>
      <div className='user-info' id='userName-container'>
        <p id='userName'>Current Username: USERNAME</p>
        {/* <p id='userName'>Current Username: {auth[0].username}</p> */}
      </div>
      <div className='user-info' id='firstName-container'>
        <p id='firstName'>FIRST NAME</p>
        {/* <p id='userName'>Current Username: {auth[0].first_name}</p> */}
      </div>
      <div className='user-info' id='lastName-container'>
        <p id='lastName'>Last NAME</p>
        {/* <p id='userName'>Current Username: {auth[0].last_name}</p> */}
      </div>
      <div className='user-info' id='base-container'>
        <p id='base'>BASE</p>
        {/* <p id='userName'>Current Username: {auth[0].base}</p> */}
      </div>
      <div className='user-info' id='rating-container'>
        <p id='rating'>RATING</p>
      </div>
      <div className='profile-edit-options'>
        <button onClick={pwHandler}>Change Password</button>
          <div id='user-edit-password-container'>      {/* Being conditionally rendered on line 22*/}
            <div className='user-edit-password'>
              <input type='text' onChange={console.log('hey')} ></input>
            </div>
          </div>
      </div>
      <div className='profile-edit-options'>
        <button onClick={userEditHandler}>Edit your information</button>
        <div id='user-edit-info-container'>      {/* Being conditionally rendered on line 29*/}
          <div className='user-edit-info'>
            <label>Admin Status? </label>
            <select>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </div>
          <div className='user-edit-info'>
            <label>New Username: </label>
            <input type='text' onChange={console.log('hey')} ></input>
          </div>
          <div className='user-edit-info'>
            <label>First Name: </label>
            <input type='text' onChange={console.log('hey')} ></input>
          </div>
          <div className='user-edit-info'>
            <label>Last Name: </label>
            <input type='text' onChange={console.log('hey')} ></input>
          </div>
          <div className='user-edit-info'>
            <label>Base: </label>
            <select>
              <option>SAMPLE</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;