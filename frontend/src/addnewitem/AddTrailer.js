import React, {useState, useEffect} from 'react'
import './add.css'
// import { ToastContainer, toast } from 'react-toastify';
import { Select, useToast, Textarea } from '@chakra-ui/react';
import { ChakraProvider, Button, Input, Stack } from '@chakra-ui/react';
import { ArrowBackIcon, AddIcon } from '@chakra-ui/icons'


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

    
    

    return (
        <ChakraProvider>
        <div className='car-creation-container'>
            <div className ='additem'>
            <div>
                    <label>Type</label>
                    <Select variant='filled' id='type' onChange={(e) => setType(e.target.value)}>
                        <option value='flatbed'>Flatbed</option>
                        <option value='enclosed'>Enclosed</option>
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
                    <label>Length</label>
                    <Input  variant='filled' type='number' id='length' onChange={(e) => setLength(e.target.value)} />
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
                    <Select variant='filled' defaultValue={currentUser.location} onChange={(e) => setLocation(e.target.value)}>
                            {locations?.map((location) => <option key={location.baseId} value={location.name}>{location.name}</option>)}
                        </Select>
                </div>
                <div>
                    <label>Description</label>
                    <Textarea variant='filled' size='sm' type='textbox' className='description-input' onChange={(e) => setDescription(e.target.value) } />
                </div>
            </div>
            <Stack spacing={4} direction='row' >               
            <Button leftIcon={<AddIcon />} colorScheme='gray' size='md'
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
            >Create new Listing</Button>
            <Button leftIcon={<ArrowBackIcon />}  colorScheme='gray' size='md' onClick={() => setVehicleType('')}>Go Back</Button>
            </Stack>
            {/* <ToastContainer/> */}
        </div>
        </ChakraProvider>
    );

}

export default AddTrailer