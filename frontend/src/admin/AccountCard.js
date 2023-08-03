import React, { useState, useEffect } from 'react'
import './Admin.css'
import { ToastContainer, toast } from 'react-toastify';
import { ChakraProvider, Tooltip } from '@chakra-ui/react';

const AccountCard = ({user}) => {
    const [adminStatus, setAdminStatus] = useState(user.admin)
    const [deleted, setDeleted] = useState(false)

    const handleDelete = () => {
        fetch(`http://localhost:3001/deleteUser/${user.userId}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
        })
        .then(setDeleted(!deleted))
    }
    
    const handleAdminAdd = () => {
        setAdminStatus(true);
        fetch(`http://localhost:3001/admin/${user.userId}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              admin: true
            })
        })
    }

    const handleAdminRemove = () => {
        setAdminStatus(false);
        fetch(`http://localhost:3001/admin/${user.userId}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              admin: false
            })
        })
    }

    return (
        <ChakraProvider>
            {deleted ? <></> : 
                <div className='accountContainer'>
                    <div className='accountInfoLeftContainer'>
                        <div class="adminAccountsItem"><strong>Username:</strong><p>{user.username}</p></div>
                        <div class="adminAccountsItem"><strong>First Name:</strong><p>{user.first_name}</p></div>
                        <div class="adminAccountsItem"><strong>Last Name:</strong><p>{user.last_name}</p></div>
                    </div>
                    <div className='accountInfoRightContainer'>
                        <div class="adminAccountsItem"><strong>Phone:</strong><p>{user.phone}</p></div>
                        <div class="adminAccountsItem"><strong>Email:</strong><p>{user.email}</p></div>
                        <div class="adminAccountsItem"><strong>Location:</strong><p>{user.base}</p></div>
                        <span id='accountDeleteButton' className="material-symbols-outlined" onClick={(event) => {
                            if (window.confirm('Are you sure you want to delete this account?')) {
                                handleDelete()
                            }
                        }}><Tooltip openDelay={500} hasArrow label="Delete Account">delete</Tooltip></span>
                        {adminStatus?<span id="adminModeratorRemove" className="material-symbols-outlined" onClick={()=>{handleAdminRemove()}}><Tooltip openDelay={500} hasArrow label="Remove Admin Status">remove_moderator</Tooltip></span>
                        :<span id="adminModeratorAdd" className="material-symbols-outlined" onClick={()=>{handleAdminAdd()}}><Tooltip openDelay={500} hasArrow label="Grant Admin Status">add_moderator</Tooltip></span>}
                    </div>
                </div>
            }
        </ChakraProvider>
    )
}

export default AccountCard