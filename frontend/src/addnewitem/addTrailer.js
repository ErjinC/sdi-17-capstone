import React, {useState} from 'react'
import './add.css'

const AddTrailer = () => {
    const [type, setType] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [length, setLength] = useState('');
    const [condition , setCondition] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [sold, setSold] = useState('');
    const [image, setImage] = useState('');

    return (
        <div>
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
               
                <div>Length</div>
                <input
                    type='textbox'
                    id='length'
                    onChange={() => {
                        setLength(document.getElementById('length').value);
                    } }
                ></input>
            
                <div>Condition</div>
                    <input
                    type='textbox'
                    id='condition'
                    onChange={() => {
                        setCondition(document.getElementById('condition').value);
                    } }
                ></input>

                <div>Location</div>
                    <input
                    type='textbox'
                    id='location'
                    onChange={() => {
                        setLocation(document.getElementById('location').value);
                    } }
                ></input>

                <div>Description</div>
                    <textarea
                    id='description'
                    onChange={() => {
                        setDescription(document.getElementById('description').value);
                    } }
                ></textarea>

                <button
                    id='addbutton'
                    onClick={() => {
                        fetch('http://localhost:3001/trailers', {
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
                                'length': length,
                                'condition': condition,
                                'location,': location,
                                'description,': description,
                            }])
                        })
                            .then(data => data.json())
                            .then(window.location = '/login')
                            .then(alert('Added Successful!'));
                    } }
                    addbutton
                ></button>
                

            </div>
        </div>

    );

}

export default addTrailer