import React from 'react'

import { Link } from 'react-router-dom'
import { PHOTO_REF_URL } from '@/Service/GlobalApi';
import { useEffect,useState } from 'react';
import { GetPlacesDetails } from '@/Service/GlobalApi'

const PlaceCardItem = ({place}) => {
    const [photoUrl,setPhotoUrl] = useState();
    useEffect(()=>{
    place&&GetPlacePhoto();
    },[place])
    
    
        const GetPlacePhoto=async()=>{
            const data={
                textQuery:place?.place_name
            }
            const result = await GetPlacesDetails(data).then(resp=>{
                console.log(resp.data.places[0].photos[1].name);
    
                const PhotoUrl= PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[2].name);
                setPhotoUrl(PhotoUrl);
            })
        }
  return (
    <div className='md:flex gap-6 '>
        <img src={photoUrl?photoUrl:'/placeholder.avif'} className='w-[140px] h-[140px] object-cover  rounded-xl'>
        </img>
<div>
    <h2>{place.place_name}</h2>
    <h2 className='font-light'>{place.place_details}</h2>
    <h2> ⌚Time: {place.time_to_travel}</h2>
    <h2> 🎫Ticket:{place.ticket_pricing}</h2>
</div>
    </div>
  )
}

export default PlaceCardItem