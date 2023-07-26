import React, { useEffect, useState } from 'react'
import './CreateListing.css'
import AddCar from '../addnewitem/addCar';

const CreateListing = () => {
  const [vehicleSelected, setVehicleSelected] = useState(false);
  const [vehicleType, setVehicleType] = useState('');

  function assignVehicleHandler(event) {
    setVehicleSelected(true);
    setVehicleType(event.target.value);
  }


  const vehicleTypeSelect = (
    <div id='descriptionTextContainer'>
      <h1 id='detailheader'></h1>
      <h3>What vehicle would you like to list?</h3>
      <button value='car' onClick={assignVehicleHandler}>Cars</button>
      <button value='motorcycles' onClick={assignVehicleHandler}>Motorcycles</button>
      <button value='rvs' onClick={assignVehicleHandler}>RVs</button>
      <button value='boats' onClick={assignVehicleHandler}>Boats</button>
      <button value='trailers' onClick={assignVehicleHandler}>Trailers</button>
    </div>
  )

  return (
    <>
      <div id='flexcontainerdetail'>
        {vehicleSelected ? <AddCar /> : vehicleTypeSelect}
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

export default CreateListing