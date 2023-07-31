import React, {useState, useEffect} from 'react'
import './add.css'
import { ToastContainer, toast } from 'react-toastify';
import { Select } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';


const AddRv = ({ locations, currentUser, setVehicleType }) => {
    const [type, setType] = useState('motorized');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [mileage, setMileage] = useState('');
    const [sleeps, setSleeps] = useState('');
    const [weight, setWeight] = useState('');
    const [length, setLength] = useState('');
    const [condition , setCondition] = useState('poor');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
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
    //     let request = await fetch('http://localhost:3001/allUniqueLocations');
    //     let response = await request.json();
    //     setUniqueLocations(response);
    // }

    useEffect(() => {
        // getUniqueLocations();
    }, [])

    return (
        <div className='rv-creation-container'>
            <div className='additem'>
                <div>
                    <label>Type</label>
                    <select id='type' onChange={(e) => setType(e.target.value)}>
                        <option value='motorized'>Motorized</option>
                        <option value='towable'>Towable</option>
                    </select>
                </div>
                <div>
                    <label>Make</label>
                    <input type='textbox' id='make' onChange={(e) => setMake(e.target.value)} />
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
                    <label>Mileage</label>
                    <input type='number' id='mileage' onChange={(e) => setMileage(e.target.value)} />
                </div>
                <div>
                    <label>Length</label>
                    <input type='number' id='length' onChange={(e) => setLength(e.target.value)} />
                </div>
                <div>
                    <label>Sleeps</label>
                    <input type='number' id='sleeps' onChange={(e) => setSleeps(e.target.value)} />
                </div>
                <div>
                    <label>Weight</label>
                    <input type='number' id='mileage' onChange={(e) => setWeight(e.target.value)} />
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
                    <select type='textbox' id='loction' onChange={(e) => setLocation(e.target.value)}>
                        <option value=''>Please select a location</option>
                        {/* {uniqueLocations?.locations.map((location) => {
                            return <option value={location}>{location}</option>
                        })} */}
                        {allBases.map((location) => {
                            return <option value={location}>{location}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label>Description</label>
                    <textarea type='textbox' className='description-input' onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>

            <button
                className='addbutton'
                onClick={() => {
                    if (type && make && model && year && price && mileage && sleeps && weight && length && condition && location && description) {
                        fetch(`http://localhost:3001/addListing/rvs`, {
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
                                'sleeps': Number(sleeps),
                                'weight': Number(weight),
                                'length': Number(length),
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
            <ToastContainer/>
        </div>
    );
}

export default AddRv;