import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

const Hotels = ({trip}) => {

   
  return (
    <div>
        <h2 className='text-2xl font-bold ml-[10%] mt-10'>Hotel Recommendation</h2>
      
        <h2 className=' mt-10 grid grid-flow-col sm:grid-cols-3 grid-rows-2 md:grid-rows-1 gap-4 m-4 lg:ml-[2%]  '>{trip?.tripData?.hotel_options?.map((hotel,index)=>(
             <HotelCardItem hotel={hotel}/>
            

        ))}</h2>
    </div>
  )
}

export default Hotels