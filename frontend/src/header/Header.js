import React, { useState } from 'react'
import './Header.css'
import { stack as Menu } from 'react-burger-menu'
import { ParentContext } from '../App'
import { ChakraProvider, Avatar, Divider } from '@chakra-ui/react'
import { ChevronRightIcon, HamburgerIcon } from '@chakra-ui/icons'

const Header = () => {

  const { currentUser } = React.useContext(ParentContext)
  const [showSidebar, setShowSidebar] = useState('hide')

  const handleSideBarToggle = () => {
    if (showSidebar === 'show') {
      setShowSidebar('hide')
    } else {
      setShowSidebar('show')
    }
  }

  return (
    <ChakraProvider>
      <div id="flexcontainerheader">

      <HamburgerIcon viewBox={'0 0 24 24'} boxSize={'3em'} onClick={() => { handleSideBarToggle() }} id='hamborgerButton'/>

        <div id="title" onClick={() => window.location = "/"}>
          Lemon Drop
        </div>

        <div className='userHeader'>
          <div className='avatarHeader' style={{ justifySelf: "center" }} onClick={() => currentUser.success ? window.location = '/profile' : ''}>
            {currentUser.success ? <div id='welcome'><Avatar size="xs" bg="#ff8400" name={`${currentUser.first_name} ${currentUser.last_name}`} /></div> : <></>}
            {currentUser.success ? <div id='welcome'>{`${currentUser.first_name} ${currentUser.last_name}`}</div> : <div id='welcome' onClick={() => window.location = '/login'}>Log in</div>}
          </div>
          <Divider />
          <div>
            {currentUser.success ? <div id='welcome'><ChevronRightIcon />{currentUser.base}</div> : <div id='welcome'>You are not logged in</div>}
          </div>
        </div>
      </div>

      <nav className={`sidebar ${showSidebar}`}>
        <div id='sidebarSplashContainer'>
          <img id='splashImage' src={require('../images/lemonlogo.png')} alt="Site Logo" />
          <div id="splashText">Lemon Drop</div>
        </div>
        <div className="menu-content">
          <ul className="menu-items">
            <li className={`item ${showSidebar}`} id='item0' onClick={() => { window.location = '/' }}>Home</li>
            {currentUser.success ? <li className={`item ${showSidebar}`} id='item1' onClick={() => { window.location = 'login'; sessionStorage.clear() }}>Logout</li>
              : <li className={`item ${showSidebar}`} id='item1' onClick={() => { window.location = 'login'; }}>Login</li>}
            {currentUser.success ? <></> : <li className={`item ${showSidebar}`} id='item2' onClick={() => { window.location = 'register' }}>Register</li>}
            {currentUser.success ? <li className={`item ${showSidebar}`} id='item2' onClick={() => { window.location = 'profile' }}>Profile</li> : <></>}
            {currentUser.success ? <li className={`item ${showSidebar}`} id='item3' onClick={() => { window.location = 'listings' }}>My Listings</li> : <></>}
            {currentUser.admin ? <li className={`item ${showSidebar}`} id='item5' onClick={() => { window.location = 'admin' }}>Admin</li> : <></>}
          </ul>
        </div>
      </nav>
    </ChakraProvider>
  )
}

export default Header;