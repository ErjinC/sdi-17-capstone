import React from 'react'
import './VehicleCardDetail.css'

const MotoDetail = ({vehicle}) => {

  return (
    <>
      <div id='flexcontainerdetail'>
        <div id='descriptionTextContainer'>
          <h1 id='detailheader'>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
          <h3>Sold/For Sale/Rental</h3>
          <div>Type: {vehicle.type}</div>
          <div>Condition: {vehicle.condition.charAt(0).toUpperCase()+ vehicle.condition.slice(1)}</div>
          <div>Price: ${vehicle.price}</div>
          <div>Mileage: {vehicle.mileage}</div>
          <div>Color: {vehicle.color.charAt(0).toUpperCase()+ vehicle.color.slice(1)}</div>
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

// motorcycleId: 1,
// sold: false, !!
// image: "https://placekitten.com/500/300", !
// type: "Street Bike", !!
// make: "Honda", !!
// model: "CBR1000", !!
// year: 2008, !!
// price: 7600, !!
// mileage: 3597, !!
// color: "green", !!
// condition: "good", !!
// location: "Beale AFB", !!
// description: "Garage kept. No issues." !

export default MotoDetail