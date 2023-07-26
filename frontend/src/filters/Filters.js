import React, { useEffect, useState } from 'react'
import '../frontpage/FrontPage.css'
import VehicleCard from '../vehiclecard/VehicleCard.js'
import BoatDetail from '../vehiclecarddetail/BoatDetail'
import CarDetail from '../vehiclecarddetail/CarDetail'
import MotoDetail from '../vehiclecarddetail/MotoDetail'
import RvDetail from '../vehiclecarddetail/RvDetail'
import TrailerDetail from '../vehiclecarddetail/Trailerdetail'

const Filters = ({filterText, listings, setListings, detailedView, setDetailedView}) => {
  // const [query, setQuery] = useState('')
  const [originalListings, setOriginalListings] = useState(listings)
  var make = [];
  var model = []
  var year = ''
  var price = ''
  var condition = ''
  var location = ''
  var type = ''

  return (
    <div>
      {filterText === 'car' ?
      <>
        <label htmlFor='make'>Make: </label>
        <select name='make' id='carmake' defaultValue={''}>
          <option value='' default disabled>Please select an option</option>
          <option value='all'>All</option>
          {listings.carListings.map(e => {
            if (!make.includes(e.make)) {
              make.push(e.make)
              return <option value={e.make}>{e.make}</option>
            }
          })}
        </select>

        <label htmlFor='make'>Model: </label>
        <select name='make' defaultValue={''}>
          <option value='' default disabled>Please select an option</option>
          <option value='all'>All</option>
          {listings.carListings.map(e => {
            if (!model.includes(e.model)) {
              model.push(e.model)
              return <option value={e.model}>{e.model}</option>
            }
          })}
        </select>


        <div>Year</div>
        <div>Type</div>
        <div>Price</div>
        <div>Mileage</div>
        <div>Location</div>
        <div>Transmission</div>
        <div>Condition</div>
        <div>Color</div>
        <div>For Sale</div>

        <button onClick={() => {
          make = document.getElementById('carmake').value
          console.log(listings)
        }}>Submit</button>
      </> : <></>}
      {filterText === 'boat' ?
      <>
        Boat Selected
        <div>Make</div>
        <div>Model</div>
        <div>Year</div>
        <div>Type</div>
        <div>Price</div>
        <div>Hours</div>
        <div>Location</div>
        <div>Condition</div>
        <div>Type</div>
        <div>Price</div>
        <div>For Sale</div>
      </>
      :<></>}
      {filterText === 'motorcycle' ?
      <>
        Motorcycle Selected
        <div>Make</div>
        <div>Model</div>
        <div>Year</div>
        <div>Price</div>
        <div>Mileage</div>
        <div>Color</div>
        <div>Location</div>
        <div>Condition</div>
        <div>Type</div>
        <div>For Sale</div>
      </>
      :<></>}
      {filterText === 'rv' ?
      <>
        RV Selected
        <div>Make</div>
        <div>Model</div>
        <div>Year</div>
        <div>Type</div>
        <div>Price</div>
        <div>Weight</div>
        <div>Mileage</div>
        <div>Sleeps</div>
        <div>Location</div>
        <div>Condition</div>
        <div>For Sale</div>
      </>
      :<></>}
      {filterText === 'trailer' ?
      <>
        Trailer Selected
        <div>Make</div>
        <div>Model</div>
        <div>Year</div>
        <div>Type</div>
        <div>Price</div>
        <div>Length</div>
        <div>Location</div>
        <div>Condition</div>
        <div>For Sale</div>
      </>
      :<></>}
    </div>
  )
}

export default Filters
// Make
// Model
// Year
// Price
// Condition
// Location
// Type


{/* <div>Make</div>
<div>Model</div>
<div>Year</div>
<div>Type</div>
<div>Price</div>
<div>Mileage</div>
<div>Location</div>
<div>Transmission</div>
<div>Condition</div>
<div>Color</div>
<div>Hours</div>
<div>Type</div>
<div>Weight</div>
<div>Sleeps</div>
<div>Length</div> */}