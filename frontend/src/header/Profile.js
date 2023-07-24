import React, { useState } from 'react'
// import useAuth from '../useAuth.js'
import './Profile.css'

function Profile({currentUser}) {
  // const { currentUser, setCurrentUser } = useAuth();
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [editAdmin, setEditAdmin] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editPasswordCheck, setEditPasswordCheck] = useState('');
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState(''); 
  const [editBase, setEditBase] = useState();

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

  function resetPwDisplayHandler() {    //  Renders user password reset field based on button toggle
    setFlag(!flag)
    flag ? document.getElementById('user-edit-password-container').style.display = 'none'
      : document.getElementById('user-edit-password-container').style.display = 'block'
  }

  async function changePwHandler() {     //     Sends request to change user's password. Only if password is new to DB
    const putOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword: editPassword }),
    }

    if (editPassword === editPasswordCheck) {     //     Checks if password fields in frontend match
      let request = await fetch(`http://localhost:3001/updateUserPassword/${3}`, putOptions);
      let response = await request.json();
      console.log(response);

      response.success ? console.log('Password reset was a success!') : console.log('Error on Server Side')
    } else {
      return console.log('These passwords don\'t match');     //     Should return an alert frontend side. Not sure how to implement this rn
    }
  }

  function userEditDisplayHandler() {    //  Renders user profile edit fields based on button toggle
    setFlag2(!flag2);

    flag2 ? document.getElementById('user-edit-info-container').style.display='none' 
      : document.getElementById('user-edit-info-container').style.display='block'
  }

  function userEditHandler() {    //  Submits user inputted fields
    const newUserInfo = [editAdmin, editUsername, editFirstName, editLastName, editBase];
    
    const putOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newUserInfo: newUserInfo }),
    }
  }

  return(
    <div className='profile-container'>
      <h1 className='centered'>Welcome to your Profile Page</h1>
      <div className='user-info' id='userName-container'>
        <p id='userName'>Username: USERNAME</p>
        {/* <p id='userName'> Username: {auth[0].username}</p> */}
      </div>
      <div className='user-info' id='firstName-container'>
        <p id='firstName'>First Name: FIRST NAME</p>
        {/* <p id='userName'>First Name: {auth[0].first_name}</p> */}
      </div>
      <div className='user-info' id='lastName-container'>
        <p id='lastName'>Last Name: Last NAME</p>
        {/* <p id='userName'>Last Name: {auth[0].last_name}</p> */}
      </div>
      <div className='user-info' id='base-container'>
        <p id='base'>Base: BASE</p>
        {/* <p id='userName'>Base: {auth[0].base}</p> */}
      </div>
      <div className='user-info' id='rating-container'>
        <p id='rating'>User Rating: * * * * *</p>
      </div>
      <div className='profile-edit-options'>
        <button onClick={resetPwDisplayHandler}>Change Password</button>
          <div id='user-edit-password-container'>      {/* Being conditionally rendered on line 22*/}
            <div className='user-edit-password'>
              <input type='text' onChange={(e) => setEditPassword(e.target.value)} ></input>
            </div>
            <div className='user-edit-password'>
              <input type='text' onChange={(e) => setEditPasswordCheck(e.target.value)} ></input>
            </div>
            <div>
              <button onClick={changePwHandler}>Submit</button>
            </div>
          </div>
      </div>
      <div className='profile-edit-options'>
        <button onClick={userEditDisplayHandler}>Edit your information</button>
        <div id='user-edit-info-container'>      {/* Being conditionally rendered on line 29*/}
          <div className='user-edit-info'>
            <label>Admin Status? </label>
            <select onChange={(e) => { 
              let boolValue = (e.target.value == 'true');
              setEditAdmin(boolValue)
              }}>
              <option value='false'>No</option>
              <option value='true'>Yes</option>
            </select>
          </div>
          <div className='user-edit-info'>
            <label>New Username: </label>
            <input type='text' onChange={(e) => setEditUsername(e.target.value)} ></input>
          </div>
          <div className='user-edit-info'>
            <label>First Name: </label>
            <input type='text' onChange={(e) => setEditFirstName(e.target.value)} ></input>
          </div>
          <div className='user-edit-info'>
            <label>Last Name: </label>
            <input type='text' onChange={(e) => setEditLastName(e.target.value)} ></input>
          </div>
          <div className='user-edit-info'>
            <label>Base: </label>
            <select>
              <option value='sample1'>SAMPLE 1</option>
              <option value='sample2'>SAMPLE 2</option>
              <option value='sample3'>SAMPLE 3</option>
            </select>
          </div>
          <div>
            <button onClick={userEditHandler}>Submit Changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;