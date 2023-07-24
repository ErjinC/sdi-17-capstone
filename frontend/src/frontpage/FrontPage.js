import React from 'react'
import './FrontPage.css'
import VehicleCard from '../vehiclecard/VehicleCard.js'

const FrontPage = ({currentUser}) => {

  return (
    <div>

      <div id='flexfrontpagetop'>
        <div>
          <input type='search' placeholder='Search...' />
        </div>
        <div>
          {currentUser.success ? <>Home Base: {currentUser.base}</> : <>Log in to see your base!</>}
        </div>
        <div>Filters</div>
      </div>
      <VehicleCard />
    </div>
  )
}

export default FrontPage