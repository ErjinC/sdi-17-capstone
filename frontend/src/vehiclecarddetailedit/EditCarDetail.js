import React, { useState, useEffect, useContext } from 'react'
import './VehicleCardDetailEdit.css'
import { ParentContext } from '../App'
import { Modal } from '@mui/material'
// import { ToastContainer, toast } from 'react-toastify';
import { Select, useToast, Input, Button } from '@chakra-ui/react'
import { ChakraProvider, Tooltip, Image } from '@chakra-ui/react'
import { AddIcon, EditIcon } from '@chakra-ui/icons'


const EditCarDetail = ({ vehicle, favorited, setDetailedView, locations }) => {
  const { userFavorites, setUserFavorites } = useContext(ParentContext)
  const [favorite, setFavorite] = useState(favorited)
  const [soldStatus, setSoldStatus] = useState(vehicle.sold)
  const [soldStatusChanged, setSoldStatusChanged] = useState(false)
  const [editToggle, setEditToggle] = useState(false)
  const [editYear, setEditYear] = useState(vehicle.year)
  const [editMake, setEditMake] = useState(vehicle.make)
  const [editModel, setEditModel] = useState(vehicle.model)
  const [editCondition, setEditCondition] = useState(vehicle.condition)
  const [editPrice, setEditPrice] = useState(vehicle.price)
  const [editMileage, setEditMileage] = useState(vehicle.mileage)
  const [editLocation, setEditLocation] = useState(vehicle.location)
  const [editTransmission, setEditTransmission] = useState(vehicle.transmission)
  const [editColor, setEditColor] = useState(vehicle.color)
  const [editDescription, setEditDescription] = useState(vehicle.description)
  const [editImageURL, setEditImageURL] = useState(vehicle.image);
  const [editImageURLText, setEditImageURLText] = useState(vehicle.image);

  let link = window.location.href
  let linkArr = link.split('/')
  let linkRoute = linkArr.pop()
  const toast = useToast()


  const [listingOwner, setListingOwner] = useState({})
  useEffect(() => {
    fetch(`http://localhost:3001/users/${vehicle.user_id}`)
      .then(res => res.json())
      .then((data) => {
        setListingOwner(data)
        // console.log(data);
      })
  }, [])

  const handleFavoriteAdd = (event) => {
    setFavorite(true)
    event.stopPropagation()
    setUserFavorites([...userFavorites, vehicle.listingId])
  }

  const handleFavoriteRemove = (event) => {
    setFavorite(false)
    event.stopPropagation()
    let index = userFavorites.indexOf(vehicle.listingId);
    let tempArr = userFavorites.toSpliced(index, 1)
    if (index !== -1) {
      setUserFavorites(tempArr);
    }
  }


  const handleSell = () => {
    // console.log('Sold')
    setSoldStatus(true);
    setSoldStatusChanged(!soldStatusChanged);
    fetch(`http://localhost:3001/sold/${vehicle.car_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'car',
        sold: true
      })
    })
  }

  const handleRelist = () => {
    // console.log('Relisting')
    setSoldStatus(false);
    setSoldStatusChanged(!soldStatusChanged);
    fetch(`http://localhost:3001/sold/${vehicle.car_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'car',
        sold: false
      })
    })
  }

  const handleListingRemove = () => {
    // console.log('vehicle: ', vehicle)
    if (window.confirm('Are you sure you want to delete your listing?')) {
      fetch(`http://localhost:3001/listings`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle)
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            // toast.success('Successfully deleted!', {
            //   position: toast.POSITION.BOTTOM_CENTER
            // })
            toast({
              title: 'Successfully deleted listing',
              // description: "Thank you",
              status: 'success',
              duration: 2000,
              isClosable: true,
            })
            setTimeout(() => {
              window.location = '/listings'
            }, 2000);
          } else if (!data.success) {
            // toast.error('Failed to delete!', {
            //   position: toast.POSITION.BOTTOM_CENTER
            // })
            toast({
              title: 'Failed to delete listing',
              // description: "Thank you",
              status: 'error',
              duration: 2000,
              isClosable: true,
            })
            setTimeout(() => {
              window.location = '/listings'
            }, 2000);
          }
        })
    }
  }
  // console.log(vehicle);

  const handleEdit = () => {
    // console.log('New Year: ', editYear)
    // console.log('New Make: ', editMake)
    // console.log('New Model: ', editModel)
    // console.log('New Price: ', editPrice)
    // console.log('New Description: ', editDescription)
    const patchOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        car_id: vehicle.car_id,
        newYear: editYear,
        newMake: editMake,
        newModel: editModel,
        newPrice: editPrice,
        newDescription: editDescription,
        newMileage: editMileage,
        newTransmission: editTransmission,
        newColor: editColor,
        newCondition: editCondition,
        newLocation: editLocation,
        newUrl: editImageURLText
      })
    }

    fetch(`http://localhost:3001/updateListing`, patchOptions)
      .then(data => data.json())
      .then(res => {
        if (res.success) {
          // success message
          // console.log('result: ', res.vehicle)
          setEditToggle(!editToggle)
          setDetailedView({ active: true, vehicle: res.vehicle })
          // window.location.reload()
        } else {
          // failure message
          toast.error('Update failed, please try again later')
          setEditToggle(!editToggle)
        }
      })
  }

  return (
    <ChakraProvider>
      <div id='detailFlexContainer'>
        <div id='detailimagecontainer' className='editdetailimagecontainer'>
          {editToggle ?
            <>
              <Image id='detailimage' boxSize='100%' alt='EditIcon' src={editImageURL} fallback={<EditIcon boxSize='10%' />}></Image>
              <div className='saveImageInputContainer'>
                <label>Enter a new Image URL</label>
                <Input background='white' type='text' id='imageUrlInput' defaultValue={vehicle.image} onChange={(e) => setEditImageURLText(e.target.value)} />
                <Button leftIcon={<AddIcon />} colorScheme='gray' size='md' id='previewImageButton' onClick={() => { setEditImageURL(editImageURLText) }}>Preview Image</Button>
              </div>
            </>
            : <><Image id='detailimage' boxSize='100%' alt='EditIcon' src={vehicle.image} fallback={<EditIcon boxSize='10%' />}></Image></>}
        </div>
        <div id="detailsContainer">
          <div class='detailButtons'>
            <div id='returnButtonContainer'>
              {soldStatusChanged ? <span onClick={() => { setDetailedView({ active: false, vehicle: {} }); window.location.reload() }} class="material-symbols-outlined">arrow_back</span> :
                <span onClick={() => { setDetailedView({ active: false, vehicle: {} }) }} class="material-symbols-outlined">arrow_back</span>}
            </div>
            {linkRoute === '' && sessionStorage.getItem('CurrentUser') != null ?
              //Display favorite icons toggle on home page
              favorite ? <span id='favoritedIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event) => { handleFavoriteRemove(event) }}>favorite</span>
                : <span id='addFavoriteIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event) => { handleFavoriteAdd(event) }}>heart_plus</span>

              :
              //otherwise check if we are in profile
              linkRoute === 'profile' ?
                //if we are in profile, display remove icons instead
                <span id='trashIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event) => { handleFavoriteRemove(event); window.location.reload() }}>delete</span>
                :
                linkRoute === 'listings' ?
                  //if we are not in profile, check if we're in listings
                  <>
                    {soldStatus ?
                      <>
                        <button className="relistButton" onClick={() => { handleRelist() }}>Relist</button>
                        <span id='trashIconDetail' className="material-symbols-outlined favoriteIconDetail" style={{ visibility: "hidden" }} onClick={() => handleListingRemove()}><Tooltip openDelay={500} hasArrow label="Remove listing">delete</Tooltip></span>
                      </>
                      :
                      <>
                        <button className="soldButton" onClick={() => { handleSell() }}>Mark as Sold</button>
                        <span id='trashIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={() => handleListingRemove()}><Tooltip openDelay={500} hasArrow label="Remove listing">delete</Tooltip></span>
                      </>}
                  </>
                  :
                  //otherwise display nothing
                  <></>
            }
          </div>
          {<h1 id='detailheader'>{vehicle.year} {vehicle.make} {vehicle.model}</h1>}

          {editToggle ? <div className='detailItem'><span id="icon" class="material-symbols-outlined">calendar_month</span>Year:&nbsp;<input className='editInput' type='number' defaultValue={vehicle.year} onChange={(e) => setEditYear(Number(e.target.value))} /></div> : <></>}

          {editToggle ? <div className='detailItem'><span id="icon" class="material-symbols-outlined">label</span>Make:&nbsp;<input className='editInput' type='text' defaultValue={vehicle.make} onChange={(e) => setEditMake(e.target.value)} /></div> : <></>}

          {editToggle ? <div className='detailItem'><span id="icon" class="material-symbols-outlined">label_important</span>Model:&nbsp;<input className='editInput' type='text' defaultValue={vehicle.model} onChange={(e) => setEditModel(e.target.value)} /></div> : <></>}

          {editToggle ? <div className='detailItem'><span id="icon" class="material-symbols-outlined"><span class="material-icons-outlined">sell</span></span>Price:&nbsp;<input className='editInput'type='number' defaultValue={vehicle.price} onChange={(e) => setEditPrice(Number(e.target.value))} /></div> : <div className='detailItem'><span id="icon" class="material-symbols-outlined">sell</span>{' $' + vehicle.price}</div>}

          {editToggle ? <div className='detailItem'><span id="icon" class="material-symbols-outlined">speed</span>Mileage:&nbsp;<input className='editInput' type='number' defaultValue={vehicle.mileage} onChange={(e) => setEditMileage(Number(e.target.value))} /></div> : <div className='detailItem'><span id="icon" class="material-symbols-outlined">speed</span> {vehicle.mileage + ' miles'}</div>}

          {editToggle ? <div className='detailItem'><span id="icon" class="material-symbols-outlined">settings</span>Transmission:&nbsp;<input className='editInput' type='text' defaultValue={vehicle.transmission.charAt(0).toUpperCase() + vehicle.transmission.slice(1)} onChange={(e) => setEditTransmission(e.target.value)} /></div> : <div className='detailItem'><span id="icon" class="material-symbols-outlined">settings</span>{vehicle.transmission.charAt(0).toUpperCase() + vehicle.transmission.slice(1) + ' Transmission'}</div>}

          {editToggle ? <div className='detailItem'><span style={{ color: `${vehicle.color}` }} id="colorIcon" class="material-symbols-outlined">circle</span>Exterior:&nbsp;<input className='editInput' type='text' defaultValue={vehicle.color.charAt(0).toUpperCase() + vehicle.color.slice(1)} onChange={(e) => setEditColor(e.target.value)} /></div> : <div className='detailItem'><span style={{ color: `${vehicle.color}` }} id="colorIcon" class="material-symbols-outlined">circle</span>{'Exterior: ' + vehicle.color.charAt(0).toUpperCase() + vehicle.color.slice(1)}</div>}

          {editToggle ?
            <div className='detailItem'>
              <span id="icon" class="material-symbols-outlined">build_circle</span>
              <Select defaultValue={vehicle.condition} onChange={(e) => setEditCondition(e.target.value)}>
                <option value='poor'>Poor</option>
                <option value='good'>Good</option>
                <option value='excellent'>Excellent</option>
              </Select></div> :
            <div className='detailItem'><span id="icon" class="material-symbols-outlined">build_circle</span> {vehicle.condition.charAt(0).toUpperCase() + vehicle.condition.slice(1) + ' Condition'}</div>
          }

          {editToggle ? <></> : <div className='detailItem'><span id="icon" class="material-symbols-outlined">directions_car</span> {vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}</div>}
          {editToggle ?
            <div className='detailItem'>
              <span id="icon" class="material-symbols-outlined">not_listed_location</span>
              <Select defaultValue={vehicle.location} onChange={(e) => setEditLocation(e.target.value)}>
                {locations?.map((location) => <option key={location.baseId} value={location.name}>{location.name}</option>)}
              </Select></div> :
            <div className='detailItem'><span id="icon" class="material-symbols-outlined">not_listed_location</span> {vehicle.location}</div>}


          {editToggle ? <></> : <div className='detailHeader'><strong>Contact Information</strong></div>}
          {editToggle ? <></> : <div className='detailItem'><span id="icon" class="material-symbols-outlined">person</span>{listingOwner.first_name + ' ' + listingOwner.last_name}</div>}
          {editToggle ? <></> : <div className='detailItem'><span id="icon" class="material-symbols-outlined">mail</span>{listingOwner.email}</div>}
          {editToggle ? <></> : <div className='detailItem'><span id="icon" class="material-symbols-outlined">call</span>{listingOwner.phone}</div>}

          <div className='detailDescriptionItem'>
            <strong>Description:</strong>
          </div>
          {editToggle ? <textarea className='editInput' id="editDescription" type="textarea" defaultValue={vehicle.description} onChange={(e) => setEditDescription(e.target.value)}></textarea> : <textarea disabled id="description">{vehicle.description}</textarea>}
          {editToggle ?
            <div className='vehicle-changes-container'>
              <Button background='#023047' colorScheme='blue' className='vehicle-update-button' onClick={() => { handleEdit(); window.location.reload() }}>Update</Button>
              <Button background='#023047' colorScheme='blue' className='vehicle-discard-button' onClick={() => setEditToggle(!editToggle)}>Discard Changes</Button>
            </div> :
            <Button background='#023047' colorScheme='blue' className='vehicle-edit-button' onClick={() => setEditToggle(!editToggle)}>Edit</Button>}
        </div>
      </div>
    </ChakraProvider>
  )
}

export default EditCarDetail;