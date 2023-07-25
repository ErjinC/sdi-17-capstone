import React from 'react'
import './VehicleCardDetail.css'

const TrailerDetail = ({ vehicle }) => {

  return (
    <>
      <div id='flexcontainerdetail'>
        <div id='descriptionTextContainer'>
          <h1 id='detailheader'>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
          <h3>For Sale</h3>
          <div>Condition: {vehicle.condition.charAt(0).toUpperCase() + vehicle.condition.slice(1)}</div>
          <div>Type: {vehicle.type}</div>
          <div>Price: ${vehicle.price}</div>
          <div>Length: {vehicle.length}</div>
          <div>Location: {vehicle.location}</div>
          <div>Description: {vehicle.description}</div>
        </div>
      </div>
      <div>
        <img id='detailimage' alt='placeholder' src='http://placekitten.com/400/300'></img>
      </div>
    </>
  )
}

// trailerId: 1,
// sold: false, !!
// type: "flatbed", !!
// make: "Carry-On Trailer", !!
// model: "Wood Floor Utility", !!
// year: 2008, !!
// price: 1200, !!
// length: "14ft", !!
// image: "https://placekitten.com/500/300", !
// condition: "good", !!
// location: "Beale AFB", !!
// description: "Garage kept. No issues." !

export default TrailerDetail