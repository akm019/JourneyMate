import React, { useEffect } from 'react'
import { useState } from 'react';
import { db } from '@/Service/firebaseConfig';
import {doc,getDoc} from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import InfoSection from './Components/InfoSection';
import Hotels from './Components/Hotels';
import PlacesToVisit from './Components/PlacesToVisit';
function ViewTrip() {
    const {tripId} = useParams();
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])


    const [trip,setTrip] = useState([])

    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()){
        console.log('Documents:',docSnap.data());
        setTrip(docSnap.data())
    }
    else{
        console.log("No such document");
        alert("No trip found")
    }
    }
  return (
    <div className='mt-10'>
 

 {/* Information section */}
<InfoSection trip={trip}/>
 {/* Hotels */}
<Hotels trip={trip}/>
 {/* Iternary */}


 {/* footer */}
 <PlacesToVisit trip={trip}/>
    </div>
  )
}

export default ViewTrip