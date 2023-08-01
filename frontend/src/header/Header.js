import React from 'react'
import './Header.css'
import { stack as Menu } from 'react-burger-menu'
import { ParentContext } from '../App'
import { ChakraProvider, Avatar, Divider } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

const Header = () => {

  const {currentUser} = React.useContext(ParentContext)

  return (
    <ChakraProvider>
    <div id="flexcontainerheader">
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        {currentUser.success ? <a id="profile" className="menu-item" href="/profile">Profile</a>: <></>}
        {currentUser.success ? <a id="listings" className="menu-item" href="/listings">My Listings</a> : <></>}
        {currentUser.admin ? <a id="admin" className="menu-item" href="/admin">Admin</a> : <></>}
        {currentUser.success ? <a id="logout" className="menu-item" href="/login" onClick={() => sessionStorage.clear()}>Logout</a>: <a id="login" className="menu-item" href="/login">Login</a>}
        {currentUser.success ? <></> : <a id="register" className="menu-item" href="/register">Register</a>}
      </Menu>

      <div id="title" onClick={() => window.location = "/"}>
        Lemon Drop - The Vehicle Repo
      </div>

      <div className='userHeader'>
        <div className='avatarHeader' style={{justifySelf: "center"}} onClick={() => currentUser.success ? window.location = '/profile' : ''}>
          {currentUser.success ? <div id='welcome'><Avatar size="xs" bg="#ff8400" name={`${currentUser.first_name} ${currentUser.last_name}`} src='https://bit.ly/broken-link' /></div> : <></>}
          {currentUser.success ? <div id='welcome'>{`${currentUser.first_name} ${currentUser.last_name}`}</div> : <div id='welcome' onClick={() => window.location = '/login'}>Log in</div>}
        </div>
        <Divider />
        <div>
          {currentUser.success ? <div id='welcome'><ChevronRightIcon />{currentUser.base}</div> : <div id='welcome'>You are not logged in</div>}
        </div>
      </div>
    </div>
    </ChakraProvider>
  )
}

export default Header;