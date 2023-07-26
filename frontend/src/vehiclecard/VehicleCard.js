import React, {useState} from 'react'
import './VehicleCard.css'

const VehicleCard = ({vehicle, detailedView, setDetailedView}) => {
  const [favorited, setFavorited] = useState(false)
  let link = window.location.href
  let linkArr = link.split('/')
  let linkRoute = linkArr.pop()
  console.log(linkRoute)
  

  return (
      <div id='individualcard' onClick={()=>{setDetailedView({active:true,vehicle:vehicle})}}>
        { linkRoute === '' ?
          //Display favorite icons toggle on home page
          favorited ? <span id='favoritedIcon' className="material-symbols-outlined favoriteIcon" onClick={(event) => {
            setFavorited(!favorited)
            event.stopPropagation()}}>favorite</span> 
          : <span id='addFavoriteIcon' className="material-symbols-outlined favoriteIcon" onClick={(event) => {
            setFavorited(!favorited)
            event.stopPropagation()}}>heart_plus</span> 
        
        :
          //otherwise check if we are in profile
          linkRoute === 'profile' ? 
          //if we are in profile, display remove icons instead
          <span id='trashIcon' className="material-symbols-outlined favoriteIcon" onClick={(event) => {
            setFavorited(false)
            event.stopPropagation()}}>delete</span> 
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