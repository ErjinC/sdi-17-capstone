import './MyListings.css'
import React, {useState, useEffect} from 'react'
import VehicleCard from '../vehiclecard/VehicleCard';
import BoatDetail from '../vehiclecarddetail/BoatDetail'
import CarDetail from '../vehiclecarddetail/CarDetail'
import MotoDetail from '../vehiclecarddetail/MotoDetail'
import RvDetail from '../vehiclecarddetail/RvDetail'
import TrailerDetail from '../vehiclecarddetail/Trailerdetail'
import { useNavigate } from 'react-router-dom';

const MyListings = () => {
    const [myListings, setMyListings] = useState();
    const [detailedView, setDetailedView] = useState({active:false,vehicle:{}});
    const [userFavorites, setUserFavorites ] = useState([]);
    const [soldView, setSoldView] = useState(false)
    const user = JSON.parse(sessionStorage.getItem('CurrentUser'))
    const navigate = useNavigate();
    

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

    const findSoldListings = () =>{
        let foundListing = false;
        Object.values(myListings).map((vehicleList)=> {
            vehicleList.map(item => 
                {
                    if(item.sold){
                        foundListing=true
                    }
                    return true;
                })
        });
        return foundListing;
    }

    return (
        <div id='frontPageContainer'>
            <div id='flexfrontpagetop'>
                <input class="tgl tgl-skewed" id="cb3" type="checkbox" checked={!soldView} onClick={() => setSoldView(!soldView)}/>
                <label class="tgl-btn" data-tg-off="Sold Listings" data-tg-on="Open Listings" for="cb3"></label>
            </div>

            <div id='resultsfilter'>

            <div className='listContainer'>
                <>
                    {
                        detailedView.active ?
                        <>
                            <div id='detailedViewContainerOverlay'>
                                <div id='detailedViewContainer'>
                                    {(detailedView.vehicle?.type === 'car'||detailedView.vehicle?.type === 'coupe'||detailedView.vehicle?.type === 'truck')?<CarDetail setDetailedView={setDetailedView} vehicle={detailedView.vehicle}/>:<></>}
                                    {(detailedView.vehicle.type === 'boat'||detailedView.vehicle?.type === 'jet ski')?<BoatDetail setDetailedView={setDetailedView} vehicle={detailedView.vehicle}/>:<></>}
                                    {(detailedView.vehicle.type === 'Street Bike'||detailedView.vehicle?.type === 'Dirt Bike'||detailedView.vehicle?.type === 'Cruiser'||detailedView.vehicle?.type === "Sport Bike"||detailedView.vehicle?.type === "Touring Bike"||detailedView.vehicle?.type === "Adventure Bike"||detailedView.vehicle?.type === "Dual Sport")?<MotoDetail setDetailedView={setDetailedView} vehicle={detailedView.vehicle}/>:<></>}
                                    {(detailedView.vehicle.type === 'motorized'||detailedView.vehicle.type === 'towable')?<RvDetail setDetailedView={setDetailedView} vehicle={detailedView.vehicle}/>:<></>}
                                    {(detailedView.vehicle.type === 'flatbed'||detailedView.vehicle.type === 'enclosed')?<TrailerDetail setDetailedView={setDetailedView} vehicle={detailedView.vehicle}/>:<></>}
                                </div>
                            </div>
                        </> : <></>
                    }
                    
                    {soldView ?
                        <>
                            {!findSoldListings() ?'No listings sold!'
                            :
                            <>
                            {myListings?.carListings.filter(e=>e.sold).map(car => <VehicleCard userFavorites={userFavorites} setUserFavorites={setUserFavorites} vehicle={car} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                            {myListings?.boatListings.filter(e=>e.sold).map(boat => <VehicleCard userFavorites={userFavorites} setUserFavorites={setUserFavorites} vehicle={boat} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                            {myListings?.rvListings.filter(e=>e.sold).map(rv => <VehicleCard userFavorites={userFavorites} setUserFavorites={setUserFavorites} vehicle={rv} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                            {myListings?.motoListings.filter(e=>e.sold).map(moto => <VehicleCard userFavorites={userFavorites} setUserFavorites={setUserFavorites} vehicle={moto} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                            {myListings?.trailerListings.filter(e=>e.sold).map(trailer => <VehicleCard userFavorites={userFavorites} setUserFavorites={setUserFavorites} vehicle={trailer} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                            </>
                            }
                        </>
                        :
                        <>
                            {myListings?.carListings.filter(e=>!e.sold).map(car => <VehicleCard userFavorites={userFavorites} setUserFavorites={setUserFavorites} vehicle={car} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                            {myListings?.boatListings.filter(e=>!e.sold).map(boat => <VehicleCard userFavorites={userFavorites} setUserFavorites={setUserFavorites} vehicle={boat} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                            {myListings?.rvListings.filter(e=>!e.sold).map(rv => <VehicleCard userFavorites={userFavorites} setUserFavorites={setUserFavorites} vehicle={rv} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                            {myListings?.motoListings.filter(e=>!e.sold).map(moto => <VehicleCard userFavorites={userFavorites} setUserFavorites={setUserFavorites} vehicle={moto} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                            {myListings?.trailerListings.filter(e=>!e.sold).map(trailer => <VehicleCard userFavorites={userFavorites} setUserFavorites={setUserFavorites} vehicle={trailer} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                            <div id='addcard' onClick={() => navigate('/createListing')}><p id='addsymbol'>+</p></div>
                        </>
                    }
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