import React, {useState, useEffect, useContext}  from 'react'
import './VehicleCardDetail.css'
import { ParentContext } from '../App'
import { Modal } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';

const CarDetail = ({vehicle, favorited, setDetailedView}) => {
  const {userFavorites, setUserFavorites} = useContext(ParentContext)
  const [favorite, setFavorite] = useState(favorited)
  const [soldStatus, setSoldStatus] = useState(vehicle.sold)
  let link = window.location.href
  let linkArr = link.split('/')
  let linkRoute = linkArr.pop()

  const [listingOwner, setListingOwner] = useState({})
  useEffect(() => {
    fetch(`http://localhost:3001/users/${vehicle.user_id}`)
    .then(res => res.json())
    .then((data) => {
        setListingOwner(data)
        console.log(data);
    })
  },[])

  const handleFavoriteAdd = (event) => {
    setFavorite(true)
    event.stopPropagation()
    setUserFavorites([...userFavorites,vehicle.listingId])
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
    console.log('Sold')
    setSoldStatus(true);
    fetch(`http://localhost:3001/sold/${vehicle.carId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        listingId: vehicle.listingId,
        sold: true
      })
    })
  }

  const handleRelist = () => {
    console.log('Relisting')
    setSoldStatus(false);
    fetch(`http://localhost:3001/sold/${vehicle.carId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
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
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(vehicle)
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            toast.success('Successfully deleted!', {
              position: toast.POSITION.BOTTOM_CENTER
            })
            setTimeout(() => {
              window.location='/listings'
            }, 2000);  
          } else if (!data.success) {
            toast.error('Failed to delete!', {
              position: toast.POSITION.BOTTOM_CENTER
            })
            setTimeout(() => {
              window.location='/listings'
            }, 2000);  
          }
        })
    }
  }

  return (
    <>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
      <div id='detailFlexContainer'>
        {/* <div class='detailHeader'>
        
        </div> */}
        <div id='detailimagecontainer'>
          <img id='detailimage' alt='placeholder' src={vehicle.image}></img>
        </div>
        <div id="detailsContainer">
          <div class='detailButtons'>
            <div id='returnButtonContainer'> 
              <span onClick={() => { setDetailedView({ active: false, vehicle: {} }) }} class="material-symbols-outlined">arrow_back</span>
            </div>
            { linkRoute === '' ?
              //Display favorite icons toggle on home page
              favorite ? <span id='favoritedIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event) => {handleFavoriteRemove(event)}}>favorite</span> 
              : <span id='addFavoriteIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event)=>{handleFavoriteAdd(event)}}>heart_plus</span> 
            
              :
              //otherwise check if we are in profile
              linkRoute === ('profile') ? 
              //if we are in profile, display remove icons instead
              <span id='trashIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event) => {handleFavoriteRemove(event); window.location.reload()}}>delete</span>
            :
              linkRoute === 'listings' ? 
              //if we are not in profile, check if we're in listings
              <>
              {soldStatus?<button className="relistButton" onClick={()=>{handleRelist()}}>Relist</button>
              :
              <button className="soldButton" onClick={()=>{handleSell()}}>Mark as Sold</button>}
              <span id='trashIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={() => handleListingRemove()}>delete</span>
              </>
            :
              //otherwise display nothing
              <></>
            }
          </div>
          <h1 id='detailheader'>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">sell</span>{' $'+vehicle.price}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">build_circle</span> {vehicle.condition.charAt(0).toUpperCase()+ vehicle.condition.slice(1) + ' Condition'}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">directions_car</span> {vehicle.type.charAt(0).toUpperCase()+ vehicle.type.slice(1)}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">speed</span> {vehicle.mileage + ' miles'}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">not_listed_location</span> {vehicle.location}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">settings</span>{vehicle.transmission.charAt(0).toUpperCase()+ vehicle.transmission.slice(1)+' Transmission'}</div>
          <div className='detailItem'><span style={{ color: `${vehicle.color}` }} id="colorIcon" class="material-symbols-outlined">circle</span>{'Exterior: ' + vehicle.color.charAt(0).toUpperCase()+ vehicle.color.slice(1)}</div>
          <div className='detailHeader'><strong>Contact Information</strong></div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">person</span>{listingOwner.first_name + ' ' + listingOwner.last_name}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">mail</span>{listingOwner.email}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">call</span>{listingOwner.phone}</div>

          <div className='detailDescriptionItem'>
            <strong>Description:</strong>
          </div>
          <textarea disabled id="description">{vehicle.description}</textarea>
        </div>
    </div>
    <ToastContainer autoClose={1500}/>
    </>
  )
}

// carId: 1,
// sold: false, !
// type: "car", !
// make: "Toyota", !
// model: "Camry", !
// year: 2008, !
// price: 3000, !
// mileage: 173495, !
// color: "red", !
// transmission: "automatic", !
// image: "https://placekitten.com/500/300", !
// condition: "good", !
// location: "Beale AFB", !
// description: "No AC. Runs well. Needs new tires" !

export default CarDetail;