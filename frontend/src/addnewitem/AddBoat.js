import React, { useState, useEffect } from 'react'
import './add.css'
import { ToastContainer, toast } from 'react-toastify';
import { Select } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';

const AddBoat = ({ locations, currentUser, setVehicleType }) => {
    const [type, setType] = useState('boat');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [hours, setHours] = useState('');
    const [condition, setCondition] = useState('poor');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    // const [uniqueLocations, setUniqueLocations] = useState();

    console.log('current user: ', currentUser)

    return (
        <ChakraProvider>
            <div className='boat-creation-container'>
                <div className='additem'>
                    <div>
                        <label>Type</label>
                        <select id='type' onChange={(e) => setType(e.target.value)}>
                            <option value='boat'>Boat</option>
                            <option value='jet ski'>Jet Ski</option>
                        </select>
                    </div>
                    <div>
                        <label>Make</label>
                        <input required='true' type='textbox' id='make' onChange={(e) => setMake(e.target.value)} />
                    </div>
                    <div>
                        <label>Model</label>
                        <input type='textbox' id='model' onChange={(e) => setModel(e.target.value)} />
                    </div>
                    <div>
                        <label>Year</label>
                        <input type='number' id='year' onChange={(e) => setYear(e.target.value)} />
                    </div>
                    <div>
                        <label>Price</label>
                        <input type='number' id='price' onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div>
                        <label>Hours</label>
                        <input type='number' id='hours' onChange={(e) => setHours(e.target.value)} />
                    </div>
                    <div>
                        <label>Condition</label>
                        <select id='condition' onChange={(e) => setCondition(e.target.value)}>
                            <option value='poor'>Poor</option>
                            <option value='good'>Good</option>
                            <option value='excellent'>Excellent</option>
                        </select>
                    </div>
                    <div>
                        <label>Location</label>
                        <Select defaultValue={currentUser.location} onChange={(e) => setLocation(e.target.value)}>
                            {locations?.map((location) => <option key={location.baseId} value={location.name}>{location.name}</option>)}
                        </Select>
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea type='textbox' className='description-input' onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>

                <button
                    className='addbutton'
                    onClick={() => {
                        if (type && make && model && year && price && hours && condition && location && description) {
                            fetch(`http://localhost:3001/addListing/boats`, {
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
                                    'hours': Number(hours),
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
                            toast('Please fill out all fields!')
                        }
                    }}
                >Create new Listing</button>
                <button onClick={() => setVehicleType('')}>Go Back</button>
                <ToastContainer />
            </div>
        </ChakraProvider>
    );
}

export default AddBoat;