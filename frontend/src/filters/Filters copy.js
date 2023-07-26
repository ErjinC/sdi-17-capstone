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
  const [make, setMake] = useState(false)

  return (
    <div>
      {filterText === 'car' ?
      <>
        <label htmlFor='make'>Make: </label>
        <select name='make' defaultValue={''}
        onChange={(e) =>{
          switch(e.target.value) {
            case 'all':
              setListings(originalListings)
              setMake(false)
              break
            case 'Toyota':
              setListings({ carListings: originalListings.carListings.filter(vehicle => vehicle.make === e.target.value)})
              setMake(true)
              break;
            case 'Ford':
              setListings({ carListings: originalListings.carListings.filter(vehicle => vehicle.make === e.target.value)})
              setMake(true)
              break;
            case 'Chevrolet':
              setListings({ carListings: originalListings.carListings.filter(vehicle => vehicle.make === e.target.value)})
              setMake(true)
              break;
            case 'Honda':
              setListings({ carListings: originalListings.carListings.filter(vehicle => vehicle.make === e.target.value)})
              setMake(true)
              break;
            case 'BMW':
              setListings({ carListings: originalListings.carListings.filter(vehicle => vehicle.make === e.target.value)})
              setMake(true)
              break;
            case 'Hyundai':
              setListings({ carListings: originalListings.carListings.filter(vehicle => vehicle.make === e.target.value)})
              setMake(true)
              break;
            case 'Dodge':
              setListings({ carListings: originalListings.carListings.filter(vehicle => vehicle.make === e.target.value)})
              setMake(true)
              break;
            case 'Subaru':
              setListings({ carListings: originalListings.carListings.filter(vehicle => vehicle.make === e.target.value)})
              setMake(true)
              break;
            case 'Volkswagen':
              setListings({ carListings: originalListings.carListings.filter(vehicle => vehicle.make === e.target.value)})
              setMake(true)
              break;
            case 'GMC':
              setListings({ carListings: originalListings.carListings.filter(vehicle => vehicle.make === e.target.value)})
              setMake(true)
              break;
            case 'Audi':
              setListings({ carListings: originalListings.carListings.filter(vehicle => vehicle.make === e.target.value)})
              setMake(true)
              break;
            case 'Lexus':
              setListings({ carListings: originalListings.carListings.filter(vehicle => vehicle.make === e.target.value)})
              setMake(true)
              break;
            default:
              break
          }
        }}>
          <option value='' default disabled>Please select an option</option>
          <option value='all'>All</option>
          <option value='Toyota'>Toyota</option>
          <option value='Ford'>Ford</option>
          <option value='Chevrolet'>Chevrolet</option>
          <option value='Honda'>Honda</option>
          <option value='BMW'>BMW</option>
          <option value='Hyundai'>Hyundai</option>
          <option value='Dodge'>Dodge</option>
          <option value='Subaru'>Subaru</option>
          <option value='Volkswagen'>Volkswagen</option>
          <option value='GMC'>GMC</option>
          <option value='Audi'>Audi</option>
          <option value='Lexus'>Lexus</option>
        </select>

        <label htmlFor='make'>Model: </label>
        <select name='make' defaultValue={''}
        onChange={(e) =>{
          switch(e.target.value) {
            case 'all':
              setListings(originalListings)
              setMake(false)
              break
            case 'Toyota':
              setListings({ carListings: originalListings.carListings.filter(vehicle => vehicle.make === e.target.value)})
              setMake(true)
              break;
            case 'Ford':
              setListings({ carListings: originalListings.carListings.filter(vehicle => vehicle.make === e.target.value)})
              setMake(true)
              break;
            default:
              break
          }
        }}>
          <option value='' default disabled>Please select an option</option>
          <option value='all'>All</option>
          <option value='Toyota'>Toyota</option>
          <option value='Ford'>Ford</option>
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