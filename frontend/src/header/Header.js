import React from 'react'
import './Header.css'
import { stack as Menu } from 'react-burger-menu'
import { ParentContext } from '../App'

const Header = () => {

  const {currentUser} = React.useContext(ParentContext)

  return (
    <div id="flexcontainerheader">
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        {currentUser.success ? <a id="profile" className="menu-item" href="/profile">Profile</a>: <></>}
        {currentUser.success ? <a id="listings" className="menu-item" href="/listings">My Listings</a> : <></>}
        {currentUser.success ? <a id="logout" className="menu-item" href="/login" onClick={() => sessionStorage.clear()}>Logout</a>: <a id="login" className="menu-item" href="/login">Login</a>}
        {currentUser.success ? <></> : <a id="register" className="menu-item" href="/register">Register</a>}
      </Menu>

      <div id="title">
        Lemon Drop - The Vehicle Repo
      </div>

      <div>
        {currentUser.success ? <div id='welcome'>Welcome, {currentUser.first_name}</div> : <div id='welcome'>You are currently<br></br>logged out!</div>}
      </div>
    </div>
  )
}

export default Header;