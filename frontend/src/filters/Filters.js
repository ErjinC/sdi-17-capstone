import React, { useEffect, useState } from 'react'
import Slider from '@mui/material/Slider'
import '../frontpage/FrontPage.css'

let beforeChange = null;

const Filters = ({filterText, listings, setListings, detailedView, setDetailedView}) => {
  const [makeDropDown, setMakeDropDown] = useState('test')
  const [maxValue, setMaxValue] = useState('')
  const [locationDropDown, setLocationDropDown] = useState('test')

  const [value, setValue] = useState([0, 200000]);

  const handleChange = (event, newValue) => {
    if (!beforeChange) {
        beforeChange = [...value];
    }

    if (beforeChange[0] !== newValue[0] && beforeChange[1] !== newValue[1]) {
        return;
    }
    setMaxValue(newValue[1]);
    setValue(newValue);
};

const handleChangeCommitted = () => {
    beforeChange = null;
};
  
  var make = [];
  var model = []
  var year = []
  var type = []
  var price = ''
  var condition = ''
  var location = []

  return (
    <div>
      {filterText === 'car' ?
      <>
        <label htmlFor='year'>Year: </label>
        <select
          name='year'
          id='caryear'
          defaultValue={'all'} 
          >
          <option value='all'>All</option>
          {listings.carListings.map(e => {
            if (!year.includes(e.year)) {
              year.push(e.year)
              return <option value={e.year}>{e.year}</option>
            }
          })}
        </select>
          <br></br>
        <label htmlFor='make'>Make: </label>
        <select
          name='make'
          id='carmake'
          defaultValue={'all'} 
          onChange={(e) => {
            setMakeDropDown(e.target.value)
          }}
          >
          <option value='all'>All</option>
          {listings.carListings.map(e => {
            if (!make.includes(e.make)) {
              make.push(e.make)
              return <option value={e.make}>{e.make}</option>
            }
          })}
        </select>
          <br></br>
        <label htmlFor='model'>Model: </label>
        <select
          name='model'
          defaultValue={''}
          onChange={() => {
            console.log(type)
            document.getElementById('carcheck').checked = !document.getElementById('carcheck').checked
          }}
          >
          <option value='all'>All</option>
          {listings.carListings.map(e => {
            if (e.make === makeDropDown) {
              model.push(e.model)
              type.push({
                model: e.model,
                type: e.type
              })
              return <option value={e.model}>{e.model}</option>
            }
          })}
        </select>

        <fieldset>
          <legend>Type:</legend>
            <div>
              <input type='checkbox' name='car' value='car' id='carcheck'></input>
              <label htmlFor='car'>Car</label>
            </div>
            <div>
              <input type='checkbox' name='coupe' value='coupe' id='coupecheck'></input>
              <label htmlFor='coupe'>Coupe</label>
            </div>
            <div>
              <input type='checkbox' name='truck' value='truck' id='truckcheck'></input>
              <label htmlFor='truck'>Truck</label>
            </div>
        </fieldset>

        <fieldset>
          <legend>Price:</legend>
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            step={1000}
            min={0}
            max={200000}
            onChangeCommitted={handleChangeCommitted}
          />
          <input type='number' name='min' value={value[0]} placeholder='min' onChange={(e) => {
            if (e.target.value >= value[1]) {
              setValue([value[1], value[1]])
            } else {
              setValue([e.target.value, value[1]])
            }
            }}/>
          <input type='number' name='max' value={maxValue} placeholder='max' onChange={(e) => {
              if (e.target.value <= value[0]) {
                setValue([value[0], value[0]])
                setMaxValue(e.target.value)
              } else {
                setValue([value[0], e.target.value])
                setMaxValue(e.target.value)
              }
            }}/>
        </fieldset>

        <label htmlFor='location'>Location: </label>
        <select
          name='location'
          id='carLocation'
          defaultValue={'all'} 
          onChange={(e) => {
            setLocationDropDown(e.target.value)
          }}
          >
          <option value='all'>All</option>
          {listings.carListings.map(e => {
            if (!location.includes(e.location)) {
              location.push(e.location)
              return <option value={e.location}>{e.location}</option>
            }
          })}
        </select>

        <fieldset>
          <legend>Condition:</legend>
            <div>
              <input type='checkbox' name='poor' value='poor' id='poorcheck'></input>
              <label htmlFor='poor'>Poor</label>
            </div>
            <div>
              <input type='checkbox' name='good' value='good' id='goodcheck'></input>
              <label htmlFor='good'>Good</label>
            </div>
            <div>
              <input type='checkbox' name='excellent' value='excellent' id='excellentcheck'></input>
              <label htmlFor='excellent'>Excellent</label>
            </div>
        </fieldset>

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