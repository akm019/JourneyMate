import { GoogleLogin, googleLogout } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const closeDialog = () => {
    setOpenDialogue(false);
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setUser(resp.data);
      setOpenDialogue(false);
    }).catch((error) => {
      console.error('Error fetching user profile:', error);
    });
  };

  return (
    <div className='border-y h-24 flex justify-between items-center px-6 bg-gray-800'>
      <div className='flex items-center'>
        <img src='/logo.svg' alt='JourneyMate Logo' className='w-12 h-10' />
        <p className='text-white font-extrabold text-3xl ml-2'>JourneyMate</p>
      </div>
      
      <div className='flex items-center relative'>
        {user ? (
          <div className='flex items-center gap-4'>
            <Link to='MyTrips'>
            <button className='border rounded-full text-blue-400 px-4 py-2'>My Trips</button>
            </Link>
            {user.picture ? (
              <div className='relative'>
                <img
                  src={user.picture}
                  alt='User'
                  className='w-10 h-10 rounded-full cursor-pointer'
                  onClick={toggleDropdown}
                />
                {showDropdown && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2'>
                    <button
                      className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
                      onClick={() => {
                        googleLogout();
                        localStorage.clear();
                        setUser(null);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className='text-white'>No Picture</p>
            )}
          </div>
        ) : (
          <button onClick={() => setOpenDialogue(true)} className='border p-4 hover:border-purple-600 rounded-lg bg-black text-white'>
            SIGN IN
          </button>
        )}
      </div>
      
      {openDialogue && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex ">            <svg className='mt-2' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="20" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>Login with Google</h2>
            <button
              className="bg-blue-500 text-white p-2 rounded-lg mb-4 w-full"
              onClick={login}
            >
   Login 
            </button>
           
            <button
              className="mt-4 text-gray-600 underline"
              onClick={closeDialog}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
