import React, { useEffect, useState } from 'react'
import Slider from '@mui/material/Slider'
import '../frontpage/FrontPage.css'

let beforeChange = null;

const Filters = ({filterText, listings, setListings, detailedView, setDetailedView}) => {
  const [originalListings, setOriginalListings] = useState(listings)
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

const handleSubmit = (e) => {
  e.preventDefault()
  // console.log(listings)
  console.log('originals: ', originalListings)
  
  let year = Number(e.target.year.value)
  let make = e.target.make.value
  let model = e.target.model.value
  let location = e.target.location.value
  
  let poorcheck = e.target.poor.checked
  let goodcheck = e.target.good.checked
  let excellentcheck = e.target.excellent.checked
  let iterator;
  if (filterText === 'car') {
    iterator = originalListings.carListings
  } else if (filterText === 'boat') {
    iterator = originalListings.boatListings
  } else if (filterText === 'motorcycle') {
    iterator = originalListings.motoListings
  } else if (filterText === 'rv') {
    iterator = originalListings.rvListings
  } else if (filterText === 'trailer') {
    iterator = originalListings.trailerListings
  }
  let filtered = iterator.filter(item => {
    if (e.target.year.value !== 'all') {
      if (item.year !== year) {
        console.log(`Year don't match`)
        return false
      }
    }
    if (make !== 'all') {
      if (item.make !== make) {
        console.log(`Make don't match`)
        return false
      }
    }
    if (model !== 'all') {
      if (item.model !== model) {
        console.log(`Model don't match`)
        return false
      }
    }
    if (location !== 'all') {
      if (item.location !== location) {
        console.log(`Location don't match`)
        return false
      }
    }

    if (filterText === 'car') {
      if (e.target.car.checked || e.target.coupe.checked || e.target.truck.checked) {
        if (!e.target.car.checked && (item.type === e.target.car.value)) {
          console.log(`Car checked, but not a car`)
          return false
        }
        if (!e.target.coupe.checked && (item.type === e.target.coupe.value)) {
          console.log(`Coupe checked, but not a coupe`)
          return false
        }
        if (!e.target.truck.checked && (item.type === e.target.truck.value)) {
          console.log(`Truck checked, but not a truck`)
          return false
        }
      }
    } else if (filterText === 'boat') {
      if (e.target.boat.checked || e.target.jetski.checked) {
        if (!e.target.boat.checked && (item.type === e.target.boat.value)) {
          console.log(`Boat checked, but not a boat`)
          return false
        }
        if (!e.target.jetski.checked && (item.type === e.target.jetski.value)) {
          console.log(`Jet Ski checked, but not a Jet Ski`)
          return false
        }
      }
    } else if (filterText === 'motorcycle') {
      if (e.target.streetbike.checked || e.target.dirtbike.checked || e.target.cruiser.checked || e.target.sportbike.checked || e.target.touringbike.checked || e.target.adventurebike.checked) {
        if (!e.target.streetbike.checked && (item.type === e.target.streetbike.value)) {
          console.log(`Street bike checked, but not a street bike`)
          return false
        }
        if (!e.target.dirtbike.checked && (item.type === e.target.dirtbike.value)) {
          console.log(`Dirt bike checked, but not a dirt bike`)
          return false
        }
        if (!e.target.cruiser.checked && (item.type === e.target.cruiser.value)) {
          console.log(`Cruiser checked, but not a cruiser`)
          return false
        }
        if (!e.target.sportbike.checked && (item.type === e.target.sportbike.value)) {
          console.log(`Sport bike checked, but not a sport bike`)
          return false
        }
        if (!e.target.dualsport.checked && (item.type === e.target.dualsport.value)) {
          console.log(`Dual sport checked, but not a dual sport`)
          return false
        }
        if (!e.target.touringbike.checked && (item.type === e.target.touringbike.value)) {
          console.log(`Touring bike checked, but not a touring bike`)
          return false
        }
        if (!e.target.adventurebike.checked && (item.type === e.target.adventurebike.value)) {
          console.log(`Adventure bike checked, but not an adventure bike`)
          return false
        }
      }
    } else if (filterText === 'rv') {
      if (e.target.motorized.checked || e.target.towable.checked) {
        if (!e.target.motorized.checked && (item.type === e.target.motorized.value)) {
          console.log(`Motorized checked, but not a Motorized RV`)
          return false
        }
        if (!e.target.towable.checked && (item.type === e.target.towable.value)) {
          console.log(`Towable checked, but not a Towable RV`)
          return false
        }
      }
    }

    if (item.price < value[0] || item.price > value[1]) {
      console.log(`Price outside of the range`)
      return false
    }


    if (poorcheck || goodcheck || excellentcheck) {
      if (!poorcheck && (item.condition === e.target.poor.value)) {
        console.log(`Poor checked, but not Poor condition`)
        return false
      }
      if (!goodcheck && (item.condition === e.target.good.value)) {
        console.log(`Good checked, but not good condition`)
        return false
      }
      if (!excellentcheck && (item.condition === e.target.excellent.value)) {
        console.log(`Excellent checked, but not excellent condition`)
        return false
      }
    }
    
    return true
  })
  console.log(filtered) // Im going to push this to our branch
  if (filterText === 'car') {
    setListings({carListings: filtered})
  } else if (filterText === 'boat') {
    setListings({boatListings: filtered})
  } else if (filterText === 'motorcycle') {
    setListings({motoListings: filtered})
  } else if (filterText === 'rv') {
    setListings({rvListings: filtered})
  } else if (filterText === 'trailer') {
    setListings({trailerListings: filtered})
  }
}

const handleReset = () => {
  setListings(originalListings) 
}
  
  var make = [];
  var model = []
  var year = []
  var type = []
  var location = []

  return (
    <div>
{/* ---------------------------------CAR---------------------------------------- */}
      <form className='carFilterForm' onSubmit={handleSubmit}>
        {filterText === 'car' ?
        <>
          <label htmlFor='year'>Year: </label>
          <select
            name='year'
            id='caryear'
            defaultValue={'all'} 
            >
            <option value='all'>All</option>
            {originalListings.carListings.map(e => {
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
            {originalListings.carListings.map(e => {
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
            {originalListings.carListings.map(e => {
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
            <br></br>
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
            {originalListings.carListings.map(e => {
              if (!location.includes(e.location)) {
                location.push(e.location)
                return <option value={e.location}>{e.location}</option>
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

          <button type='submit'>Submit</button>
        </> : <></>}
      </form>
          
{/* ---------------------------------BOAT---------------------------------------- */}
      <form className='boatFilterForm' onSubmit={handleSubmit}>
        {filterText === 'boat' ?
        <>
          <label htmlFor='year'>Year: </label>
          <select
            name='year'
            id='boatyear'
            defaultValue={'all'} 
            >
            <option value='all'>All</option>
            {originalListings.boatListings.map(e => {
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
            {originalListings.boatListings.map(e => {
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
              document.getElementById('boatcheck').checked = !document.getElementById('boatcheck').checked
            }}
            >
            <option value='all'>All</option>
            {originalListings.boatListings.map(e => {
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
            <br></br>
          <label htmlFor='location'>Location: </label>
          <select
            name='location'
            id='boatLocation'
            defaultValue={'all'} 
            onChange={(e) => {
              setLocationDropDown(e.target.value)
            }}
            >
            <option value='all'>All</option>
            {originalListings.boatListings.map(e => {
              if (!location.includes(e.location)) {
                location.push(e.location)
                return <option value={e.location}>{e.location}</option>
              }
            })}
          </select>

          <fieldset>
            <legend>Type:</legend>
              <div>
                <input type='checkbox' name='boat' value='boat' id='boatcheck'></input>
                <label htmlFor='car'>Boat</label>
              </div>
              <div>
                <input type='checkbox' name='jetski' value='jet ski' id='jetskicheck'></input>
                <label htmlFor='coupe'>Jet Ski</label>
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

          <button type='submit'>Submit</button>
        </> : <></>}
      </form>
      
      {/* ---------------------------------MOTORCYCLE---------------------------------------- */}
      <form className='motorcycleFilterForm' onSubmit={handleSubmit}>
        {filterText === 'motorcycle' ?
        <>
          <label htmlFor='year'>Year: </label>
          <select
            name='year'
            id='motoyear'
            defaultValue={'all'} 
            >
            <option value='all'>All</option>
            {originalListings.motoListings.map(e => {
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
            id='motomake'
            defaultValue={'all'} 
            onChange={(e) => {
              setMakeDropDown(e.target.value)
            }}
            >
            <option value='all'>All</option>
            {originalListings.motoListings.map(e => {
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
              document.getElementById('motocheck').checked = !document.getElementById('motocheck').checked
            }}
            >
            <option value='all'>All</option>
            {originalListings.motoListings.map(e => {
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
            <br></br>
          <label htmlFor='location'>Location: </label>
          <select
            name='location'
            id='motoLocation'
            defaultValue={'all'} 
            onChange={(e) => {
              setLocationDropDown(e.target.value)
            }}
            >
            <option value='all'>All</option>
            {originalListings.motoListings.map(e => {
              if (!location.includes(e.location)) {
                location.push(e.location)
                return <option value={e.location}>{e.location}</option>
              }
            })}
          </select>

          <fieldset>
            <legend>Type:</legend>
              <div>
                <input type='checkbox' name='streetbike' value='Street Bike' id='streetbikecheck'></input>
                <label htmlFor='streetbike'>Street</label>
              </div>
              <div>
                <input type='checkbox' name='dirtbike' value='Dirt Bike' id='dirtbikecheck'></input>
                <label htmlFor='dirtbike'>Dirt</label>
              </div>
              <div>
                <input type='checkbox' name='cruiser' value='Cruiser' id='cruisercheck'></input>
                <label htmlFor='cruiser'>Cruiser</label>
              </div>
              <div>
                <input type='checkbox' name='sportbike' value='Sport Bike' id='sportbikecheck'></input>
                <label htmlFor='sportbike'>Sport</label>
              </div>
              <div>
                <input type='checkbox' name='dualsport' value='Dual Sport' id='dualsportcheck'></input>
                <label htmlFor='dualsport'>Dual Sport</label>
              </div>
              <div>
                <input type='checkbox' name='touringbike' value='Touring Bike' id='touringbikecheck'></input>
                <label htmlFor='touringbike'>Touring</label>
              </div>
              <div>
                <input type='checkbox' name='adventurebike' value='Adventure Bike' id='adventurebikecheck'></input>
                <label htmlFor='adventurebike'>Adventure</label>
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

          <button type='submit'>Submit</button>
        </> : <></>}
      </form>
{/* ---------------------------------RV---------------------------------------- */}
      <form className='rvFilterForm' onSubmit={handleSubmit}>
        {filterText === 'rv' ?
        <>
          <label htmlFor='year'>Year: </label>
          <select
            name='year'
            id='rvyear'
            defaultValue={'all'} 
            >
            <option value='all'>All</option>
            {originalListings.rvListings.map(e => {
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
            id='rvmake'
            defaultValue={'all'} 
            onChange={(e) => {
              setMakeDropDown(e.target.value)
            }}
            >
            <option value='all'>All</option>
            {originalListings.rvListings.map(e => {
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
              document.getElementById('motorizedcheck').checked = !document.getElementById('motorizedcheck').checked
            }}
            >
            <option value='all'>All</option>
            {originalListings.rvListings.map(e => {
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
            <br></br>
          <label htmlFor='location'>Location: </label>
          <select
            name='location'
            id='rvLocation'
            defaultValue={'all'} 
            onChange={(e) => {
              setLocationDropDown(e.target.value)
            }}
            >
            <option value='all'>All</option>
            {originalListings.rvListings.map(e => {
              if (!location.includes(e.location)) {
                location.push(e.location)
                return <option value={e.location}>{e.location}</option>
              }
            })}
          </select>

          <fieldset>
            <legend>Type:</legend>
              <div>
                <input type='checkbox' name='motorized' value='motorized' id='motorizedcheck'></input>
                <label htmlFor='car'>Motorized</label>
              </div>
              <div>
                <input type='checkbox' name='towable' value='towable' id='towablecheck'></input>
                <label htmlFor='coupe'>Towable</label>
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

          <button type='submit'>Submit</button>
        </> : <></>}
      </form>
      
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
      <button onClick={() => handleReset()}>Reset</button>
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