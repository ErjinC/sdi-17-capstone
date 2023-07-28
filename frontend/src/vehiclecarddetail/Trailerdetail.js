import React, {useState,useEffect} from 'react'
import './VehicleCardDetail.css'
import { ParentContext } from '../App'

const TrailerDetail = ({ vehicle, favorited, setDetailedView }) => {
  const {userFavorites, setUserFavorites} = React.useContext(ParentContext)
  const [favorite, setFavorite] = React.useState(favorited)
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
    fetch(`http://localhost:3001/sold/${vehicle.trailer_id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        type: 'trailer',
        sold: true
      })
    })
  }

  const handleRelist = () => {
    console.log('Relisting')
    setSoldStatus(false);
    fetch(`http://localhost:3001/sold/${vehicle.trailer_id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        type: 'trailer',
        sold: false
      })
    })
  }

  return (
    <>
      <div id='detailFlexContainer'>
        {/* <div class='detailHeader'>
         
        </div> */}
        <div id='detailimagecontainer'>
          <img id='detailimage' alt='placeholder' src={vehicle.image}></img>
        </div>
        <div id="detailsContainer">
          <div class='detailButtons'>
            <div id='returnButtonContainer'> 
              {linkRoute === 'listings' ? <span onClick={() => { setDetailedView({ active: false, vehicle: {} }); window.location.reload()}} class="material-symbols-outlined">arrow_back</span>:
              <span onClick={() => { setDetailedView({ active: false, vehicle: {} })}} class="material-symbols-outlined">arrow_back</span>}
            </div>
            { linkRoute === '' && sessionStorage.getItem('CurrentUser') != null  ?
              //Display favorite icons toggle on home page
              favorite ? <span id='favoritedIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event) => {handleFavoriteRemove(event)}}>favorite</span> 
              : <span id='addFavoriteIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event)=>{handleFavoriteAdd(event)}}>heart_plus</span> 
            
            :
              //otherwise check if we are in profile
              linkRoute === 'profile' ? 
              //if we are in profile, display remove icons instead
              <span id='trashIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event) => {handleFavoriteRemove(event); window.location.reload()}}>delete</span>
            :
              linkRoute === 'listings' ? 
              //if we are not in profile, check if we're in listings
              <>
              {soldStatus?<button className="relistButton" onClick={()=>{handleRelist()}}>Relist</button>
              :
              <button className="soldButton" onClick={()=>{handleSell()}}>Mark as Sold</button>}
              <span id='trashIconDetail' className="material-symbols-outlined favoriteIconDetail">delete</span>
              </>
            :
              //otherwise display nothing
              <></>
            }
          </div>
          <h1 id='detailheader'>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">sell</span>{' $'+vehicle.price}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">build_circle</span> {vehicle.condition.charAt(0).toUpperCase()+ vehicle.condition.slice(1) + ' Condition'}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">rv_hookup</span> {vehicle.type.charAt(0).toUpperCase()+ vehicle.type.slice(1)}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">straighten</span> {vehicle.length + ' ft.'}</div>
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

// trailerId: 1,
// sold: false, !!
// type: "flatbed", !!
// make: "Carry-On Trailer", !!
// model: "Wood Floor Utility", !!
// year: 2008, !!
// price: 1200, !!
// length: "14ft", !!
// image: "https://placekitten.com/500/300", !
// condition: "good", !!
// location: "Beale AFB", !!
// description: "Garage kept. No issues." !

export default TrailerDetail