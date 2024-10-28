import React from 'react';
import HotelCardItem from './HotelCardItem';

const Hotels = ({ trip }) => {
    return (
        <div className="mt-12 px-6">
            <h2 className="text-3xl font-extrabold text-white mb-8">Hotel Recommendations</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {trip?.tripData?.hotel_options?.map((hotel, index) => (
                    <HotelCardItem key={index} hotel={hotel} />
                ))}
            </div>
        </div>
    );
};

export default Hotels;
