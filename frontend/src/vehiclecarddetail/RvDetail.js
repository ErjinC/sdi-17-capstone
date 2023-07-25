import React from 'react'
import './VehicleCardDetail.css'

const RvDetail = ({vehicle}) => {

  return (
    <>
      <div id='flexcontainerdetail'>
        <div id='descriptionTextContainer'>
          <h1 id='detailheader'>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
          <h3>Sold/For Sale/Rental</h3>
          <div>Condition: {vehicle.condition.charAt(0).toUpperCase()+ vehicle.condition.slice(1)}</div>
          <div>Price: ${vehicle.price}</div>
          <div>Type: {vehicle.type.charAt(0).toUpperCase()+ vehicle.type.slice(1)}</div>
          {vehicle.type === 'towable'?<></>:<div>Mileage: {vehicle.mileage}</div>}
          <div>Sleeps: {vehicle.sleeps}</div>
          <div>Weight: {vehicle.weight}lbs</div>
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

// rvId: 1,
// sold: false, !!
// type: "motorized", !!
// make: "Jayco", !!
// model: "Alante", !!
// mileage: 26432, !!
// sleeps: 6, !!
// weight: 18000, !!
// year: 2024, !!
// price: 172418, !!
// length: 29, !!
// condition: "excellent", !!
// image: "https://placekitten.com/500/300", !
// location: "Beale AFB", !!
// description: "Like new vehicle, newly refurbished interior and flooring. Equipped with solar panels, Wi-Fi antennas, and two A/C units. Slight scratching present on the exterior, but otherwise in great condition." !

export default RvDetail