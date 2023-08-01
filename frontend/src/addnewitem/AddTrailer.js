import React, {useState, useEffect} from 'react'
import './add.css'
// import { ToastContainer, toast } from 'react-toastify';
import { Select, useToast } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';


const AddTrailer = ({ locations, currentUser, setVehicleType }) => {
    const [type, setType] = useState('flatbed');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [length, setLength] = useState('');
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
    //     let request = await fetch('http://localhost:3001/allUniqueLocations');
    //     let response = await request.json();
    //     setUniqueLocations(response);
    // }

    useEffect(() => {
        // getUniqueLocations();
    }, [])

    return (
        <ChakraProvider>
        <div className='car-creation-container'>
            <div className ='additem'>
            <div>
                    <label>Type</label>
                    <select id='type' onChange={(e) => setType(e.target.value)}>
                        <option value='flatbed'>Flatbed</option>
                        <option value='enclosed'>Enclosed</option>
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
                    <label>Length</label>
                    <input type='number' id='length' onChange={(e) => setLength(e.target.value)} />
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
                        {/* <option value=''>Please select a location</option>
                        {uniqueLocations?.locations.map((location) => {
                            return <option value={location}>{location}</option> */}
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
                    if (type && make && model && year && price && length && condition && location && description) {
                        fetch(`http://localhost:3001/addListing/trailers`, {
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
                        // toast('Please fill out all fields!')
                        toast({
                            title: 'Please fill out all fields',
                            status: 'warning',
                            duration: 2000,
                            isClosable: true,
                          })
                    }
                }}
            >Create new Listing</button>
            <button onClick={() => setVehicleType('')}>Go Back</button>
            {/* <ToastContainer/> */}
        </div>
        </ChakraProvider>
    );

}

export default AddTrailer