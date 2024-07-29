import { GetPlacesDetails } from '@/Service/GlobalApi'
import React, { useEffect, useState } from 'react'



const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=1000&key='+'AIzaSyCmXwngTZ1ehzQDY-Ju_tJQy1BISrmulwk'
const InfoSection = ({trip}) => {


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
    <div>
        <div >
            <div className='mt-10 sm:ml-[10%] ml-[5%] mr-[5%]  '>
            <img src={photoUrl?photoUrl:'/placeholder.avif'} className='md:h-[30rem] md:w-[70rem] sm:h-[20rem] sm:w-[40rem] rounded-lg'></img>
    
            </div>
       <div className='flex flex-col gap-6 mx-[10%]'>
        <h2 className='text-white font-bold text-3xl  mt-10'>{trip?.userSelection?.location?.label}</h2>
        <div className='flex gap-6 '>
<h2 className='py-2 px-3 border border-purple-500  rounded-full w-[20%]'>{trip?.userSelection?.noOfDays} Days</h2>
<h2 className='py-2 px-3  border border-purple-500 rounded-full w-[30%]'>{trip?.userSelection?.budget} Budget</h2>
<h2 className='px-3 py-2 border border-purple-500 rounded-full w-[30%]'>No. of travelers:{trip?.userSelection?.travelers} </h2>

        </div>
    </div>
   
    
        </div>
        
        </div>
  )
}

export default InfoSection;