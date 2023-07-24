import React from 'react'
import './Header.css'
import { stack as Menu } from 'react-burger-menu'
import useAuth from '../useAuth.js'

const Header = () => {
  const { auth } = useAuth(false);

  return (
    <div id="flexcontainerheader">
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        {auth ? <></> : <a id="login" className="menu-item" href="/login">Login</a>}
      </Menu>

      <div>
        Lemon Drop - The Vehicle Repo
      </div>

      <div>
        Hello, USERNAME!
      </div>
    </div>
  )
}

export default Header;