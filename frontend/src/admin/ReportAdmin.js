import React, { useEffect, useState } from 'react'
import VehicleCard from '../vehiclecard/VehicleCard.js'
import BoatDetail from '../vehiclecarddetail/BoatDetail'
import CarDetail from '../vehiclecarddetail/CarDetail'
import MotoDetail from '../vehiclecarddetail/MotoDetail'
import RvDetail from '../vehiclecarddetail/RvDetail'
import TrailerDetail from '../vehiclecarddetail/Trailerdetail'
import './Admin.css'

const ReportAdmin = () => {
    const [listings, setListings] = useState();
    const [detailedView, setDetailedView] = useState({active:false, vehicle:{}, favorited:false});

    useEffect(() => {
        fetch('http://localhost:3001/listings')
        .then(res => res.json())
        .then(data => setListings(data))
    }, [])

  return (
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
            {listings ? listings.carListings.filter(car=>(car.reported)).map(car => <VehicleCard vehicle={car} detailedView={detailedView} setDetailedView={setDetailedView} />) : <></>}
            {listings ? listings.boatListings.filter(boat=>(boat.reported)).map(boat => <VehicleCard vehicle={boat} detailedView={detailedView} setDetailedView={setDetailedView} />) : <></>}
            {listings ? listings.rvListings.filter(rv=>(rv.reported)).map(rv => <VehicleCard vehicle={rv} detailedView={detailedView} setDetailedView={setDetailedView} />) : <></>}
            {listings ? listings.motoListings.filter(moto=>(moto.reported)).map(moto => <VehicleCard vehicle={moto} detailedView={detailedView} setDetailedView={setDetailedView} />) : <></>}
            {listings ? listings.trailerListings.filter(trailer=>(trailer.reported)).map(trailer => <VehicleCard vehicle={trailer} detailedView={detailedView} setDetailedView={setDetailedView} />) : <></>}
          </>
      </div>
  )
}

export default ReportAdmin