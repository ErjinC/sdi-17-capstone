import React from 'react'
import './Header.css'

function openNav() { //Drives animation
  document.getElementById("sidenav").style.height = "100%";  
}
function closeNav() {
  document.getElementById("sidenav").style.height = "0%";
}

const Header = () => {
  return (
    <div id="flexcontainerheader">
      <div>
        <div onClick={() => {openNav()}}>Add dropdown here?</div>

        <div id='sidenav'>
          <div onClick={() => {closeNav()}}>Close the nav</div>
          <div>Drop down 1</div>
          <div>Drop down 2</div>
          <div>Drop down 3</div>
        </div>

      </div>

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