import React, { useState, useEffect } from 'react'
import './FavoritesDisplay.css'
import VehicleCard from '../vehiclecard/VehicleCard.js'
import BoatDetail from '../vehiclecarddetail/BoatDetail'
import CarDetail from '../vehiclecarddetail/CarDetail'
import MotoDetail from '../vehiclecarddetail/MotoDetail'
import RvDetail from '../vehiclecarddetail/RvDetail'
import TrailerDetail from '../vehiclecarddetail/Trailerdetail'
import { ParentContext } from '../App'

const FavoritesDisplay = () => {
    const [listings, setListings] = useState()
    const [favoritesDisplayList, setFavoritesDisplayList] = useState()
    const [detailedView, setDetailedView] = useState({ active: false, vehicle: {} });
    const favoritesList = [];
    const {userFavorites, setUserFavorites} = React.useContext(ParentContext);
    // const [userFavorites, setUserFavorites] = useState(JSON.parse(sessionStorage.getItem('CurrentUser')).favorites.split(',').map(item => parseInt(item)));

    useEffect(() => {
        fetch('http://localhost:3001/listings')
            .then(res => res.json())
            .then((data) => {
                findFavorites(data)
                setListings(data)
                // console.log(userFavorites);
            })
    }, [])

    const findFavorites = (fetchData) => {
        let tempArr = [];
        //cars
        tempArr = (fetchData?.carListings.filter(
            (car) => {
                for (let i = 0; i < userFavorites.length; i++) {
                    if (car.listingId === userFavorites[i]) {
                        return true;
                    }
                }
                return false;
            }));
        if (tempArr[0]) {
            tempArr.map(item => favoritesList.push(item))
        }

        //boats
        tempArr = (fetchData?.boatListings.filter(
            (boat) => {
                for (let i = 0; i < userFavorites.length; i++) {
                    if (boat.listingId === userFavorites[i]) {
                        return true;
                    }
                }
                return false;
            }));
        if (tempArr.length > 0) {
            tempArr.map(item => favoritesList.push(item))
        }

        //rvs
        tempArr = (fetchData?.rvListings.filter(
            (rv) => {
                for (let i = 0; i < userFavorites.length; i++) {
                    if (rv.listingId === userFavorites[i]) {
                        return true;
                    }
                }
                return false;
            }));
        if (tempArr.length > 0) {
            tempArr.map(item => favoritesList.push(item))
        }

        //moto
        tempArr = (fetchData?.motoListings.filter(
            (moto) => {
                for (let i = 0; i < userFavorites.length; i++) {
                    if (moto.listingId === userFavorites[i]) {
                        return true;
                    }
                }
                return false;
            }));
        if (tempArr.length > 0) {
            tempArr.map(item => favoritesList.push(item))
        }

        //trailer
        tempArr = (fetchData?.trailerListings.filter(
            (trailer) => {
                for (let i = 0; i < userFavorites.length; i++) {
                    if (trailer.listingId === userFavorites[i]) {
                        return true;
                    }
                }
                return false;
            }));
        if (tempArr.length > 0) {
            tempArr.map(item => favoritesList.push(item))
        }
        // console.log('Favorites', favoritesList)
        setFavoritesDisplayList(favoritesList)
    }

    return (
        <>
            {favoritesDisplayList?.filter(vehicle=>!(vehicle.sold)).map((vehicle) => {
                return (
                    <>
                        {detailedView.active ?
                            <>
                                <div id='detailedViewContainerOverlay'>
                                    <div id='detailedViewContainer'>
                                        {(detailedView.vehicle.type === 'car' || detailedView.vehicle?.type === 'coupe' || detailedView.vehicle?.type === 'truck') ? <CarDetail setDetailedView={setDetailedView} vehicle={detailedView.vehicle} /> : <></>}
                                        {(detailedView.vehicle.type === 'boat' || detailedView.vehicle?.type === 'jet ski') ? <BoatDetail setDetailedView={setDetailedView} vehicle={detailedView.vehicle} /> : <></>}
                                        {(detailedView.vehicle.type === 'Street Bike' || detailedView.vehicle?.type === 'Dirt Bike' || detailedView.vehicle?.type === 'Cruiser' || detailedView.vehicle?.type === "Sport Bike" || detailedView.vehicle?.type === "Touring Bike" || detailedView.vehicle?.type === "Adventure Bike" || detailedView.vehicle?.type === "Dual Sport") ? <MotoDetail setDetailedView={setDetailedView} vehicle={detailedView.vehicle} /> : <></>}
                                        {(detailedView.vehicle.type === 'motorized' || detailedView.vehicle.type === 'towable') ? <RvDetail setDetailedView={setDetailedView} vehicle={detailedView.vehicle} /> : <></>}
                                        {(detailedView.vehicle.type === 'flatbed' || detailedView.vehicle.type === 'enclosed') ? <TrailerDetail setDetailedView={setDetailedView} vehicle={detailedView.vehicle} /> : <></>}
                                    </div>
                                </div>
                            </> : <></>}
                        <VehicleCard vehicle={vehicle} detailedView={detailedView} setDetailedView={setDetailedView} />
                    </>
                )
            })}
            {favoritesDisplayList?.filter(vehicle=>!(vehicle.sold)).length===0?<div id='noFavoritesText'>You have no favorites yet</div>:<></>}
        </>
    )
}

export default FavoritesDisplay