import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '@/Service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import InfoSection from './Components/InfoSection';
import Hotels from './Components/Hotels';
import PlacesToVisit from './Components/PlacesToVisit';

function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        if (tripId) GetTripData();
    }, [tripId]);

    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setTrip(docSnap.data());
        } else {
            alert("No trip found");
        }
    };

    return (
        <div className="mt-10 text-white space-y-12 bg-gradient-to-r from-black to-gray-900">
            <InfoSection trip={trip} />
            <Hotels trip={trip} />
            <PlacesToVisit trip={trip} />
        </div>
    );
}

export default ViewTrip;
