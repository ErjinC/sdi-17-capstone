import React from 'react'
import './VehicleCardDetail.css'
import { ParentContext } from '../App'

const CarDetail = ({vehicle, favorited, setDetailedView}) => {
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
      <div id='detailFlexContainer'>
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
        <div id='detailimagecontainer'>
          <img id='detailimage' alt='placeholder' src={vehicle.image}></img>
        </div>
        <div id="detailsContainer">
          <h1 id='detailheader'>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
          <div className='detailItem'><strong>Condition:</strong> {vehicle.condition.charAt(0).toUpperCase()+ vehicle.condition.slice(1)}</div>
          <div className='detailItem'><strong>Type:</strong> {vehicle.type}</div>
          <div className='detailItem'><strong>Price:</strong> ${vehicle.price}</div>
          <div className='detailItem'><span id="mileage" class="material-symbols-outlined">speed</span><p>{vehicle.mileage}</p></div>
          <div className='detailItem'><strong>Transmission:</strong>{vehicle.transmission.charAt(0).toUpperCase()+ vehicle.transmission.slice(1)}</div>
          <div className='detailItem'><strong>Color:</strong> {vehicle.color.charAt(0).toUpperCase()+ vehicle.color.slice(1)}</div>
          <div className='detailItem'><strong>Location:</strong> {vehicle.location}</div>
          <div className='detailDescriptionItem'><p><strong>Description:</strong></p> {vehicle.description}</div>
          <div id='returnButtonContainer'> 
            <button onClick={() => { setDetailedView({ active: false, vehicle: {} }) }}>Go Back</button>
          </div>
        </div>
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