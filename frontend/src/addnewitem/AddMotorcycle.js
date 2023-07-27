import React, { useState, useEffect } from 'react'
import './add.css'
import { ToastContainer, toast } from 'react-toastify';

const AddMotorcycle = ({ currentUser, setVehicleType }) => {
    const [type, setType] = useState('Street Bike');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [mileage, setMileage] = useState('');
    const [color, setColor] = useState('');
    const [condition , setCondition] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [uniqueLocations, setUniqueLocations] = useState();

    const getUniqueLocations = async () => {
        let request = await fetch('http://localhost:3001/allUniqueLocations');
        let response = await request.json();
        setUniqueLocations(response);
    };

    useEffect(() => {
        getUniqueLocations();
    }, []);

    return (
        <div className='car-creation-container'>
            <div className ='additem'>
                <div>
                <label>Type</label>
                    <select id='type' onChange={(e) => setType(e.target.value)}>
                        <option value='Street Bike'>Street Bike</option>
                        <option value='Dirt Bike'>Dirt Bike</option>
                        <option value='Cruiser'>Cruiser</option>
                        <option value='Sport Bike'>Sport Bike</option>
                        <option value='Touring Bike'>Touring Bike</option>
                        <option value='Adventure Bike'>Adventure Bike</option>
                        <option value='Dual Sport'>Dual Sport</option>
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
                    <label>Color</label>
                    <input type='textbox' id='color' onChange={(e) => setColor(e.target.value)} />
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
                        {uniqueLocations?.locations.map((location) => {
                            return <option value={location}>{location}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label>Description</label>
                    <textarea type='textbox' id='description' onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>
            
            <button
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
                                'color': Number(color),
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

export default AddMotorcycle;