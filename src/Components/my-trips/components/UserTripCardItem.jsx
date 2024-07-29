import { GetPlacesDetails } from '@/Service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';



const UserTripCardItem = ({trip}) => {
    const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=1000&key='+'AIzaSyCmXwngTZ1ehzQDY-Ju_tJQy1BISrmulwk'
    const [photoUrl,setPhotoUrl] = useState();
    useEffect(()=>{
    trip&&GetPlacePhoto();
    },[trip])
    
    
        const GetPlacePhoto=async()=>{
            const data={
                textQuery:trip?.userSelection?.location?.label
            }
            const result = await GetPlacesDetails(data).then(resp=>{
                console.log(resp.data.places[0].photos[1].name);
    
                const PhotoUrl= PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
                setPhotoUrl(PhotoUrl);
            })
        }
  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className=''>
        <img src={photoUrl?photoUrl:"/placeholder.avif"} alt=""  className='rounded-lg md:w-[50%]'/>
        <div>
            <h2 className='text-white mt-4 font-bold'>{trip?.userSelection?.location.label}</h2>
            <h2 className='text-gray-500'> {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget</h2>
             {/* <button>VIEW TRIP</button> */}
            
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem