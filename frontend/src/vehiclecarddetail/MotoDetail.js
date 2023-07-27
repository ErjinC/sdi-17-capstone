import React from 'react'
import './VehicleCardDetail.css'
import { ParentContext } from '../App'

const MotoDetail = ({vehicle, favorited, setDetailedView}) => {
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
          <h3>Sold/For Sale/Rental</h3>
          <div>Type: {vehicle.type}</div>
          <div>Condition: {vehicle.condition.charAt(0).toUpperCase()+ vehicle.condition.slice(1)}</div>
          <div>Price: ${vehicle.price}</div>
          <div>Mileage: {vehicle.mileage}</div>
          <div>Color: {vehicle.color.charAt(0).toUpperCase()+ vehicle.color.slice(1)}</div>
          <div>Location: {vehicle.location}</div>
          <div>Description: {vehicle.description}</div>
        </div>
      </div>
      <div>
          <img id='detailimage' alt='placeholder' src='http://placekitten.com/400/300'></img>
      </div>
      <div id='returnButtonContainer'> 
        <button onClick={() => { setDetailedView({ active: false, vehicle: {} }) }}>Go Back</button>
      </div>
    </>
  )
}

// motorcycleId: 1,
// sold: false, !!
// image: "https://placekitten.com/500/300", !
// type: "Street Bike", !!
// make: "Honda", !!
// model: "CBR1000", !!
// year: 2008, !!
// price: 7600, !!
// mileage: 3597, !!
// color: "green", !!
// condition: "good", !!
// location: "Beale AFB", !!
// description: "Garage kept. No issues." !

export default MotoDetail