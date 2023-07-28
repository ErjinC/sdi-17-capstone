import React, {useState,useEffect} from 'react'
import './VehicleCardDetail.css'
import { ParentContext } from '../App'

const BoatDetail = ({ vehicle, favorited,setDetailedView }) => {
  const {userFavorites, setUserFavorites} = React.useContext(ParentContext)
  const [favorite, setFavorite] = React.useState(favorited)
  let link = window.location.href
  let linkArr = link.split('/')
  let linkRoute = linkArr.pop()

  const [listingOwner, setListingOwner] = useState({})
  useEffect(() => {
    fetch(`http://localhost:3001/users/${vehicle.user_id}`)
    .then(res => res.json())
    .then((data) => {
        setListingOwner(data)
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
  return (
    <>
      <div id='detailFlexContainer'>
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
              linkRoute === 'profile' ? 
              //if we are in profile, display remove icons instead
              <span id='trashIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event) => {handleFavoriteRemove(event); window.location.reload()}}>delete</span> 
              :
              //anywhere else we won't display favorite icons
              <></>
            }
          </div>
          <h1 id='detailheader'>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">sell</span>{' $'+vehicle.price}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">build_circle</span> {vehicle.condition.charAt(0).toUpperCase()+ vehicle.condition.slice(1) + ' Condition'}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">directions_boat</span> {vehicle.type.charAt(0).toUpperCase()+ vehicle.type.slice(1)}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">not_listed_location</span> {vehicle.location}</div>
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
    
    </>
  )
}

// boatId: 1,
// sold: false, !!
// type: "boat", !!
// make: "Sea Ray", !!
// model: "Sundancer 260", !!
// year: 2010, !!
// price: 40000, !!
// hours: 300, !!
// image: "https://placekitten.com/500/300",
// condition: "good", !!
// location: "Beale AFB", !!
// description: "Bent propeller. Runs well. Needs new canopy." !

export default BoatDetail