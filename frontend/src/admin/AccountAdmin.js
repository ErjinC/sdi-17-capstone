import React, {useState, useEffect} from 'react'
import './Admin.css'
import { ToastContainer, toast } from 'react-toastify';

const AccountAdmin = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/`)
    .then(res => res.json())
    .then((data) => {
        setUserList(data)
    })
  },[])

 

  const handleDelete = (userId) => {
    fetch(`http://localhost:3001/deleteUser/${userId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
  }

  return (
    <div>
      <div id='flexcontaineraccountlist'>
        {/* Map and iterate the following div */}
        {userList.map(item => {
          return (
          <div className='accountContainer'>
            <div className='accountInfoLeftContainer'>
              <div>Username: {item.username}</div>
              <div>First Name: {item.first_name}</div>
              <div>Last Name: {item.last_name}</div>
              <div>Admin Status: {item.admin ? <>True</> : <>False</>}</div>
            </div>
            <div className='accountInfoRightContainer'>
              <div>Phone #: {item.phone}</div>
              <div>Email: {item.email}</div>
              <div>Location: {item.base}</div>
              <span id='accountDeleteButton' className="material-symbols-outlined" onClick={() => {
                  if (window.confirm('Are you sure you want to delete this account?')) {
                    handleDelete(item.userId)
                    window.location='/admin'
                  }}}>delete</span> 
            </div>
            <div></div>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default AccountAdmin