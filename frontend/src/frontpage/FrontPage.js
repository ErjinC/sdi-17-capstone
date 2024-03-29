import React, {useState, useEffect} from 'react'
import './FrontPage.css'
import VehicleCard from '../vehiclecard/VehicleCard.js'
import BoatDetail from '../vehiclecarddetail/BoatDetail'
import CarDetail from '../vehiclecarddetail/CarDetail'
import MotoDetail from '../vehiclecarddetail/MotoDetail'
import RvDetail from '../vehiclecarddetail/RvDetail'
import TrailerDetail from '../vehiclecarddetail/Trailerdetail'
import Filters from '../filters/Filters'
import { ParentContext } from '../App'
// import { '' } from '@chakra-ui/react'

const FrontPage = () => {

  const {currentUser,setCurrentUser, userFavorites, setUserFavorites} = React.useContext(ParentContext)
  const [originalListings, setOriginalListings] = useState()
  const [detailedView, setDetailedView] = useState({active:false, vehicle:{}, favorited:false});
  const [filterText, setFilterText] = useState(sessionStorage.getItem('vehiclefilter'))
  const [listings, setListings] = useState();

  // function vehicleFilterStorage(name, value) {
  //   if (sessionStorage.getItem(name)) {
  //     console.log('This filter is already saved')
  //   } else {
  //     sessionStorage.setItem(name, value)
  //   }
  // }

  function vehicleFilterRetrieve(name) {
    if (!sessionStorage.getItem(name)) {
      return 'all'
    } else {
      return sessionStorage.getItem(name)
    }
  }
  
  useEffect(() => {
    if (!sessionStorage.getItem('vehiclefilter')) {
      sessionStorage.setItem('vehiclefilter', 'all')
      setFilterText('all')
    }
    fetch('http://localhost:3001/listings')
    .then(res => res.json())
    .then(data => {setListings(data); setOriginalListings(data)})

    if (sessionStorage.getItem('CurrentUser') !== null) {
      setUserFavorites(JSON.parse(sessionStorage.getItem('CurrentUser')).favorites.split(',').map(item => parseInt(item)))
    }
  }, [])

  return (
    <>
      <div id='frontPageContainer'>

      <div id='resultsfilter'>

      <div className='listContainer'>
          <>
          {detailedView.active ?
          <>
            <div id='detailedViewContainerOverlay'>
              <div id='detailedViewContainer'>
                {(detailedView.vehicle?.type === 'car'||detailedView.vehicle?.type === 'coupe'||detailedView.vehicle?.type === 'truck')?<CarDetail setDetailedView={setDetailedView} vehicle={detailedView.vehicle} favorited={detailedView.favorited}/>:<></>}
                {(detailedView.vehicle.type === 'boat'||detailedView.vehicle?.type === 'jet ski')?<BoatDetail setDetailedView={setDetailedView} vehicle={detailedView.vehicle} favorited={detailedView.favorited}/>:<></>}
                {(detailedView.vehicle.type === 'Street Bike'||detailedView.vehicle?.type === 'Dirt Bike'||detailedView.vehicle?.type === 'Cruiser'||detailedView.vehicle?.type === "Sport Bike"||detailedView.vehicle?.type === "Touring Bike"||detailedView.vehicle?.type === "Adventure Bike"||detailedView.vehicle?.type === "Dual Sport")?<MotoDetail setDetailedView={setDetailedView} vehicle={detailedView.vehicle} favorited={detailedView.favorited} />:<></>}
                {(detailedView.vehicle.type === 'motorized'||detailedView.vehicle.type === 'towable')?<RvDetail setDetailedView={setDetailedView} vehicle={detailedView.vehicle} favorited={detailedView.favorited}/>:<></>}
                {(detailedView.vehicle.type === 'flatbed'||detailedView.vehicle.type === 'enclosed')?<TrailerDetail setDetailedView={setDetailedView} vehicle={detailedView.vehicle} favorited={detailedView.favorited} />:<></>}
              </div>
            </div>
          </> : <></>}

            {listings && (vehicleFilterRetrieve('vehiclefilter') === 'car' || vehicleFilterRetrieve('vehiclefilter') === 'all') ? 
              listings.carListings.length > 0 ? 
                listings.carListings.filter(car=>!(car.sold)).map(car => <VehicleCard vehicle={car} detailedView={detailedView} setDetailedView={setDetailedView} />) 
                :
                <div className='noResults'><span>No results found</span></div>
              : 
              <></>}

            {listings && (vehicleFilterRetrieve('vehiclefilter') === 'boat' || vehicleFilterRetrieve('vehiclefilter') === 'all') ? 
              listings.boatListings.length > 0 ? 
                listings.boatListings.filter(boat=>!(boat.sold)).map(boat => <VehicleCard vehicle={boat} detailedView={detailedView} setDetailedView={setDetailedView} />) 
                :
                <div className='noResults'><span>No results found</span></div>
              : 
              <></>}

            {listings && (vehicleFilterRetrieve('vehiclefilter') === 'rv' || vehicleFilterRetrieve('vehiclefilter') === 'all') ? 
              listings.rvListings.length > 0 ? 
                listings.rvListings.filter(rv=>!(rv.sold)).map(rv => <VehicleCard vehicle={rv} detailedView={detailedView} setDetailedView={setDetailedView} />) 
                :
                <div className='noResults'><span>No results found</span></div>
              : 
              <></>}

            {listings && (vehicleFilterRetrieve('vehiclefilter') === 'motorcycle' || vehicleFilterRetrieve('vehiclefilter') === 'all') ? 
              listings.motoListings.length > 0 ? 
                listings.motoListings.filter(moto=>!(moto.sold)).map(moto => <VehicleCard vehicle={moto} detailedView={detailedView} setDetailedView={setDetailedView} />) 
                :
                <div className='noResults'><span>No results found</span></div>
              : 
              <></>}

            {listings && (vehicleFilterRetrieve('vehiclefilter') === 'trailer' || vehicleFilterRetrieve('vehiclefilter') === 'all') ? 
              listings.trailerListings.length > 0 ? 
                listings.trailerListings.filter(trailer=>!(trailer.sold)).map(trailer => <VehicleCard vehicle={trailer} detailedView={detailedView} setDetailedView={setDetailedView} />) 
                :
                <div className='noResults'><span>No results found</span></div>
              : 
              <></>}
          </>
      </div>

      <div id="filterbar">
        <div>
          <fieldset>
            <legend for="vehicle" id='vehiclefilter'>Choose a Vehicle</legend>
            <select
              name="vehicle"
              data-testid="vehicleSelect"
              id="vehicleSelect"
              defaultValue={vehicleFilterRetrieve('vehiclefilter')}
              onChange={(e) => {
                sessionStorage.setItem('vehiclefilter', e.target.value)
                setListings(originalListings)
                switch(e.target.value) {
                  case 'all':
                    setFilterText('all')
                    sessionStorage.setItem('vehiclefilter', e.target.value)
                    break;
                  case 'car':
                    setFilterText('car')
                    sessionStorage.setItem('vehiclefilter', e.target.value)
                    break;
                  case 'boat':
                    setFilterText('boat')
                    sessionStorage.setItem('vehiclefilter', e.target.value)
                    break;
                  case 'motorcycle':
                    setFilterText('motorcycle')
                    sessionStorage.setItem('vehiclefilter', e.target.value)
                    break;
                  case 'rv':
                    setFilterText('rv')
                    sessionStorage.setItem('vehiclefilter', e.target.value)
                    break;
                  case 'trailer':
                    setFilterText('trailer')
                    sessionStorage.setItem('vehiclefilter', e.target.value)
                    break;
                  default:
                    setFilterText('')
                }
              }}
              > 
              <option value='' disabled>Please select an option</option>
              <option value="all" default>All</option>
              <option value="car">Cars</option>
              <option value="boat">Boats</option>
              <option value="motorcycle">Motorcycles</option>
              <option value="rv">RVs</option>
              <option value="trailer">Trailers</option>
            </select>
          </fieldset>
        </div>
        <div>

          {listings && originalListings && filterText !== 'all'? <Filters originalListings={originalListings} filterText={filterText} listings={listings} setListings={setListings} detailedView={detailedView} setDetailedView={setDetailedView} /> : <div id='filterdefault'>Select a vehicle type to start filtering!</div> }
          {/* <Filters originalListings={originalListings} filterText={filterText} listings={listings} setListings={setListings} detailedView={detailedView} setDetailedView={setDetailedView} /> */}

        </div>
      </div>

        </div>
      </div>
      </>
  )
}

export default FrontPage