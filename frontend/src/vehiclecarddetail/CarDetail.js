import React from 'react'
import './VehicleCardDetail.css'
import { ParentContext } from '../App'

const CarDetail = ({vehicle, favorited}) => {
  const {userFavorites, setUserFavorites} = React.useContext(ParentContext)
  const [favorite, setFavorite] = React.useState(favorited)
  let link = window.location.href
  let linkArr = link.split('/')
  let linkRoute = linkArr.pop()

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

  return (
    <>
    <div id='flexcontainerdetail'>
      <div id='descriptionTextContainer'>
        { linkRoute === '' ?
          //Display favorite icons toggle on home page
          favorite ? <span id='favoritedIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event) => {handleFavoriteRemove(event)}}>favorite</span> 
          : <span id='addFavoriteIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event)=>{handleFavoriteAdd(event)}}>heart_plus</span> 
        
        :
          //otherwise check if we are in profile
          linkRoute === 'profile' ? 
          //if we are in profile, display remove icons instead
          <span id='trashIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event) => {handleFavoriteRemove(event); window.location.reload()}}>delete</span> 
          :
          //anywhere else we won't display favorite icons
          <></>
        }
        <h1 id='detailheader'>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
        <div>Condition: {vehicle.condition.charAt(0).toUpperCase()+ vehicle.condition.slice(1)}</div>
        <div>Type: {vehicle.type}</div>
        <div>Price: ${vehicle.price}</div>
        <div>Mileage: {vehicle.mileage}</div>
        <div>Transmission: {vehicle.transmission.charAt(0).toUpperCase()+ vehicle.transmission.slice(1)}</div>
        <div>Color: {vehicle.color.charAt(0).toUpperCase()+ vehicle.color.slice(1)}</div>
        <div>Location: {vehicle.location}</div>
        <div>Description: {vehicle.description}</div>
      </div>
    </div>
    <div id='detailimagecontainer'>
      <img id='detailimage' alt='placeholder' src={vehicle.image}></img>
    </div>
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

export default CarDetail