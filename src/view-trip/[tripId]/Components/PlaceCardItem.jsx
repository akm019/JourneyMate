import React, { useEffect, useState } from 'react';
import { PHOTO_REF_URL } from '@/Service/GlobalApi';
import { GetPlacesDetails } from '@/Service/GlobalApi';

const PlaceCardItem = ({ place }) => {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        if (place) GetPlacePhoto();
    }, [place]);

    const GetPlacePhoto = async () => {
        const data = { textQuery: place?.place_name };
        const result = await GetPlacesDetails(data).then(resp => {
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[2].name);
            setPhotoUrl(PhotoUrl);
        });
    };

    return (
        <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-md">
            <img src={photoUrl || '/placeholder.avif'} alt="Place" className='w-[140px] h-[140px] object-cover rounded-lg' />
            <div className="text-white space-y-2">
                <h3 className="text-xl font-semibold text-teal-300">{place.place_name}</h3>
                <p className="text-gray-400">{place.place_details}</p>
                <p>⌚ Time: {place.time_to_travel}</p>
                <p>🎫 Ticket: {place.ticket_pricing}</p>
            </div>
        </div>
    );
};

export default PlaceCardItem;
