import React, {useState, useEffect} from 'react'
import './VehicleCard.css'
import { ParentContext } from '../App'

const VehicleCard = ({vehicle, detailedView, setDetailedView}) => {
  const [favorited, setFavorited] = useState(false)
  let link = window.location.href
  let linkArr = link.split('/')
  let linkRoute = linkArr.pop()
  const currentUser = JSON.parse(sessionStorage.getItem('CurrentUser'))
  const {userFavorites, setUserFavorites} = React.useContext(ParentContext)
  const [vehicleIdType, setVehicleIdType] = useState();
  
  //if userFavorites.contains(vehicle.listingId) => render the gold heart, otherwise render heart add

  useEffect(() => {
    if (sessionStorage.getItem('CurrentUser') !== null) {
      if(userFavorites.includes(vehicle.listingId)){
        setFavorited(true)
      }else{
        setFavorited(false)
      }
      sessionStorage.setItem('CurrentUser', JSON.stringify({...currentUser, favorites:userFavorites.toString()}))
      fetch(`http://localhost:3001/favorites`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          favorites: userFavorites.toString(), 
          userid: currentUser.userId
        })
      })
    }
  }, [userFavorites])

  const handleFavoriteAdd = (event) => {
    setFavorited(true)
    event.stopPropagation()
    setUserFavorites([...userFavorites,vehicle.listingId])
  }

  const handleFavoriteRemove = (event) => {
    setFavorited(false)
    event.stopPropagation()
    let index = userFavorites.indexOf(vehicle.listingId);
    let tempArr = userFavorites.toSpliced(index, 1)
    if (index !== -1) {
      setUserFavorites(tempArr);
    }
  }
  
  const handleVehicleIdType = (event) => {
    setVehicleIdType(event.target.value)
    console.log(event);
    console.log(vehicleIdType);
  }

  // const handleListingRemove = (event) => {
  //   console.log(vehicle.listingId);
  //   console.log(vehicle);
  //   if (vehicle.car_id) {
  //   } else if (vehicle.motorcycle_id) {

  //   } else if (vehicle.rv_Id)
  // }

  if (sessionStorage.getItem('CurrentUser') == null) {
    return(
      <div id='individualcard' onClick={()=>{setDetailedView({active:true,vehicle:vehicle})}}>
      <img id='vehiclecardimage' alt='Vehicle' src={vehicle.image}></img>
      <div><strong>{vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model}</strong></div>
      <div>Cost: {'$'+vehicle.price}</div>
      <div>Location: {vehicle.location}</div>
    </div>
    )
  }

  return (
      <div id='individualcard' onClick={()=>{setDetailedView({active:true,vehicle:vehicle,favorited:favorited})}}>
        { linkRoute === '' ?
          //Display favorite icons toggle on home page
          favorited ? <span id='favoritedIcon' className="material-symbols-outlined favoriteIcon" onClick={(event) => {handleFavoriteRemove(event)}}>favorite</span> 
          : <span id='addFavoriteIcon' className="material-symbols-outlined favoriteIcon" onClick={(event)=>{handleFavoriteAdd(event)}}>heart_plus</span> 
        
        :
          //otherwise check if we are in profile
          linkRoute === ('profile') ? 
          //if we are in profile, display remove icons instead
          <span id='trashIcon' className="material-symbols-outlined favoriteIcon" onClick={(event) => {handleFavoriteRemove(event); window.location.reload()}}>delete</span> 
          : 
            linkRoute === ('listings') ? 
            // else if not in profile, check if we're in listings
            <span id='trashIcon' className="material-symbols-outlined favoriteIcon" onClick={(event) => { handleVehicleIdType(event) }}>delete</span> 
            :
            //anywhere else we won't display favorite icons
            <></>
        }
        <img id='vehiclecardimage' alt='Vehicle' src={vehicle.image}></img>
        <div><strong>{vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model}</strong></div>
        <div>Cost: {'$'+vehicle.price}</div>
        <div>Location: {vehicle.location}</div>
      </div>
  )
}

export default VehicleCard