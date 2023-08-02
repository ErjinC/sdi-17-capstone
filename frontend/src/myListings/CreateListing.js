import React, { useEffect, useState, useContext } from 'react'
import './CreateListing.css'
import AddCar from '../addnewitem/AddCar';
import AddBoat from '../addnewitem/AddBoat';
import AddMotorcycle from '../addnewitem/AddMotorcycle';
import AddRv from '../addnewitem/AddRv';
import AddTrailer from '../addnewitem/AddTrailer.js';
import { useNavigate } from 'react-router-dom';
import { ParentContext } from '../App';
import { Button, ChakraProvider} from '@chakra-ui/react';

const CreateListing = () => {
  const {currentUser, locations} = useContext(ParentContext)
  const [vehicleSelected, setVehicleSelected] = useState(false);
  const [vehicleType, setVehicleType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('CurrentUser') === null) {
      window.location='/'
    }
    
    fetch('http://localhost:3001/bases')
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            setLocations(data)
    })
  })

  function assignVehicleHandler(event) {
    setVehicleSelected(true);
    setVehicleType(event.target.value);
  }

  function renderComponent() {
    switch(vehicleType){
        case 'car': return <AddCar locations= {locations} currentUser= {currentUser} setVehicleType= {setVehicleType} />;
        case 'motorcycles': return <AddMotorcycle locations= {locations} currentUser= {currentUser} setVehicleType= {setVehicleType} />;
        case 'rvs': return <AddRv locations= {locations} currentUser= {currentUser} setVehicleType= {setVehicleType} />;
        case 'boats': return <AddBoat locations= {locations} currentUser= {currentUser} setVehicleType= {setVehicleType} />;
        case 'trailers': return <AddTrailer locations= {locations} currentUser= {currentUser} setVehicleType= {setVehicleType} />;
        default: return <CreateListing />;
    }
  }

  const vehicleTypeSelect = (
    <div id='descriptionTextContainer'>
      <h1 id='detailheader'></h1>
      <h3>What type of vehicle would you like to list?</h3>
      <Button colorScheme='gray' size='md' value='car' onClick={assignVehicleHandler}>Car</Button>
      <Button colorScheme='gray' size='md' value='motorcycles' onClick={assignVehicleHandler}>Motorcycle</Button>
      <Button colorScheme='gray' size='md' value='rvs' onClick={assignVehicleHandler}>RV</Button>
      <Button colorScheme='gray' size='md' value='boats' onClick={assignVehicleHandler}>Boat</Button>
      <Button colorScheme='gray' size='md' value='trailers' onClick={assignVehicleHandler}>Trailer</Button>
      <p className='centered'> Or go back to...</p>
      <Button colorScheme='gray' size='md'onClick={() => navigate('/listings')}>Your Listings</Button>
    </div>
  )

  return (
    <ChakraProvider>
      <div id='flexcontainerdetail'>
        {vehicleSelected ? renderComponent() : vehicleTypeSelect}
      </div>
    </ChakraProvider>
  )
}

export default CreateListing;