import React, { useState } from 'react'

const Filters = (vehicle) => {
  // const [query, setQuery] = useState('')

  return (
    <div>
      {vehicle === 'car' ?
      <>
            <div>Make</div>
            <div>Model</div>
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