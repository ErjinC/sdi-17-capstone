import './MyListings.css'
import React, {useState, useEffect} from 'react'
import VehicleCard from '../vehiclecard/VehicleCard';
import BoatDetail from '../vehiclecarddetail/BoatDetail'
import CarDetail from '../vehiclecarddetail/CarDetail'
import MotoDetail from '../vehiclecarddetail/MotoDetail'
import RvDetail from '../vehiclecarddetail/RvDetail'
import TrailerDetail from '../vehiclecarddetail/Trailerdetail'

const MyListings = () => {
    const [myListings, setMyListings] = useState();
    const [detailedView, setDetailedView] = useState({active:false,vehicle:{}});
    const user = JSON.parse(sessionStorage.getItem('CurrentUser'))
    

    useEffect(() => {
        // console.log(JSON.parse(sessionStorage.getItem('CurrentUser')))
        // console.log(`http://localhost:3001/listings/${user.userId}`)
        fetch(`http://localhost:3001/listings/${user.userId}`)
        .then(res => res.json())
        .then(data => setMyListings(data))
    }, [])

    // console.log(typeof(myListings.carListings))
    // console.log(myListings.carListings)
    // myListings.carListings.map(e => console.log(e.color))

    return (
        <div id='frontPageContainer'>
            <div id='flexfrontpagetop'>
                <div>
                <input type='search' placeholder='Search...' />
                </div>
                <div>
                {user.success ? <>Home Base: {user.base}</> : <>Log in to see your base!</>}
                </div>
            </div>

            <div id='resultsfilter'>

            <div className='listContainer'>
                <>
                {detailedView.active ?
                <>
                    <div id='detailedViewContainerOverlay'>
                    <div id='detailedViewContainer'>
                        {(detailedView.vehicle?.type === 'car'||detailedView.vehicle?.type === 'coupe'||detailedView.vehicle?.type === 'truck')?<CarDetail vehicle={detailedView.vehicle}/>:<></>}
                        {(detailedView.vehicle.type === 'boat'||detailedView.vehicle?.type === 'jet ski')?<BoatDetail vehicle={detailedView.vehicle}/>:<></>}
                        {(detailedView.vehicle.type === 'Street Bike'||detailedView.vehicle?.type === 'Dirt Bike'||detailedView.vehicle?.type === 'Cruiser'||detailedView.vehicle?.type === "Sport Bike"||detailedView.vehicle?.type === "Touring Bike"||detailedView.vehicle?.type === "Adventure Bike"||detailedView.vehicle?.type === "Dual Sport")?<MotoDetail vehicle={detailedView.vehicle}/>:<></>}
                        {(detailedView.vehicle.type === 'motorized'||detailedView.vehicle.type === 'towable')?<RvDetail vehicle={detailedView.vehicle}/>:<></>}
                        {(detailedView.vehicle.type === 'flatbed'||detailedView.vehicle.type === 'enclosed')?<TrailerDetail vehicle={detailedView.vehicle}/>:<></>}
                        <div id='returnButtonContainer'> 
                        <button onClick={() => { setDetailedView({ active: false, vehicle: {} }) }}>Go Back</button>
                        </div>
                    </div>
                    </div>
                </> : <></>}
                    {myListings?.carListings.filter(car=>!(car.sold)).map(car => <VehicleCard vehicle={car} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                    {myListings?.boatListings.filter(boat=>!(boat.sold)).map(boat => <VehicleCard vehicle={boat} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                    {myListings?.rvListings.filter(rv=>!(rv.sold)).map(rv => <VehicleCard vehicle={rv} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                    {myListings?.motoListings.filter(moto=>!(moto.sold)).map(moto => <VehicleCard vehicle={moto} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                    {myListings?.trailerListings.filter(trailer=>!(trailer.sold)).map(trailer => <VehicleCard vehicle={trailer} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                    <div id='addcard'><p id='addsymbol'>+</p></div>
                </>
            </div>

            <div>
                <div>Filters</div>
                <label for="vehicle" id='vehiclefilter'>Vehicle: </label>
                <select
                name="vehicle"
                id="vehicleSelect"
                value=""
                onChange={(e) => {
                    sessionStorage.setItem('vehiclefilter', e.target.value)
                }}
                >
                <option value='' default disabled>Please select an option</option>
                <option value="car">Car</option>
                <option value="boat">Boat</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="rv">RV</option>
                <option value="trailer">Trailer</option>
                </select>

                <div>
                {/* {document.getElementById('vehicleSelect').value === 'car' ? <>Car selected</>:<></>}
                {document.getElementById('vehicleSelect').value === 'boat' ? <>Boat selected</>:<></>}
                {document.getElementById('vehicleSelect').value === 'motorcycle' ? <>Motorcycle selected</>:<></>}
                {document.getElementById('vehicleSelect').value === 'rv' ? <>RV selected</>:<></>}
                {document.getElementById('vehicleSelect').value === 'trailer' ? <>Trailer selected</>:<></>} */}
                </div>
            </div>

            </div>
        </div>
    )
}

export default MyListings