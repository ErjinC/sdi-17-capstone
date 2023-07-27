import React, { useEffect, useState } from 'react'
import './CreateListing.css'
import AddCar from '../addnewitem/AddCar';
import AddBoat from '../addnewitem/AddBoat';
import AddMotorcycle from '../addnewitem/AddMotorcycle';
import AddRv from '../addnewitem/AddRv';
import AddTrailer from '../addnewitem/AddTrailer';
import { useNavigate } from 'react-router-dom';
import { ParentContext } from '../App';

const CreateListing = () => {
  const {currentUser} = React.useContext(ParentContext)
  const [vehicleSelected, setVehicleSelected] = useState(false);
  const [vehicleType, setVehicleType] = useState('');
  const navigate = useNavigate();

  function assignVehicleHandler(event) {
    setVehicleSelected(true);
    setVehicleType(event.target.value);
  }

  function renderComponent() {
    switch(vehicleType){
        case 'car': return <AddCar currentUser= {currentUser} setVehicleType= {setVehicleType} />;
        case 'motorcycles': return <AddMotorcycle currentUser= {currentUser} setVehicleType= {setVehicleType} />;
        case 'rvs': return <AddRv currentUser= {currentUser} setVehicleType= {setVehicleType} />;
        case 'boats': return <AddBoat currentUser= {currentUser} setVehicleType= {setVehicleType} />;
        case 'trailers': return <AddTrailer currentUser= {currentUser} setVehicleType= {setVehicleType} />;
        default: return <CreateListing />;
    }
  }

  const vehicleTypeSelect = (
    <div id='descriptionTextContainer'>
      <h1 id='detailheader'></h1>
      <h3>What vehicle would you like to list?</h3>
      <button value='car' onClick={assignVehicleHandler}>Car</button>
      <button value='motorcycles' onClick={assignVehicleHandler}>Motorcycle</button>
      <button value='rvs' onClick={assignVehicleHandler}>RV</button>
      <button value='boats' onClick={assignVehicleHandler}>Boat</button>
      <button value='trailers' onClick={assignVehicleHandler}>Trailer</button>
      <p className='centered'> Or go back to...</p>
      <button onClick={() => navigate('/listings')}>Your Listings</button>
    </div>
  )

  return (
    <>
      <div id='flexcontainerdetail'>
        {vehicleSelected ? renderComponent() : vehicleTypeSelect}
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

export default CreateListing;