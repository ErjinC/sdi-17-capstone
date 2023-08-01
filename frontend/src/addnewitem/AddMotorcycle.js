import React, { useState, useEffect } from 'react'
import './add.css'
// import { ToastContainer, toast } from 'react-toastify';
import { Select, useToast, Textarea} from '@chakra-ui/react';
import { ChakraProvider, Button, Input, Stack } from '@chakra-ui/react';
import { ArrowBackIcon, AddIcon } from '@chakra-ui/icons'

const AddMotorcycle = ({ locations, currentUser, setVehicleType }) => {
    const [type, setType] = useState('Street Bike');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [mileage, setMileage] = useState('');
    const [color, setColor] = useState('');
    const [condition , setCondition] = useState('poor');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const toast = useToast()
    // const [uniqueLocations, setUniqueLocations] = useState();

    const allBases = [
        'Los Angeles SFB',
        'Edwards AFB',
        'Vandenberg SFB',
        'Patrick SFB',
        'Peterson SFB',
        'Schriever SFB',
        'Buckley SFB',
        'Offutt AFB',
        'Wright-Patterson AFB',
        'Eglin AFB',
        'Kirtland AFB',
        'Lackland AFB',
        'Langley AFB',
        'Travis AFB',
        'Luke AFB'
    ];

    // const getUniqueLocations = async () => {
        // let request = await fetch('http://localhost:3001/allUniqueLocations');
        // let response = await request.json();
        // setUniqueLocations(response);
    // };

    useEffect(() => {
        // getUniqueLocations();
    }, []);

    return (
        <ChakraProvider>
        <div className='car-creation-container'>
            <div className ='additem'>
            <div>
                     <label>Type</label>
                     <Select variant='filled' id='type' onChange={(e) => setType(e.target.value)}>
                        <option value='Street Bike'>Street Bike</option>
                        <option value='Dirt Bike'>Dirt Bike</option>
                        <option value='Cruiser'>Cruiser</option>
                        <option value='Sport Bike'>Sport Bike</option>
                        <option value='Touring Bike'>Touring Bike</option>
                        <option value='Adventure Bike'>Adventure Bike</option>
                        <option value='Dual Sport'>Dual Sport</option>
                     </Select>
                </div>
                <div>
                    <label>Make</label>
                    <Input variant='filled' type='textbox' id='make' onChange={(e) => setMake(e.target.value)} />
                </div>
                <div>
                    <label>Model</label>
                    <Input variant='filled' type='textbox' id='model' onChange={(e) => setModel(e.target.value)} />
                </div>
                <div>
                    <label>Year</label>
                    <Input variant='filled' type='number' id='year' onChange={(e) => setYear(e.target.value)} />
                </div>
                <div>
                    <label>Price</label>
                    <Input variant='filled' type='number' id='price' onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <label>Mileage</label>
                    <Input variant='filled' type='number' id='mileage' onChange={(e) => setMileage(e.target.value)} />
                </div>
                <div>
                    <label>Color</label>
                    <Input variant='filled' type='textbox' id='color' onChange={(e) => setColor(e.target.value)} />
                </div>
                <div>
                    <label>Condition</label>
                    <Select variant='filled' id='condition' onChange={(e) => setCondition(e.target.value)}>
                        <option value='poor'>Poor</option>
                        <option value='good'>Good</option>
                        <option value='excellent'>Excellent</option>
                    </Select>
                </div>
                <div>
                    <label>Location</label>
                    <Select variant='filled' type='textbox' id='loction' onChange={(e) => setLocation(e.target.value)}>
                        <option value=''>Please select a location</option>
                        {/* {uniqueLocations?.locations.map((location) => {
                            return <option value={location}>{location}</option>
                        })} */}
                        {allBases.map((location) => {
                            return <option value={location}>{location}</option>
                        })}
                    </Select>
                </div>
                <div>
                    <label>Description</label>
                    <Textarea variant='filled' size='sm' type='textbox' className='description-input' onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>
            <Stack spacing={4} direction='row' > 
            <Button leftIcon={<AddIcon />}  colorScheme='gray' size='md'
                className='addbutton'
                onClick={() => {
                    if (type && make && model && year && price && mileage && color && condition && location && description) {
                        fetch(`http://localhost:3001/addListing/motorcycles`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                'type': type,
                                'description': description,
                                'make': make,
                                'model': model,
                                'year': Number(year),
                                'price': Number(price),
                                'mileage': Number(mileage),
                                'color': color,
                                'condition': condition,
                                'location': location,
                                'userId': currentUser.userId,
                            })
                        })
                            .then(data => data.json())
                            .then(res => console.log(res))
                            .then(window.location = '/listings')
                            .then(alert('Added Successful!'));
                    } else {
                        // toast('Please fill out all fields!')
                        toast({
                            title: 'Please fill out all fields',
                            status: 'warning',
                            duration: 2000,
                            isClosable: true,
                          })
                    }
                }}
            >Create new Listing</Button>
            <Button leftIcon={<ArrowBackIcon />}   colorScheme='gray' size='md' onClick={() => setVehicleType('')}>Go Back</Button>
            </Stack>
            {/* <ToastContainer/> */}
        </div>
        </ChakraProvider>
    );
}

export default AddMotorcycle;