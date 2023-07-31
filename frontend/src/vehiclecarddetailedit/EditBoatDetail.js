import React, {useState,useEffect} from 'react'
import './VehicleCardDetail.css'
import { ParentContext } from '../App'
import { ToastContainer, toast } from 'react-toastify';

const EditBoatDetail = ({ vehicle, favorited, setDetailedView }) => {
  const {userFavorites, setUserFavorites} = React.useContext(ParentContext)
  const [favorite, setFavorite] = React.useState(favorited)
  const [soldStatus, setSoldStatus] = useState(vehicle.sold)
  const [editToggle, setEditToggle] = useState(false)
  const [editYear, setEditYear] = useState(vehicle.year)
  const [editMake, setEditMake] = useState(vehicle.make)
  const [editModel, setEditModel] = useState(vehicle.model)
  const [editPrice, setEditPrice] = useState(vehicle.price)
  const [editDescription, setEditDescription] = useState(vehicle.description)
  let link = window.location.href
  let linkArr = link.split('/')
  let linkRoute = linkArr.pop()
  console.log(vehicle)

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

  const handleEdit = () => {
    // console.log('New Year: ', editYear)
    // console.log('New Make: ', editMake)
    // console.log('New Model: ', editModel)
    // console.log('New Price: ', editPrice)
    // console.log('New Description: ', editDescription)
    const patchOptions = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        boat_id: vehicle.boat_id,
        newYear: editYear,
        newMake: editMake,
        newModel: editModel,
        newPrice: editPrice,
        newDescription: editDescription,
      })
    }

    fetch(`http://localhost:3001/updateListing`, patchOptions)
      .then(data => data.json())
      .then(res => {
        if (res.success){
          // success message
          console.log('result: ', res.vehicle)
          setEditToggle(!editToggle)
          setDetailedView({active: true, vehicle: res.vehicle})
          // window.location.reload()
        } else {
          // failure message
          toast.error('Update failed, please try again later')
          setEditToggle(!editToggle)
        }
      })
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
              <span id='trashIconDetail' className="material-symbols-outlined favoriteIconDetail" onClick={() => handleListingRemove()}>delete</span>
              </>
            :
              //otherwise display nothing
              <></>
            }
          </div>
          {<h1 id='detailheader'>{vehicle.year} {vehicle.make} {vehicle.model}</h1>}
          {editToggle ? <div className='detailItem'><span id="icon" class="material-symbols-outlined">calendar_month</span>Year:  <input type='number' defaultValue={vehicle.year} onChange={(e) => setEditYear(Number(e.target.value))}/></div> : <></>}
          {editToggle ? <div className='detailItem'><span id="icon" class="material-symbols-outlined">label</span>Make:  <input type='text' defaultValue={vehicle.make}  onChange={(e) => setEditMake(e.target.value)}/></div> : <></>}
          {editToggle ? <div className='detailItem'><span id="icon" class="material-symbols-outlined">label_important</span>Model:  <input type='text' defaultValue={vehicle.model}  onChange={(e) => setEditModel(e.target.value)}/></div> : <></>}
          {editToggle ? <div className='detailItem'><span id="icon" class="material-symbols-outlined">sell</span>Price:  <input type='number' defaultValue={vehicle.price}  onChange={(e) => setEditPrice(Number(e.target.value))}/></div>  : <div className='detailItem'><span id="icon" class="material-symbols-outlined">sell</span>{' $'+vehicle.price}</div>}
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">build_circle</span> {vehicle.condition.charAt(0).toUpperCase()+ vehicle.condition.slice(1) + ' Condition'}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">directions_boat</span> {vehicle.type.charAt(0).toUpperCase()+ vehicle.type.slice(1)}</div>
          <div className='detailItem'><span id="icon" class="material-symbols-outlined">not_listed_location</span> {vehicle.location}</div>
          {editToggle ? <></> : <div className='detailHeader'><strong>Contact Information</strong></div>}
          {editToggle ? <></> : <div className='detailItem'><span id="icon" class="material-symbols-outlined">person</span>{listingOwner.first_name + ' ' + listingOwner.last_name}</div>}
          {editToggle ? <></> : <div className='detailItem'><span id="icon" class="material-symbols-outlined">mail</span>{listingOwner.email}</div>}
          {editToggle ? <></> : <div className='detailItem'><span id="icon" class="material-symbols-outlined">call</span>{listingOwner.phone}</div>}

          <div className='detailDescriptionItem'>
            <strong>Edit Description:</strong>
          </div>
          {editToggle ? <textarea type="textarea" defaultValue={vehicle.description} onChange={(e) => setEditDescription(e.target.value)}></textarea> : <textarea disabled id="description">{vehicle.description}</textarea>}
          {editToggle ? <button onClick={() => handleEdit()}>Update</button> : <button onClick={() => setEditToggle(!editToggle)}>Edit</button>}
        </div>
    </div>
    <ToastContainer autoClose={1500}/>
    </>
  )
}

export default EditBoatDetail;