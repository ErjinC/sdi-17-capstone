import React, { useState, useEffect } from 'react'
import './FavoritesDisplay.css'
import VehicleCard from '../vehiclecard/VehicleCard.js'
import BoatDetail from '../vehiclecarddetail/BoatDetail'
import CarDetail from '../vehiclecarddetail/CarDetail'
import MotoDetail from '../vehiclecarddetail/MotoDetail'
import RvDetail from '../vehiclecarddetail/RvDetail'
import TrailerDetail from '../vehiclecarddetail/Trailerdetail'

const FavoritesDisplay = () => {
    const [listings, setListings] = useState()
    const [favoritesDisplayList, setFavoritesDisplayList] = useState()
    const [detailedView, setDetailedView] = useState({ active: false, vehicle: {} });
    const userFavorites = JSON.parse(sessionStorage.getItem('CurrentUser')).favorites.split(',').map(item => parseInt(item));
    const favoritesList = [];

    useEffect(() => {
        fetch('http://localhost:3001/listings')
            .then(res => res.json())
            .then((data) => {
                findFavorites(data)
                setListings(data)
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
        console.log('Favorites', favoritesList)
        setFavoritesDisplayList(favoritesList)
    }

    return (
        <>
            {favoritesDisplayList?.map((vehicle) => {
                return (
                    <>
                        {detailedView.active ?
                            <>
                                <div id='detailedViewContainerOverlay'>
                                    <div id='detailedViewContainer'>
                                        {(detailedView.vehicle?.type === 'car' || detailedView.vehicle?.type === 'coupe' || detailedView.vehicle?.type === 'truck') ? <CarDetail vehicle={detailedView.vehicle} /> : <></>}
                                        {(detailedView.vehicle.type === 'boat' || detailedView.vehicle?.type === 'jet ski') ? <BoatDetail vehicle={detailedView.vehicle} /> : <></>}
                                        {(detailedView.vehicle.type === 'Street Bike' || detailedView.vehicle?.type === 'Dirt Bike' || detailedView.vehicle?.type === 'Cruiser' || detailedView.vehicle?.type === "Sport Bike" || detailedView.vehicle?.type === "Touring Bike" || detailedView.vehicle?.type === "Adventure Bike" || detailedView.vehicle?.type === "Dual Sport") ? <MotoDetail vehicle={detailedView.vehicle} /> : <></>}
                                        {(detailedView.vehicle.type === 'motorized' || detailedView.vehicle.type === 'towable') ? <RvDetail vehicle={detailedView.vehicle} /> : <></>}
                                        {(detailedView.vehicle.type === 'flatbed' || detailedView.vehicle.type === 'enclosed') ? <TrailerDetail vehicle={detailedView.vehicle} /> : <></>}
                                        <div id='returnButtonContainer'>
                                            <button onClick={() => { setDetailedView({ active: false, vehicle: {} }) }}>Go Back</button>
                                        </div>
                                    </div>
                                </div>
                            </> : <></>}
                        <VehicleCard vehicle={vehicle} detailedView={detailedView} setDetailedView={setDetailedView} />
                        <VehicleCard vehicle={vehicle} detailedView={detailedView} setDetailedView={setDetailedView} />
                    </>
                )
            })}
        </>
    )
}

export default FavoritesDisplay