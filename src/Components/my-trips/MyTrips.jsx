import { db } from '@/Service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

const MyTrips = () => {
  const [userTrips, setUserTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
      return;
    }

    try {
      const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
      const querySnapshot = await getDocs(q);
      setUserTrips([]);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserTrips(prevVal=>[...prevVal,doc.data()])
      });
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };
  console.log(userTrips?.id)

  return (
   <Link to={'/view-trips/'+ userTrips?.trip?.id}>
    <div className='text-white bg-gradient-to-r from-black to-gray-900'>
      <h1 className='text-6xl font-light'>My <span className='text-purple-500'>Trips</span></h1>

      <div>
        
      </div>
      {userTrips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <ul className='mt-10 grid grid-cols-2 md:grid-cols-3 justify-center items-center ml-4  mr-4 sm:ml-10  gap-8 '>
          {userTrips.map((trip,index) => (
           <UserTripCardItem trip={trip}/>
           
          ))}
        </ul>
      )}
    </div>
    </Link>
   
  );
};

export default MyTrips;
