import React, {useState} from 'react'
import './add.css'


const addCar = () => {
    const [type, setType] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [mileage, setMileage] = useState('');
    const [color, setColor] = useState('');
    const [transmission, setTransmission] = useState('');
    const [condition , setCondition] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [sold, setSold] = useState('');
    const [image, setImage] = useState('');

    return (
        <><><><div>
            <div id='additem'>
                <div>
                    <div>Type</div>
                    <input
                        type='textbox'
                        id='type'
                        onChange={() => {
                            setType(document.getElementById('type').value);
                        } }
                    ></input>
                </div>

                <div>Make</div>
                <input
                    type='textbox'
                    id='make'
                    onChange={() => {
                        setMake(document.getElementById('make').value);
                    } }
                ></input>

                <div>Model</div>
                <input
                    type='textbox'
                    id='model'
                    onChange={() => {
                        setModel(document.getElementById('model').value);
                    } }
                ></input>

                <div>Year</div>
                <input
                    type='textbox'
                    id='year'
                    onChange={() => {
                        setYear(document.getElementById('year').value);
                    } }
                ></input>

                <div>Price</div>
                <input
                    type='textbox'
                    id='price'
                    onChange={() => {
                        setPrice(document.getElementById('price').value);
                    } }
                ></input>


                <div>Mileage</div>
                <input
                    type='textbox'
                    id='mileage'
                    onChange={() => {
                        setMileage(document.getElementById('mileage').value);
                    } }
                ></input>
                <div>Color</div>
                <input
                    type='textbox'
                    id='color'
                    onChange={() => {
                        setColor(document.getElementById('color').value);
                    } }
                ></input>


            <><div>Transmission</div>
                <input
                    type='textbox'
                    id='transmission'
                    onChange={() => {
                        setTransmission(document.getElementById('transmission').value);
                    } }
                ></input><div>Condition</div>
                <input
                    type='textbox'
                    id='condition'
                    onChange={() => {
                        setCondition(document.getElementById('condition').value);
                    } }
                ></input></></><><div>Location</div><input
                    type='textbox'
                    id='location'
                    onChange={() => {
                        setLocation(document.getElementById('location').value);
                    } }
                ></input></></></><><div>Description</div><textarea
                    id='description'
                    onChange={() => {
                        setDescription(document.getElementById('description').value);
                    } }
                ></textarea>

                <button
                
                    id='addbutton'
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
                    } }
                    addbutton
                ></button></></>
                

            </div>
        </div>

    );

}

export default addCar