import React from 'react'
import PlaceCardItem from './PlaceCardItem'
import { Link } from 'react-router-dom'

const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className='text-white ml-10 font-extrabold text-2xl'>Places To Visit</h2>
      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div key={index}>
            <h2 className='text-white text-xl font-bold ml-10'>Day: {item.day}</h2>
            <div className='grid grid-cols-2 gap-5'>
              {item.plan.map((place, index) => (
                <div key={index}>
                  <h2 className='ml-10 text-orange-500'>{place.time}</h2>
                  <Link to={"https://www.google.com/maps/search/?api=1&query="+place.place_name} target="_blank">
                  <div className='border p-4 mx-3 my-6 ml-10 rounded-xl hover:scale-105 transition-all'>
                    <PlaceCardItem place={place} />
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
