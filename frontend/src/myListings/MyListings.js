import './MyListings.css'
import React, { useState, useEffect, useContext } from 'react'
import VehicleCard from '../vehiclecard/VehicleCard';
import BoatDetail from '../vehiclecarddetail/BoatDetail'
import CarDetail from '../vehiclecarddetail/CarDetail'
import MotoDetail from '../vehiclecarddetail/MotoDetail'
import RvDetail from '../vehiclecarddetail/RvDetail'
import TrailerDetail from '../vehiclecarddetail/Trailerdetail'
import EditCarDetail from '../vehiclecarddetailedit/EditCarDetail'
import EditBoatDetail from '../vehiclecarddetailedit/EditBoatDetail'
import EditMotoDetail from '../vehiclecarddetailedit/EditMotoDetail'
import EditRvDetail from '../vehiclecarddetailedit/EditRvDetail'
import EditTrailerDetail from '../vehiclecarddetailedit/EditTrailerdetail'
import { useNavigate } from 'react-router-dom';
import { ParentContext } from '../App';

const MyListings = () => {
    const [myListings, setMyListings] = useState();
    const [detailedView, setDetailedView] = useState({active:false,vehicle:{}});
    const [userFavorites, setUserFavorites ] = useState([]);
    const [soldView, setSoldView] = useState(false)
    const user = JSON.parse(sessionStorage.getItem('CurrentUser'))
    const navigate = useNavigate();
    const { locations } = useContext(ParentContext)


    useEffect(() => {
        if (sessionStorage.getItem('CurrentUser') === null) {
            window.location='/'
        }
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
        <div id='frontPageContainer' class='frontPageContainerListings'>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <div className='listingsPageWrapper'>
            <div className='toggleListingsButtonContainer'>
                <input class="tgl tgl-skewed" id="cb3" type="checkbox" checked={!soldView} onClick={() => setSoldView(!soldView)}/>
                <label class="tgl-btn" data-tg-off="Sold Listings" data-tg-on="Open Listings" for="cb3"></label>
            </div>
            <div className='listContainer' id='listingsPageListContainer'>
                
                <>
                    {
                        detailedView.active ?
                        <>
                            <div id='detailedViewContainerOverlay'>
                                <div id='detailedViewContainer'>
                                    {(detailedView.vehicle?.type === 'car'||detailedView.vehicle?.type === 'coupe'||detailedView.vehicle?.type === 'truck')? <EditCarDetail locations={locations} setDetailedView={setDetailedView} vehicle={detailedView.vehicle}/>:<></>}
                                    {(detailedView.vehicle.type === 'boat'||detailedView.vehicle?.type === 'jet ski')?<EditBoatDetail locations={locations} setDetailedView={setDetailedView} vehicle={detailedView.vehicle}/>:<></>}
                                    {(detailedView.vehicle.type === 'Street Bike'||detailedView.vehicle?.type === 'Dirt Bike'||detailedView.vehicle?.type === 'Cruiser'||detailedView.vehicle?.type === "Sport Bike"||detailedView.vehicle?.type === "Touring Bike"||detailedView.vehicle?.type === "Adventure Bike"||detailedView.vehicle?.type === "Dual Sport")?<EditMotoDetail locations={locations} setDetailedView={setDetailedView} vehicle={detailedView.vehicle}/>:<></>}
                                    {(detailedView.vehicle.type === 'motorized'||detailedView.vehicle.type === 'towable')?<EditRvDetail locations={locations} setDetailedView={setDetailedView} vehicle={detailedView.vehicle}/>:<></>}
                                    {(detailedView.vehicle.type === 'flatbed'||detailedView.vehicle.type === 'enclosed')?<EditTrailerDetail locations={locations} setDetailedView={setDetailedView} vehicle={detailedView.vehicle}/>:<></>}
                                </div>
                            </div>
                        </> : <></>
                    }

                    {soldView ?
                        <>
                            {!findSoldListings() ? <div id='noListingsSoldText'>No listings sold!</div>
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
                            <div id='addcard' onClick={() => navigate('/createListing')}><p id='addsymbol'>+</p></div>
                            {myListings?.carListings.filter(e=>!e.sold).map(car => <VehicleCard userFavorites={userFavorites} setUserFavorites={setUserFavorites} vehicle={car} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                            {myListings?.boatListings.filter(e=>!e.sold).map(boat => <VehicleCard userFavorites={userFavorites} setUserFavorites={setUserFavorites} vehicle={boat} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                            {myListings?.rvListings.filter(e=>!e.sold).map(rv => <VehicleCard userFavorites={userFavorites} setUserFavorites={setUserFavorites} vehicle={rv} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                            {myListings?.motoListings.filter(e=>!e.sold).map(moto => <VehicleCard userFavorites={userFavorites} setUserFavorites={setUserFavorites} vehicle={moto} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                            {myListings?.trailerListings.filter(e=>!e.sold).map(trailer => <VehicleCard userFavorites={userFavorites} setUserFavorites={setUserFavorites} vehicle={trailer} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
                        </>
                    }
                </>
                </div>
            </div>
        </div>
    )
}

export default MyListings;