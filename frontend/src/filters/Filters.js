import React, { useEffect, useState, useContext } from 'react'
import Slider from '@mui/material/Slider'
import '../frontpage/FrontPage.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { ParentContext } from '../App';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffb703',
      main: '#ffb703',
      dark: '#ffb703',
      contrastText: '#fb8500'
    },
},
});


let beforeChange = null;

const Filters = ({filterText, listings, setListings, detailedView, setDetailedView, originalListings}) => {
  const [makeDropDown, setMakeDropDown] = useState('test')
  const [maxValue, setMaxValue] = useState('')
  const [update, setUpdate] = useState(false)

  const [value, setValue] = useState([0, 200000]);

  const [yearRange, setYearRange] = useState([1950, new Date().getFullYear()+1])
  const [yearRangeMax, setYearRangeMax]= useState('')
  const maxYear = new Date().getFullYear()+1

  const { locations } = useContext(ParentContext)

  // useEffect(() => {

  // }, [])

  const handleReset =() => {
    setListings(originalListings)
    setValue([0, 200000])
    setYearRange([1950, new Date().getFullYear()+1])
    document.getElementById('make').value = 'all'
    document.getElementById('model').value = 'all'
    document.getElementById('location').value = sessionStorage.getItem('CurrentUser') ? JSON.parse(sessionStorage.getItem('CurrentUser')).base : 'all'

    document.getElementById('poorcheck').checked = false
    document.getElementById('goodcheck').checked = false
    document.getElementById('excellentcheck').checked = false

    if (filterText === 'car') {
      // iterator = originalListings.carListings
      document.getElementById('carcheck').checked = false
      document.getElementById('coupecheck').checked = false
      document.getElementById('truckcheck').checked = false
    } else if (filterText === 'boat') {
      // iterator = originalListings.boatListings
      document.getElementById('boatcheck').checked = false
      document.getElementById('jetskicheck').checked = false
    } else if (filterText === 'motorcycle') {
      // iterator = originalListings.motoListings
      document.getElementById('streetbikecheck').checked = false
      document.getElementById('dirtbikecheck').checked = false
      document.getElementById('cruisercheck').checked = false
      document.getElementById('sportbikecheck').checked = false
      document.getElementById('dualsportcheck').checked = false
      document.getElementById('touringbikecheck').checked = false
      document.getElementById('adventurebikecheck').checked = false
    } else if (filterText === 'rv') {
      // iterator = originalListings.rvListings
      document.getElementById('motorized').checked = false
      document.getElementById('towable').checked = false
    } else if (filterText === 'trailer') {
      // iterator = originalListings.trailerListings
      document.getElementById('flatbedcheck').checked = false
      document.getElementById('enclosedcheck').checked = false
    }
  }

  const handleChangePrice = (event, newValue) => {
    if (!beforeChange) {
        beforeChange = [...value];
    }

    if (beforeChange[0] !== newValue[0] && beforeChange[1] !== newValue[1]) {
        return;
    }
    setMaxValue(newValue[1]);
    setValue(newValue);
};

const handleChangeYear = (event, newValue) => {
  if (!beforeChange) {
      beforeChange = [...yearRange];
  }

  if (beforeChange[0] !== newValue[0] && beforeChange[1] !== newValue[1]) {
      return;
  }
  setYearRangeMax(newValue[1]);
  setYearRange(newValue);
};

const handleChangeCommitted = () => {
    beforeChange = null;
};

const handleSubmit = (e) => {
  e.preventDefault()
  // console.log(listings)
  console.log('originals: ', originalListings)
  
  let minYear = yearRange[0]
  let maxYear = yearRange[1]
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
    if (item.year < yearRange[0] || item.year > yearRange[1]) {
      console.log(`Year don't match`)
      return false
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
    } else if (filterText === 'trailer') {
      if (e.target.flatbed.checked || e.target.enclosed.checked) {
        if (!e.target.flatbed.checked && (item.type === e.target.flatbed.value)) {
          console.log(`Flatbed checked, but not a Flatbed Trailer`)
          return false
        }
        if (!e.target.enclosed.checked && (item.type === e.target.enclosed.value)) {
          console.log(`Enclosed checked, but not a Enclosed Trailer`)
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
  console.log(filtered) 
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
  
  var make = [];
  var model = []
  var year = []
  var type = []

  return (
    <div>
{/* ---------------------------------CAR---------------------------------------- */}
      <fieldset>
      <legend>Filters</legend>
      <form className='carFilterForm' onSubmit={handleSubmit} >
        {filterText === 'car' ?
        <>
          <fieldset>

            <legend>Year</legend>
            <Typography id="typography" gutterBottom>
              {/* Show vehicles from:<br></br> */}
              <p>{yearRange[0]}</p><p>{yearRange[1]}</p>
            </Typography>
            <ThemeProvider theme={theme}>
              <Slider
                value={yearRange} // Math.min(array)
                onChange={handleChangeYear}
                valueLabelDisplay="off"
                color='primary'
                step={1}
                min={1950}
                max={maxYear}
                onChangeCommitted={handleChangeCommitted}
              />
            </ThemeProvider>
          </fieldset>

          <fieldset>
            <legend>Make</legend>
            <select
              name='make'
              id='make'
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
          </fieldset>
          
          <fieldset>
            <legend>Model</legend>
            <select
              name='model'
              id='model'
              defaultValue={''}
              onChange={() => {
                console.log(type)
                // document.getElementById('carcheck').checked = !document.getElementById('carcheck').checked
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
          </fieldset>

          <fieldset>
            <legend>Location</legend>
            <select
              name='location'
              id='location'
              defaultValue={sessionStorage.getItem('CurrentUser') ? JSON.parse(sessionStorage.getItem('CurrentUser')).base : 'all'} 
              // onChange={(e) => {
              //   setLocationDropDown(e.target.value)
              // }}
              >
              <option value='all'>All</option>
              {locations.map(e => {
                  return <option value={e.name}>{e.name}</option>
              })}
            </select>
          </fieldset>

          <fieldset>
            <legend>Type</legend>
              <div>
                <input className='checkinput' type='checkbox' name='car' value='car' id='carcheck'></input>
                <label htmlFor='car'>Car</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='coupe' value='coupe' id='coupecheck'></input>
                <label htmlFor='coupe'>Coupe</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='truck' value='truck' id='truckcheck'></input>
                <label htmlFor='truck'>Truck</label>
              </div>
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <ThemeProvider theme={theme}>
              <Slider
                value={value}
                onChange={handleChangePrice}
                valueLabelDisplay="auto"
                color='primary'
                step={1000}
                min={0}
                max={200000}
                onChangeCommitted={handleChangeCommitted}
              />
            </ThemeProvider>
            <input type='number' className='minmax' name='min' value={value[0]} placeholder='min' onChange={(e) => {
              if (e.target.value >= value[1]) {
                setValue([value[1], value[1]])
              } else {
                setValue([e.target.value, value[1]])
              }
              }}/>
            <input type='number' className='minmax' name='max' value={maxValue} placeholder='max' onChange={(e) => {
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
            <legend>Condition</legend>
              <div>
                <input className='checkinput' type='checkbox' name='poor' value='poor' id='poorcheck'></input>
                <label htmlFor='poor'>Poor</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='good' value='good' id='goodcheck'></input>
                <label htmlFor='good'>Good</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='excellent' value='excellent' id='excellentcheck'></input>
                <label htmlFor='excellent'>Excellent</label>
              </div>
          </fieldset>
          <div id='flexcontainerbuttons'>
            <button id='filterbutton' type='submit'>Submit</button>
            <button id='filterbutton' type='button' onClick={() => handleReset()}>Reset</button>
          </div>
        </> : <></>}
      </form>
          
{/* ---------------------------------BOAT---------------------------------------- */}
      <form className='boatFilterForm' onSubmit={handleSubmit}>
        {filterText === 'boat' ?
        <>
          <fieldset>
            <legend>Year</legend>
            <Typography id="typography" gutterBottom>
              {/* Show vehicles from:<br></br> */}
              <p>{yearRange[0]}</p><p>{yearRange[1]}</p>
            </Typography>
            <ThemeProvider theme={theme}>
              <Slider
                value={yearRange} // Math.min(array)
                onChange={handleChangeYear}
                valueLabelDisplay="off"
                color='primary'
                step={1}
                min={1950}
                max={maxYear}
                onChangeCommitted={handleChangeCommitted}
              />
            </ThemeProvider>
          </fieldset>
          <fieldset>
            <legend>Make</legend>
            <select
              name='make'
              id='make'
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
          </fieldset>
          <fieldset>
            <legend>Model</legend>
            <select
              name='model'
              id='model'
              defaultValue={''}
              onChange={() => {
                console.log(type)
                // document.getElementById('boatcheck').checked = !document.getElementById('boatcheck').checked
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
          </fieldset>
          <fieldset>
            <legend>Location</legend>
            <select
              name='location'
              id='location'
              defaultValue={sessionStorage.getItem('CurrentUser') ? JSON.parse(sessionStorage.getItem('CurrentUser')).base : 'all'} 
              // onChange={(e) => {
              //   setLocationDropDown(e.target.value)
              // }}
              >
              <option value='all'>All</option>
              {locations.map(e => {
                  return <option value={e.name}>{e.name}</option>
              })}
            </select>
          </fieldset>

          <fieldset>
            <legend>Type</legend>
              <div>
                <input className='checkinput' type='checkbox' name='boat' value='boat' id='boatcheck'></input>
                <label htmlFor='car'>Boat</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='jetski' value='jet ski' id='jetskicheck'></input>
                <label htmlFor='coupe'>Jet Ski</label>
              </div>
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <ThemeProvider theme={theme}>
              <Slider
                value={value}
                onChange={handleChangePrice}
                valueLabelDisplay="auto"
                color='primary'
                step={1000}
                min={0}
                max={200000}
                onChangeCommitted={handleChangeCommitted}
              />
            </ThemeProvider>
            <input type='number' className='minmax' name='min' value={value[0]} placeholder='min' onChange={(e) => {
              if (e.target.value >= value[1]) {
                setValue([value[1], value[1]])
              } else {
                setValue([e.target.value, value[1]])
              }
              }}/>
            <input type='number' className='minmax' name='max' value={maxValue} placeholder='max' onChange={(e) => {
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
            <legend>Condition</legend>
              <div>
                <input className='checkinput' type='checkbox' name='poor' value='poor' id='poorcheck'></input>
                <label htmlFor='poor'>Poor</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='good' value='good' id='goodcheck'></input>
                <label htmlFor='good'>Good</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='excellent' value='excellent' id='excellentcheck'></input>
                <label htmlFor='excellent'>Excellent</label>
              </div>
          </fieldset>
          <div id='flexcontainerbuttons'>
            <button id='filterbutton' type='submit'>Submit</button>
            <button id='filterbutton' type='button' onClick={() => handleReset()}>Reset</button>
          </div>
        </> : <></>}
      </form>
      
      {/* ---------------------------------MOTORCYCLE---------------------------------------- */}
      <form className='motorcycleFilterForm' onSubmit={handleSubmit}>
        {filterText === 'motorcycle' ?
        <>
          <fieldset>
            <legend>Year</legend>
            <Typography id="typography" gutterBottom>
              {/* Show vehicles from:<br></br> */}
              <p>{yearRange[0]}</p><p>{yearRange[1]}</p>
            </Typography>
            <ThemeProvider theme={theme}>
              <Slider
                value={yearRange} // Math.min(array)
                onChange={handleChangeYear}
                valueLabelDisplay="off"
                color='primary'
                step={1}
                min={1950}
                max={maxYear}
                onChangeCommitted={handleChangeCommitted}
              />
            </ThemeProvider>
          </fieldset>
          <fieldset>
            <legend>Make</legend>
            <select
              name='make'
              id='make'
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
          </fieldset>
          <fieldset>
            <legend>Model</legend>
            <select
              name='model'
              id='model'
              defaultValue={''}
              onChange={() => {
                console.log(type)
                // document.getElementById('motocheck').checked = !document.getElementById('motocheck').checked
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
          </fieldset>
          <fieldset>
            <legend>Location</legend>
            <select
              name='location'
              id='location'
              defaultValue={sessionStorage.getItem('CurrentUser') ? JSON.parse(sessionStorage.getItem('CurrentUser')).base : 'all'} 
              >
              <option value='all'>All</option>
              {locations.map(e => {
                  return <option value={e.name}>{e.name}</option>
              })}
            </select>
          </fieldset>

          <fieldset>
            <legend>Type</legend>
              <div>
                <input className='checkinput' type='checkbox' name='streetbike' value='Street Bike' id='streetbikecheck'></input>
                <label htmlFor='streetbike'>Street</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='dirtbike' value='Dirt Bike' id='dirtbikecheck'></input>
                <label htmlFor='dirtbike'>Dirt</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='cruiser' value='Cruiser' id='cruisercheck'></input>
                <label htmlFor='cruiser'>Cruiser</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='sportbike' value='Sport Bike' id='sportbikecheck'></input>
                <label htmlFor='sportbike'>Sport</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='dualsport' value='Dual Sport' id='dualsportcheck'></input>
                <label htmlFor='dualsport'>Dual Sport</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='touringbike' value='Touring Bike' id='touringbikecheck'></input>
                <label htmlFor='touringbike'>Touring</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='adventurebike' value='Adventure Bike' id='adventurebikecheck'></input>
                <label htmlFor='adventurebike'>Adventure</label>
              </div>
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <ThemeProvider theme={theme}>
              <Slider
                value={value}
                onChange={handleChangePrice}
                valueLabelDisplay="auto"
                color='primary'
                step={1000}
                min={0}
                max={200000}
                onChangeCommitted={handleChangeCommitted}
              />
            </ThemeProvider>
            <input type='number' className='minmax' name='min' value={value[0]} placeholder='min' onChange={(e) => {
              if (e.target.value >= value[1]) {
                setValue([value[1], value[1]])
              } else {
                setValue([e.target.value, value[1]])
              }
              }}/>
            <input type='number' className='minmax' name='max' value={maxValue} placeholder='max' onChange={(e) => {
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
            <legend>Condition</legend>
              <div>
                <input className='checkinput' type='checkbox' name='poor' value='poor' id='poorcheck'></input>
                <label htmlFor='poor'>Poor</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='good' value='good' id='goodcheck'></input>
                <label htmlFor='good'>Good</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='excellent' value='excellent' id='excellentcheck'></input>
                <label htmlFor='excellent'>Excellent</label>
              </div>
          </fieldset>

          <div id='flexcontainerbuttons'>
            <button id='filterbutton' type='submit'>Submit</button>
            <button id='filterbutton' type='button' onClick={() => handleReset()}>Reset</button>
          </div>
        </> : <></>}
      </form>
{/* ---------------------------------RV---------------------------------------- */}
      <form className='rvFilterForm' onSubmit={handleSubmit}>
        {filterText === 'rv' ?
        <>
          <fieldset>
            <legend>Year</legend>
            <Typography id="typography" gutterBottom>
              {/* Show vehicles from:<br></br> */}
              <p>{yearRange[0]}</p><p>{yearRange[1]}</p>
            </Typography>
            <ThemeProvider theme={theme}>
              <Slider
                value={yearRange} // Math.min(array)
                onChange={handleChangeYear}
                valueLabelDisplay="off"
                color='primary'
                step={1}
                min={1950}
                max={maxYear}
                onChangeCommitted={handleChangeCommitted}
              />
            </ThemeProvider>
          </fieldset>
          <fieldset>
            <legend>Make</legend>
            <select
              name='make'
              id='make'
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
          </fieldset>
          <fieldset>
            <legend>Model</legend>
            <select
              name='model'
              id='model'
              defaultValue={''}
              onChange={() => {
                console.log(type)
                // document.getElementById('motorizedcheck').checked = !document.getElementById('motorizedcheck').checked
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
          </fieldset>

          <fieldset>
            <legend>Location</legend>
            <select
              name='location'
              id='location'
              defaultValue={sessionStorage.getItem('CurrentUser') ? JSON.parse(sessionStorage.getItem('CurrentUser')).base : 'all'} 
              // onChange={(e) => {
              //   setLocationDropDown(e.target.value)
              // }}
              >
              <option value='all'>All</option>
              {locations.map(e => {
                  return <option value={e.name}>{e.name}</option>
              })}
            </select>
          </fieldset>
          <fieldset>
            <legend>Type</legend>
              <div>
                <input className='checkinput' type='checkbox' name='motorized' value='motorized' id='motorizedcheck'></input>
                <label htmlFor='car'>Motorized</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='towable' value='towable' id='towablecheck'></input>
                <label htmlFor='coupe'>Towable</label>
              </div>
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <ThemeProvider theme={theme}>
              <Slider
                value={value}
                onChange={handleChangePrice}
                valueLabelDisplay="auto"
                color='primary'
                step={1000}
                min={0}
                max={200000}
                onChangeCommitted={handleChangeCommitted}
              />
            </ThemeProvider>
            <input type='number' className='minmax' name='min' value={value[0]} placeholder='min' onChange={(e) => {
              if (e.target.value >= value[1]) {
                setValue([value[1], value[1]])
              } else {
                setValue([e.target.value, value[1]])
              }
              }}/>
            <input type='number' className='minmax' name='max' value={maxValue} placeholder='max' onChange={(e) => {
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
            <legend>Condition</legend>
              <div>
                <input className='checkinput' type='checkbox' name='poor' value='poor' id='poorcheck'></input>
                <label htmlFor='poor'>Poor</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='good' value='good' id='goodcheck'></input>
                <label htmlFor='good'>Good</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='excellent' value='excellent' id='excellentcheck'></input>
                <label htmlFor='excellent'>Excellent</label>
              </div>
          </fieldset>
          <div id='flexcontainerbuttons'>
            <button id='filterbutton' type='submit'>Submit</button>
            <button id='filterbutton' type='button' onClick={() => handleReset()}>Reset</button>
          </div>
        </> : <></>}
      </form>
      
      {/* ---------------------------------TRAILER---------------------------------------- */}
      <form className='rvFilterForm' onSubmit={handleSubmit}>
        {filterText === 'trailer' ?
        <>
         <fieldset>
            <legend>Year</legend>
            <Typography id="typography" gutterBottom>
              {/* Show vehicles from:<br></br> */}
              <p>{yearRange[0]}</p><p>{yearRange[1]}</p>
            </Typography>
            <ThemeProvider theme={theme}>
              <Slider
                value={yearRange} // Math.min(array)
                onChange={handleChangeYear}
                valueLabelDisplay="off"
                color='primary'
                step={1}
                min={1950}
                max={maxYear}
                onChangeCommitted={handleChangeCommitted}
              />
            </ThemeProvider>
          </fieldset>
          <fieldset>
            <legend>Make</legend>
            <select
              name='make'
              id='make'
              defaultValue={'all'} 
              onChange={(e) => {
                setMakeDropDown(e.target.value)
              }}
              >
              <option value='all'>All</option>
              {originalListings.trailerListings.map(e => {
                if (!make.includes(e.make)) {
                  make.push(e.make)
                  return <option value={e.make}>{e.make}</option>
                }
              })}
            </select>
          </fieldset>
          <fieldset>
            <legend>Model</legend>
            <select
              name='model'
              id='model'
              defaultValue={''}
              onChange={() => {
                console.log(type)
                // document.getElementById('motorizedcheck').checked = !document.getElementById('motorizedcheck').checked
              }}
              >
              <option value='all'>All</option>
              {originalListings.trailerListings.map(e => {
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
          </fieldset>
          <fieldset>
            <legend>Location</legend>
            <select
              name='location'
              id='location'
              defaultValue={sessionStorage.getItem('CurrentUser') ? JSON.parse(sessionStorage.getItem('CurrentUser')).base : 'all'} 
              // onChange={(e) => {
              //   setLocationDropDown(e.target.value)
              // }}
              >
              <option value='all'>All</option>
              {locations.map(e => {
                  return <option value={e.name}>{e.name}</option>
              })}
            </select>
          </fieldset>
          <fieldset>
            <legend>Type</legend>
              <div>
                <input className='checkinput' type='checkbox' name='flatbed' value='flatbed' id='flatbedcheck'></input>
                <label htmlFor='Flatbed'>Flatbed</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='enclosed' value='enclosed' id='enclosedcheck'></input>
                <label htmlFor='Enclosed'>Enclosed</label>
              </div>
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <ThemeProvider theme={theme}>
              <Slider
                value={value}
                onChange={handleChangePrice}
                valueLabelDisplay="auto"
                color='primary'
                step={1000}
                min={0}
                max={200000}
                onChangeCommitted={handleChangeCommitted}
              />
            </ThemeProvider>
            <input type='number' className='minmax' name='min' value={value[0]} placeholder='min' onChange={(e) => {
              if (e.target.value >= value[1]) {
                setValue([value[1], value[1]])
              } else {
                setValue([e.target.value, value[1]])
              }
              }}/>
            <input type='number' className='minmax' name='max' value={maxValue} placeholder='max' onChange={(e) => {
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
            <legend>Condition</legend>
              <div>
                <input className='checkinput' type='checkbox' name='poor' value='poor' id='poorcheck'></input>
                <label htmlFor='poor'>Poor</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='good' value='good' id='goodcheck'></input>
                <label htmlFor='good'>Good</label>
              </div>
              <div>
                <input className='checkinput' type='checkbox' name='excellent' value='excellent' id='excellentcheck'></input>
                <label htmlFor='excellent'>Excellent</label>
              </div>
          </fieldset>
          <div id='flexcontainerbuttons'>
            <button id='filterbutton' type='submit'>Submit</button>
            <button id='filterbutton' type='button' onClick={() => handleReset()}>Reset</button>
          </div>
        </> : <></>}
      </form>
      </fieldset>
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