import React, { useState, useEffect } from 'react'
import './Profile.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoritesDisplay from '../favorites/FavoritesDisplay';
import { ParentContext } from '../App';

function Profile() {
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [editAdmin, setEditAdmin] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editPasswordCheck, setEditPasswordCheck] = useState('');
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState(''); 
  const [editBase, setEditBase] = useState();
  const {currentUser, setCurrentUser} = React.useContext(ParentContext);

  useEffect(() => {
    if (sessionStorage.getItem('CurrentUser') === null) {
      window.location='/'
    }

  }, [])

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
      let request = await fetch(`http://localhost:3001/updateUserPassword/${currentUser.userId}`, putOptions);
      let response = await request.json();

      if(response.success) {     //     Notifies user of their password reset status
        toast.success('Password reset was a success!', {
          position: toast.POSITION.BOTTOM_CENTER,
          className: 'toast-message'
        })
        window.location.reload();
      } else  {
        toast.error('Error, please try again later', {
          position: toast.POSITION.BOTTOM_CENTER,
          className: 'toast-message'
        })
      }
    } else {
      return toast.error('Password not set. These passwords don\'t match', {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'toast-message'
      })
    }
  }

  function userEditDisplayHandler() {    //  Renders user profile edit fields based on button toggle
    setFlag2(!flag2);

    flag2 ? document.getElementById('user-edit-info-container').style.display='none' 
      : document.getElementById('user-edit-info-container').style.display='block'
  }

  async function userEditHandler() {    //  Submits user inputted fields
    
    const putOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        newAdminStatus: editAdmin,
        newUsername: editUsername,
        newFirstName: editFirstName,
        newLastName: editLastName,
        newBase: editBase,
      }),
    }

    const request = await fetch(`http://localhost:3001/updateUserInfo/${currentUser.userId}`, putOptions);
    const response = await request.json();

    if (response.success) {
      setCurrentUser({
        admin: response.newAdminStatus,
        userId: currentUser.userId,
        username: response.newUsername,
        first_name: response.newFirstName,
        last_name: response.newLastName,
        base: response.newBase
      });
      let oldSession = JSON.parse(sessionStorage.getItem('CurrentUser'))
      // console.log(oldSession)
      sessionStorage.setItem('CurrentUser', JSON.stringify({
        admin: response.newAdminStatus,
        userId: oldSession.userId,   
        username: response.newUsername,
        first_name: response.newFirstName,
        last_name: response.newLastName,
        base: response.newBase,
        favorites: oldSession.favorites,  
        success: response.success
      }));
      toast.success('Updated user info', {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'toast-message'
      });
      window.location.reload()
    } else {
      toast.error('Please fill in both fields', {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'toast-message'
      });
    }
  }

  async function deleteUserDisplayHandler() {     //     Delete user's account & navigate back to homepage
    if (window.confirm('Are you SURE you want to delete your account??')) {
      const delOptions = {
        method: 'DELETE'
      }

      let deleteOperation = await fetch(`http://localhost:3001/deleteUser/${currentUser.userId}`, delOptions);
      let response = await deleteOperation.json();

      if(response.success) {
        sessionStorage.clear();
        window.location='/'
      } else toast('Delete Account failed, please try again later');
    }
  }

  return(
    <div className='profile-container'>
      <div className='profiledetails'>
        <h1 className='centered'>Welcome to your Profile Page, {currentUser.first_name}</h1>
        <div className='user-info' id='userName-container'>
          <h4>Username:</h4><p className='info'> {currentUser.username}</p>
        </div>
        <div className='user-info' id='firstName-container'>
          <h4>First Name:</h4><p className='info'> {currentUser.first_name}</p>
        </div>
        <div className='user-info' id='lastName-container'>
          <h4>Last Name:</h4><p className='info'>{currentUser.last_name}</p>
        </div>
        <div className='user-info' id='base-container'>
          <h4>Base:</h4><p className='info'>{currentUser.base}</p>
        </div>
        <div className='user-info' id='rating-container'>
          <h4 id='rating'>User Rating:</h4>
          <div className='ratinginfo'>
            <span className="material-symbols-outlined">star</span>
            <span className="material-symbols-outlined">star</span>
            <span className="material-symbols-outlined">star</span>
            <span className="material-symbols-outlined">star</span>
            <span className="material-symbols-outlined">star_half</span>
          </div>
        </div>
        <div className='profile-edit-options'>
          <button id='passwordBtn' onClick={resetPwDisplayHandler}>Change Password</button>
            <div id='user-edit-password-container'>      {/* Being conditionally rendered on line 24*/}
              <div className='user-edit-password'>
                <label>New Password: </label>
                <input type='text' onChange={(e) => setEditPassword(e.target.value)} ></input>
              </div>
              <div className='user-edit-password'>
                <label>Confirm New Password: </label>
                <input type='text' onChange={(e) => setEditPasswordCheck(e.target.value)} ></input>
              </div>
              <div>
                <button id='passSubmit' onClick={changePwHandler}>Submit</button>
              </div>
            </div>
        </div>
        <div className='profile-edit-options'>
          <button id='editBtn' onClick={userEditDisplayHandler}>Edit your information</button>
          <div id='user-edit-info-container'>      {/* Being conditionally rendered */}
            <div className='user-edit-info'>
              <label>Admin Status? </label>
              <select onChange={(e) => { 
                let boolValue = (e.target.value === true);
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
              <select onChange={(e) => setEditBase(e.target.value)}>
                <option value=''></option>     {/* SAMPLE DATA - FILL THIS LATER */}
                <option value='Los Angeles SFB'>Los Angeles SFB</option>     
                <option value='Peterson SFB'>Peterson SFB</option>
                <option value='Keesler AFB'>Keesler AFB</option>
              </select>
            </div>
            <div>
              <button id='edit-submit-button' onClick={userEditHandler}>Submit Changes</button>
            </div>
          </div>
          <div id='user-delete-info-container'>
            <button id='deleteBtn' onClick={deleteUserDisplayHandler}>Delete Account</button>
          </div>
        </div>
      </div>
      <ToastContainer />
      <div id='favoriteListContainer'>
        <div id='favoriteTitle'>Your Favorited Listings:</div>
        <div id='favoriteList'>
          <FavoritesDisplay /> 
        </div>
      </div>
    </div>
  )
}

export default Profile;