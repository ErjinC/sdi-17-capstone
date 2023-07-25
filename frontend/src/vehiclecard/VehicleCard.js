import React, {useState} from 'react'
import './VehicleCard.css'


const VehicleCard = ({vehicle, detailedView, setDetailedView}) => {

  return (

      /* iterate this
      <div
        id='individualcard'
        onClick={() => {
          document.getElementById('individualcarddetails').style.display="block"
          document.getElementById('individualcarddetailsoverlay').style.display="block"
        }}
        > 
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
          }}
          >
          <div id='individualcarddetails'>
            <div>Stuff in da details</div>
            <DetailedCar/>
          </div>
        </div>

      </div> */

      <div id='individualcard' onClick={()=>{setDetailedView({active:true,vehicle:vehicle})}}> 
        <img id='vehiclecardimage' alt='Vehicle' src={vehicle.image}></img>
        <div><strong>{vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model}</strong></div>
        <div>Cost: {'$'+vehicle.price}</div>
        <div>Location: {vehicle.location}</div>
      </div>
  )
}

export default VehicleCard