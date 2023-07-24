import React from 'react'
import './Header.css'
import { stack as Menu } from 'react-burger-menu'

const Header = () => {
  return (
    <div id="flexcontainerheader">
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="login" className="menu-item" href="/login">Login</a>
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