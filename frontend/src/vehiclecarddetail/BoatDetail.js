import React from 'react'
import './VehicleCardDetail.css'

const BoatDetail = ({ vehicle }) => {

  return (
    <>
      <div id='flexcontainerdetail'>
        <div id='descriptionTextContainer'>
          <h1 id='detailheader'>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
          <h3>Sold/For Sale</h3>
          <div>Condition: {vehicle.condition.charAt(0).toUpperCase() + vehicle.condition.slice(1)}</div>
          <div>Price: ${vehicle.price}</div>
          <div>Type: {vehicle.type}</div>
          <div>Hours: {vehicle.hours}</div>
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

// boatId: 1,
// sold: false, !!
// type: "boat", !!
// make: "Sea Ray", !!
// model: "Sundancer 260", !!
// year: 2010, !!
// price: 40000, !!
// hours: 300, !!
// image: "https://placekitten.com/500/300",
// condition: "good", !!
// location: "Beale AFB", !!
// description: "Bent propeller. Runs well. Needs new canopy." !

export default BoatDetail