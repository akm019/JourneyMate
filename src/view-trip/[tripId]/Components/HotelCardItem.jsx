import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PHOTO_REF_URL } from '@/Service/GlobalApi';
import { GetPlacesDetails } from '@/Service/GlobalApi';

const HotelCardItem = ({ hotel }) => {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        if (hotel) GetPlacePhoto();
    }, [hotel]);

    const GetPlacePhoto = async () => {
        const data = { textQuery: hotel?.hotel_name };
        const result = await GetPlacesDetails(data).then(resp => {
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[2].name);
            setPhotoUrl(PhotoUrl);
        });
    };

    return (
        <div className="bg-gradient-to-b from-purple-900 to-indigo-700 rounded-lg p-4 shadow-lg hover:scale-105 transition-transform duration-300">
            <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotel_address + hotel.hotel_name}`} target='_blank'>
                <img src={photoUrl || '/placeholder.avif'} alt="Hotel" className='rounded-lg h-[180px] w-full object-cover mb-4' />
                <div className="text-white space-y-2">
                    <h2 className='font-bold text-xl'>{hotel.hotel_name}</h2>
                    <p className='text-gray-300'>📍 {hotel.hotel_address}</p>
                    <p>💸 {hotel.price}</p>
                    <p>⭐ {hotel.rating}</p>
                </div>
            </Link>
        </div>
    );
};

export default HotelCardItem;
