import React, {useState, useEffect} from 'react'
import './Admin.css'
import { ToastContainer, toast } from 'react-toastify';
import AccountCard from './AccountCard';

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
        {userList.map((item, i) => {
          return(
            <AccountCard key={i} user={item}/>
          )
        })}
      </div>
    </div>
  )
}

export default AccountAdmin