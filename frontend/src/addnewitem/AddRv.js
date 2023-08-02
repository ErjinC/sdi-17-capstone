import React, {useState, useEffect} from 'react';
import './add.css'
// import { ToastContainer, toast } from 'react-toastify';
import { Select, useToast, Stack, Textarea  } from '@chakra-ui/react';
import { ChakraProvider, Button, Input, Image} from '@chakra-ui/react';
import { ArrowBackIcon, AddIcon, } from '@chakra-ui/icons';


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
    const [imageURL, setImageURL] = useState('');
    const [imageURLText, setImageURLText] = useState('');
    const toast = useToast();

   
    return (
        <ChakraProvider>
        <div className='vehicle-creation-container'>

                {/*------------------------------ Button Div Container ------------------------------*/}
         <div className='vehicle-creation-button-container'>
            <Stack spacing={4} direction='row' >             
                 <Button leftIcon={<AddIcon />}  colorScheme='gray' size='md'
                className='vehicle-creation-button'
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
                                'image': imageURL,
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
            <Button leftIcon={<ArrowBackIcon />}  colorScheme='gray' size='md'onClick={() => setVehicleType('')}>Go Back</Button>
            </Stack>
        </div>
                {/*------------------------------ Vehicle Input Div Container ------------------------------*/}

         <div className='vehicle-creation-content-container'>       

            <div className='additem'>
                <div>
                    <label>Type</label>
                    <Select variant='filled'  id='type' onChange={(e) => setType(e.target.value)}>
                        <option value='motorized'>Motorized</option>
                        <option value='towable'>Towable</option>
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
                    <label>Length</label>
                    <Input variant='filled' type='number' id='length' onChange={(e) => setLength(e.target.value)} />
                </div>
                <div>
                    <label>Sleeps</label>
                    <Input variant='filled' type='number' id='sleeps' onChange={(e) => setSleeps(e.target.value)} />
                </div>
                <div>
                    <label>Weight</label>
                    <Input variant='filled' type='number' id='mileage' onChange={(e) => setWeight(e.target.value)} />
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
                    <Textarea variant='filled' size='sm' type='textbox' className='description-input' onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>
 {/*------------------------------ New Image Div Container ------------------------------*/} 
                    <div className='vehicle-creation-image-container'>
                        <div className='newImageContainer'>
                            {imageURL === '' ? <></> : <></>}
                            <Image id='new-boat-listing-image' boxSize='90%' alt='New Listing Image' src={imageURL} fallbackSrc='https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'></Image>  {/* Update the src prop to be dynamic */}
                        </div>
                        <div className='saveImageInputContainer'>
                            <label>Vehicle Image URL</label>
                            <Input variant='filled' type='text' id='imageUrlInput' onChange={(e) => setImageURLText(e.target.value)} />
                            <Button leftIcon={<AddIcon />} colorScheme='gray' size='md' id='previewImageButton' onClick={() => { setImageURL(imageURLText) }}>Preview Image</Button>
                        </div>
                    </div>
                </div>  
        </div>
        </ChakraProvider>
    );
}

export default AddRv;