import React, { useState, useEffect } from 'react'
import './add.css'
// import { ToastContainer, toast } from 'react-toastify';
import { Select, useToast, Textarea } from '@chakra-ui/react';
import { ChakraProvider, Button, Input, Stack, Image } from '@chakra-ui/react';
import { ArrowBackIcon, AddIcon } from '@chakra-ui/icons'

const AddBoat = ({ locations, currentUser, setVehicleType }) => {
    const [type, setType] = useState('boat');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [hours, setHours] = useState('');
    const [condition, setCondition] = useState('poor');
    const [location, setLocation] = useState(JSON.parse(sessionStorage.getItem('CurrentUser')).base);
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [imageURLText, setImageURLText] = useState('');

    const toast = useToast()
    // const [uniqueLocations, setUniqueLocations] = useState();

    // console.log('current user: ', currentUser)

    return (
        <ChakraProvider>
            <div className='vehicle-creation-container'>

                {/*------------------------------ Button Div Container ------------------------------*/}

                <div className='vehicle-creation-button-container'>
                    <Stack spacing={4} direction='row' >
                    <Button leftIcon={<ArrowBackIcon />} colorScheme='gray' size='md' className='vehicle-creation-button' onClick={() => setVehicleType('')}>Go Back</Button>
                        <Button leftIcon={<AddIcon />} colorScheme='gray' size='md'
                            className='vehicle-creation-button'
                            onClick={() => {
                                if (type && make && model && year && price && hours && condition && location && description && imageURL) {
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
                                            'image': imageURLText,
                                        })
                                    })
                                        .then(data => data.json())
                                        // .then(res => console.log(res))
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
                        >Post Listing</Button>
                    </Stack>
                </div>

                {/*------------------------------ Vehicle Input Div Container ------------------------------*/}

                <div className='vehicle-creation-content-container'>

                    <div className='additem'>
                        <div>
                            <label>Type</label>
                            <Select background="white" id='type' onChange={(e) => setType(e.target.value)}>
                                <option value='boat'>Boat</option>
                                <option value='jet ski'>Jet Ski</option>
                            </Select>
                        </div>
                        <div>
                            <label>Make</label>
                            <Input background="white" required='true' type='textbox' id='make' onChange={(e) => setMake(e.target.value)} />
                        </div>
                        <div>
                            <label>Model</label>
                            <Input background="white" type='textbox' id='model' onChange={(e) => setModel(e.target.value)} />
                        </div>
                        <div>
                            <label>Year</label>
                            <Input background="white" type='number' id='year' onChange={(e) => setYear(e.target.value)} />
                        </div>
                        <div>
                            <label>Price</label>
                            <Input background="white" type='number' id='price' onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div>
                            <label>Hours</label>
                            <Input background="white" type='number' id='hours' onChange={(e) => setHours(e.target.value)} />
                        </div>
                        <div>
                            <label>Condition</label>
                            <Select background="white" id='condition' onChange={(e) => setCondition(e.target.value)}>
                                <option value='poor'>Poor</option>
                                <option value='good'>Good</option>
                                <option value='excellent'>Excellent</option>
                            </Select>
                        </div>
                        <div>
                            <label>Location</label>
                            <Select background="white" defaultValue={JSON.parse(sessionStorage.getItem('CurrentUser')).base} onChange={(e) => setLocation(e.target.value)}>
                                {locations?.map((location) => <option key={location.baseId} value={location.name}>{location.name}</option>)}
                            </Select>
                        </div>
                        <div>
                            <label>Description</label>
                            <Textarea background="white" size='sm' type='textbox' className='description-input' onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>

                    {/*------------------------------ New Image Div Container ------------------------------*/}

                    <div className='vehicle-creation-image-container'>
                        <div className='newImageContainer'>
                            {imageURL === '' ? <></> : <></>}
                            <Image id='new-boat-listing-image' boxSize='90%' alt='New Listing Image' src={imageURL} fallbackSrc='https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'></Image> 
                        </div>
                        <div className='saveImageInputContainer'>
                            <label>Vehicle Image URL</label>
                            <Input background="white" type='text' id='imageUrlInput' onChange={(e) => setImageURLText(e.target.value)} />
                            <Button leftIcon={<AddIcon />} colorScheme='gray' size='md' id='previewImageButton' onClick={() => { setImageURL(imageURLText) }}>Preview Image</Button>
                        </div>
                    </div>
                </div>
            </div>
        </ChakraProvider>
    );
}

export default AddBoat;