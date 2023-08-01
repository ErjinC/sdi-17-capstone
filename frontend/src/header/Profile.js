import React, { useState, useEffect, useContext } from 'react'
import './Profile.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoritesDisplay from '../favorites/FavoritesDisplay';
import { ParentContext } from '../App';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, ChakraProvider,
  Editable, Select, Stack, Input, Tooltip} from '@chakra-ui/react'

function Profile() {
  const [editUsername, setEditUsername] = useState(JSON.parse(sessionStorage.getItem('CurrentUser')).username)
  const [editPassword, setEditPassword] = useState('');
  const [editPasswordCheck, setEditPasswordCheck] = useState('');
  const [editFirstName, setEditFirstName] = useState(JSON.parse(sessionStorage.getItem('CurrentUser')).first_name);
  const [editLastName, setEditLastName] = useState(JSON.parse(sessionStorage.getItem('CurrentUser')).last_name); 
  const [editBase, setEditBase] = useState(JSON.parse(sessionStorage.getItem('CurrentUser')).base);
  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const {currentUser, setCurrentUser} = useContext(ParentContext);
  // const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
  // const { isOpen: isOpenPassword, onOpen: onOpenPassword, onClose: onClosePassword } = useDisclosure()
  const edit = useDisclosure()
  const changePass = useDisclosure()
  const { locations } = useContext(ParentContext)

  useEffect(() => {
    if (sessionStorage.getItem('CurrentUser') === null) {
      window.location='/'
    }
  }, [])

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
          className: 'toast-message',
          onClose: () => window.location.reload()
        })
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

  async function userEditHandler() {    //  Submits user inputted fields
    
    const putOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
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
        className: 'toast-message',
        onClose: () => window.location.reload()
      });
    } else {
      toast.error('Please fill in both fields', {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'toast-message'
      });
    }
  }

  async function deleteUserHandler() {     //     Delete user's account & navigate back to homepage
    if (window.confirm('Are you SURE you want to delete your account??')) {
      const delOptions = {
        method: 'DELETE'
      }

      let deleteOperation = await fetch(`http://localhost:3001/deleteUser/${currentUser.userId}`, delOptions);
      let response = await deleteOperation.json();

      if(response.success) {
        toast.success('Account Deleted. Sorry to see you go :(', {
          position: toast.POSITION.BOTTOM_CENTER,
          onClose: () => {
            sessionStorage.clear();
            window.location='/'
          }
        })
      } else toast.error('Delete Account failed, please try again later');
    }
  }

  return(
    <ChakraProvider>
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
          <Stack>
            <Button onClick={changePass.onOpen}>Change Password</Button>
            <Button onClick={edit.onOpen}>Edit Information</Button>
            <Button id='deleteBtn' onClick={deleteUserHandler}>Delete Account</Button>
          </Stack>
          <div className='profile-edit-options'>
            {/* -------------------- Change Password -------------------- */}
            <Modal isOpen={changePass.isOpen} onClose={changePass.onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader className='centered'>Change Password</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className='user-edit-password'>
                    <label id='changePasswordLabel'>New Password: </label>
                    <Editable>
                      <Input id='changePassword' type={show ? 'text' : 'password'} onChange={(e) => setEditPassword(e.target.value)} />
                      <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</Button>
                    </Editable>
                  </div>
                  <div className='user-edit-password'>
                    <label id="changePasswordCheckLabel">Confirm New Password: </label>
                    <Editable>
                      <Input id='changePasswordCheck' type={showConfirm ? 'text' : 'password'} onChange={(e) => setEditPasswordCheck(e.target.value)} />
                      <Button h='1.75rem' size='sm' onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? 'Hide' : 'Show'}</Button>
                    </Editable>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div className='modal-edit-submit-button-container'>
                    <Button className='modal-edit-submit-button' colorScheme='blue' mr={0} onClick={changePass.onClose}> Close </Button>
                    <Button className='modal-edit-submit-button' variant='ghost' id='edit-submit-button' onClick={changePwHandler}> Submit Changes </Button>
                  </div>
                </ModalFooter>
              </ModalContent>
            </Modal>
            {/* -------------------- End of Change Password -------------------- */}
          
            {/* -------------------- Edit Information -------------------- */}
            <Modal isOpen={edit.isOpen} onClose={edit.onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader className='centered'>Edit User Information</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className='user-edit-info-container'>
                    <div className='user-edit-info'>
                      <label>New Username: </label>
                      <Editable >
                        <Input defaultValue={currentUser.username} onChange={(e) => setEditUsername(e.target.value)} />
                      </Editable>
                    </div>
                    <div className='user-edit-info'>
                      <label>First Name: </label>
                      <Editable >
                        <Input defaultValue={currentUser.first_name} onChange={(e) => setEditFirstName(e.target.value)} />
                      </Editable>
                    </div>
                    <div className='user-edit-info'>
                      <label>Last Name: </label>
                      <Editable>
                        <Input defaultValue={currentUser.last_name} onChange={(e) => setEditLastName(e.target.value)} />
                      </Editable>
                      <label>Base: </label>
                      <Select defaultValue={currentUser.base} onChange={(e) => setEditBase(e.target.value)}>
                        {locations?.map((baseOption) => <option value={baseOption.name}>{baseOption.name}</option>)}
                      </Select>
                    </div>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <div className='modal-edit-submit-button-container'>
                    <Button className='modal-edit-submit-button' colorScheme='blue' mr={0} onClick={edit.onClose}> Close </Button>
                    <Button className='modal-edit-submit-button' variant='ghost' id='edit-submit-button' onClick={userEditHandler}> Submit Changes </Button>
                  </div>
                </ModalFooter>
              </ModalContent>
            </Modal>
            {/* -------------------- End of Edit Information -------------------- */}
          </div>
        </div>
        <ToastContainer autoClose={1500}/>
        <div id='favoriteListContainer'>
          <div id='favoriteTitle'>Your Favorited Listings:</div>
          <div id='favoriteList'>
            <FavoritesDisplay />
          </div>
        </div>
      </div>
    </ChakraProvider>
  )
}

export default Profile;