import React from 'react';
import PlaceCardItem from './PlaceCardItem';
import { Link } from 'react-router-dom';

const PlacesToVisit = ({ trip }) => {
    return (
        <div className="mt-10 mx-6">
            <h2 className='text-3xl text-white font-bold mb-6'>Places To Visit</h2>
            {trip.tripData?.itinerary.map((item, index) => (
                <div key={index} className="mb-8">
                    <h3 className='text-2xl text-white font-semibold mb-4'>Day {item.day}</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {item.plan.map((place, idx) => (
                            <Link
                                key={idx}
                                to={`https://www.google.com/maps/search/?api=1&query=${place.place_name}`}
                                target="_blank"
                                className="block transition-transform transform hover:scale-105"
                            >
                                <div className="p-4 border border-teal-700 rounded-lg bg-gradient-to-tr from-gray-800 to-teal-800">
                                    <h4 className="text-teal-400 font-medium mb-2">{place.time}</h4>
                                    <PlaceCardItem place={place} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PlacesToVisit;
