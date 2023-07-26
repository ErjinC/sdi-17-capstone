import React, { useState } from 'react'
import './add.css'


const AddCar = () => {
    const [type, setType] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [mileage, setMileage] = useState('');
    const [color, setColor] = useState('');
    const [transmission, setTransmission] = useState('');
    const [condition, setCondition] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [sold, setSold] = useState('');
    const [image, setImage] = useState('');

    return (
        <div className='car-creation-container'>
            <div className='additem'>
                <div>
                    <label>Type</label>
                    <input type='textbox' id='type' onChange={(e) => setType(e.target.value)} />
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
                    <input type='textbox' id='year' onChange={(e) => setYear(e.target.value)} />
                </div>
                <div>
                    <label>Price</label>
                    <input type='textbox' id='price' onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <label>Mileage</label>
                    <input type='textbox' id='mileage' onChange={(e) => setMileage(e.target.value)} />
                </div>
                <div>
                    <label>Color</label>
                    <input type='textbox' id='color' onChange={(e) => setColor(e.target.value)} />
                </div>
                <div>
                    <label>Transmission</label>
                    <input type='textbox' id='transmission' onChange={(e) => setTransmission(e.target.value)} />
                </div>
                <div>
                    <label>Condition</label>
                    <input type='textbox' id='condition' onChange={(e) => setCondition(e.target.value)} />
                </div>
                <div>
                    <label>Location</label>
                    <input type='textbox' id='loction' onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea type='textbox' id='description' onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>

            <button
                className='addbutton'
                onClick={() => {
                    fetch('http://localhost:3001/cars', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify([{
                            'type': type,
                            'make': make,
                            'model': model,
                            'year': year,
                            'price': price,
                            'mileage': mileage,
                            'color': color,
                            'transmission': transmission,
                            'condition': condition,
                            'location,': location,
                            'description,': description,
                        }])
                    })
                        .then(data => data.json())
                        .then(window.location = '/MyListing')
                        .then(alert('Added Successful!'));
                }}
            >addbutton</button>
        </div>
    );
}

export default AddCar;