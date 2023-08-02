import React, {useState,useEffect} from 'react'
import './VehicleCardDetail.css'
import { ParentContext } from '../App'
// import { ToastContainer, toast } from 'react-toastify';
import { ChakraProvider, useToast, Tooltip } from '@chakra-ui/react'


const RvDetail = ({vehicle, favorited, setDetailedView}) => {
  const {userFavorites, setUserFavorites} = React.useContext(ParentContext)
  const [favorite, setFavorite] = React.useState(favorited)
  const [soldStatus, setSoldStatus] = useState(vehicle.sold)
  const [reported, setReported] = useState(vehicle.reported)
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
              window.location='/listings'
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
    console.log('Sold')
    setSoldStatus(true);
    fetch(`http://localhost:3001/sold/${vehicle.rv_id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        type: 'rv',
        sold: true
      })
    })
  }

  const handleRelist = () => {
    console.log('Relisting')
    setSoldStatus(false);
    fetch(`http://localhost:3001/sold/${vehicle.rv_id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        type: 'rv',
        sold: false
      })
    })
  }

  const handleReport = () => {
    if(reported) {
      // window.alert('Listing has already been reported')
      toast({
        title: 'Listing has already been reported',
        // description: "Thank you",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
    } else {
      setReported(true);
      // window.alert('Thank you for your report, an admin will review the listing.')
      toast({
        title: 'Thank you for your report',
        description: "An admin will review shortly",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
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
            // toast.success('Listing successfully removed!', {
            //   position: toast.POSITION.BOTTOM_CENTER
            // })
            toast({
              title: 'Listing removed successfully',
              status: 'success',
              duration: 2000,
              isClosable: true,
            })
            setTimeout(() => {
              window.location='/listings'
            }, 2000);  
          } else if (!data.success) {
            // toast.error('Failed to delete!', {
            //   position: toast.POSITION.BOTTOM_CENTER
            // })
            toast({
              title: 'Failed to delete listing',
              description: "Try again later",
              status: 'error',
              duration: 2000,
              isClosable: true,
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
        {/* <div class='detailHeader'>
         
        </div> */}
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
                <span  id='report' class="material-symbols-outlined" onClick={() => {handleReport()}}><Tooltip openDelay={500} hasArrow label="Report listing">report</Tooltip></span>
                {favorite ? <span id='favoritedIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event) => {handleFavoriteRemove(event)}}>favorite</span>
                : <span id='addFavoriteIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event)=>{handleFavoriteAdd(event)}}>heart_plus</span>}
                </>
              //otherwise check if we are in profile
              :
              linkRoute === ('profile') ? 
                //if we are in profile, display remove icons instead
                <span id='trashIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={(event) => {handleFavoriteRemove(event)}}><Tooltip openDelay={500} hasArrow label="Remove Favorite">delete</Tooltip></span>
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
                <span  id='approve' class="material-symbols-outlined" onClick={()=>{handleApproveListing(); window.location.reload();}}><Tooltip openDelay={500} hasArrow label="Approve Listing">check_circle</Tooltip></span> <span id='deny' className="material-symbols-outlined" onClick={()=>{handleDenyListing(); window.location.reload();}}><Tooltip openDelay={500} hasArrow label="Remove Listing">remove_circle_outline</Tooltip></span>
                </>
              :
                //otherwise display nothing
                <></>
            }
          </div>
          <h1 id='detailheader'>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">sell</span>{' $'+vehicle.price}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">build_circle</span> {vehicle.condition.charAt(0).toUpperCase()+ vehicle.condition.slice(1) + ' Condition'}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">airport_shuttle</span> {vehicle.type.charAt(0).toUpperCase()+ vehicle.type.slice(1)}</div>
          {vehicle.type === 'towable'?<></>:<div className='detailItem'><span id="icon" class="material-symbols-outlined">speed</span> {vehicle.mileage + ' miles'}</div>}
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">straighten</span> {vehicle.length + ' ft.'}</div>
          <div className='detailItem'><span class="material-symbols-outlined">weight</span>&nbsp;{vehicle.weight + ' lbs.'}</div>
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
    {/* <ToastContainer autoClose={1500}/> */}
    </>
  )
}

//          
// rvId: 1,
// sold: false, !!
// type: "motorized", !!
// make: "Jayco", !!
// model: "Alante", !!
// mileage: 26432, !!
// sleeps: 6, !!
// weight: 18000, !!
// year: 2024, !!
// price: 172418, !!
// length: 29, !!
// condition: "excellent", !!
// image: "https://placekitten.com/500/300", !
// location: "Beale AFB", !!
// description: "Like new vehicle, newly refurbished interior and flooring. Equipped with solar panels, Wi-Fi antennas, and two A/C units. Slight scratching present on the exterior, but otherwise in great condition." !

export default RvDetail