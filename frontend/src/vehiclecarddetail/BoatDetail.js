import React, {useState,useEffect} from 'react'
import './VehicleCardDetail.css'
import { ParentContext } from '../App'
import { ToastContainer, toast } from 'react-toastify';

const BoatDetail = ({ vehicle, favorited,setDetailedView }) => {
  const {userFavorites, setUserFavorites} = React.useContext(ParentContext)
  const [favorite, setFavorite] = React.useState(favorited)
  const [soldStatus, setSoldStatus] = useState(vehicle.sold)
  const [reported, setReported] = useState(vehicle.reported)
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

  const handleListingRemove = () => {
    console.log('vehicle: ', vehicle)
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
    console.log('Sold',vehicle)
    setSoldStatus(true);
    fetch(`http://localhost:3001/sold/${vehicle.boat_id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        type: 'boat',
        sold: true
      })
    })
  }

  const handleRelist = () => {
    console.log('Relisting')
    setSoldStatus(false);
    fetch(`http://localhost:3001/sold/${vehicle.boat_id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        type: 'boat',
        sold: false
      })
    })
  }

  
  const handleReport = () => {
    if(reported) {
      window.alert('Listing has already been reported')
    } else {
      setReported(true);
      window.alert('Thank you for your report, an admin will review the listing.')
      fetch(`http://localhost:3001/report/${vehicle.listingId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          reported: true
        })
      })
      document.getElementById('report').style.color = '#ffb703'
    }
  }

  const handleApproveListing = () =>{
    if(window.confirm('Are you sure you would like to approve this listing?')){
      fetch(`http://localhost:3001/report/${vehicle.listingId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          reported: false
        })
      })
    }
  }

  const handleDenyListing = () =>{
    // console.log('vehicle: ', vehicle)
    if (window.confirm('Are you sure you would like to remove this listing?')) {
      fetch(`http://localhost:3001/listings`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(vehicle)
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            toast.success('Listing successfully removed!', {
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
      <div id='detailFlexContainer'>
        <div id='detailimagecontainer'>
          <img id='detailimage' alt='placeholder' src={vehicle.image}></img>
        </div>
        <div id="detailsContainer">
          <div class='detailButtons'>
            <div id='returnButtonContainer'> 
              <span onClick={() => { setDetailedView({ active: false, vehicle: {} }); window.location.reload()}} class="material-symbols-outlined">arrow_back</span>
            </div>
            { linkRoute === '' && sessionStorage.getItem('CurrentUser') != null ?
                //Display favorite icons toggle on home page
                <>
                <span  id='report' class="material-symbols-outlined" onClick={() => {handleReport()}}>report</span>
                {favorite ? <span id='favoritedIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event) => {handleFavoriteRemove(event)}}>favorite</span>
                : <span id='addFavoriteIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event)=>{handleFavoriteAdd(event)}}>heart_plus</span>}
                </>
              //otherwise check if we are in profile
              :
              linkRoute === ('profile') ? 
                //if we are in profile, display remove icons instead
                <span id='trashIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event) => {handleFavoriteRemove(event)}}>delete</span>
              :
                linkRoute === 'listings' ? 
                //if we are not in profile, check if we're in listings
                <>
                {soldStatus?<button className="relistButton" onClick={()=>{handleRelist()}}>Relist</button>
                :
                <button className="soldButton" onClick={()=>{handleSell()}}>Mark as Sold</button>}
                <span id='trashIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={()=>{handleListingRemove()}}>delete</span>
                </>
              :
                linkRoute === 'admin' ? 
                //if we are not in listings, check if we're in admin
                <>
                <span  id='approve' class="material-symbols-outlined" onClick={()=>{handleApproveListing(); window.location.reload();}}>check_circle</span> <span id='deny' className="material-symbols-outlined" onClick={()=>{handleDenyListing(); window.location.reload();}}>remove_circle_outline</span>
                </>
              :
                //otherwise display nothing
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
    <ToastContainer autoClose={1500}/>
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