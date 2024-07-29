import React from 'react'
import { Link } from 'react-router-dom'
import { PHOTO_REF_URL } from '@/Service/GlobalApi';
import { useEffect,useState } from 'react';
import { GetPlacesDetails } from '@/Service/GlobalApi';

const HotelCardItem = ({hotel}) => {


    const [photoUrl,setPhotoUrl] = useState();
    useEffect(()=>{
    hotel&&GetPlacePhoto();
    },[hotel])
    
    
        const GetPlacePhoto=async()=>{
            const data={
                textQuery:hotel?.hotel_name
            }
            const result = await GetPlacesDetails(data).then(resp=>{
                console.log(resp.data.places[0].photos[1].name);
    
                const PhotoUrl= PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[2].name);
                setPhotoUrl(PhotoUrl);
            })
        }
  return (
    <div>
         <Link to={"https://www.google.com/maps/search/?api=1&query="+hotel.hotel_address+hotel.hotel_name} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={photoUrl?photoUrl:'/placeholder.avif'} className='rounded-lg h-[180px] w-full object-cover'></img>
                <div className=']'>
                    <h2 className='text-white font-bold text-xl mt-[10%]'>{hotel.hotel_name}</h2>
                    <h2 className='text-gray-500'>📍{hotel.hotel_address}</h2>
                    <h2>💸{hotel.price}</h2>
                    <h2>⭐{hotel.rating}</h2>
                </div>
                
            </div>
            </Link>
    </div>
  )
}

export default HotelCardItem