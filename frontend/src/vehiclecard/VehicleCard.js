import React from 'react'
import './VehicleCard.css'

const VehicleCard = () => {

  return (
    <div id='flexcontainervehiclecard'>

      {/* iterate this */}
      <div
        id='individualcard'
        onClick={() => {
          document.getElementById('individualcarddetails').style.display="block"
          document.getElementById('individualcarddetailsoverlay').style.display="block"
        }}> 
        <img alt='Vehicle' src='https://placekitten.com/250/250'></img>
        <div>User Info</div>
        <div>Vehicle Info</div>
        <div>Cost, miles, color, model, etc.</div>
        <div>User Rating</div>

        <div
          id='individualcarddetailsoverlay'
          onClick={() => {
            document.getElementById('individualcarddetails').style.display="none"
            document.getElementById('individualcarddetailsoverlay').style.display="none"
          }}>
          <div id='individualcarddetails'>
            <div>Stuff in da details</div>
          </div>
        </div>

      </div>

      <div id='individualcard'> 
        <img alt='Vehicle' src='https://placekitten.com/250/250'></img>
        <div>User Info</div>
        <div>Vehicle Info</div>
        <div>Cost, miles, color, model, etc.</div>
        <div>User Rating</div>
      </div>

    </div>
  )
}

export default VehicleCard