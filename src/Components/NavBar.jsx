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
    <div className='border-y h-24 flex justify-between items-center px-6 bg-gradient-to-r from-black to-gray-900 border-b border-purple-700 text-white p-4'>
      <div className='flex items-center'>
        <img src='/logo.svg' alt='JourneyMate Logo' className='w-12 h-10' />
        <Link to ="/"><p className='text-white font-extrabold text-3xl ml-2'>JourneyMate</p>
        </Link>
        </div>
      
      <div className='flex items-center relative'>
        {user ? (
          <div className='flex items-center gap-4'>
            <Link to='MyTrips'>
            /* From Uiverse.io by ParasSalunke */ 
<div class="flex items-center justify-center h-screen">
  <div class="relative group -mt-4">
    <button
      class="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
    >
      <span
        class="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      ></span>

      <span class="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
        <div class="relative z-10 flex items-center ">
          <span class="transition-all duration-500 group-hover:translate-x-1"
            >My Trips</span>
          <svg
            class="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
            data-slot="icon"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
      </span>
    </button>
  </div>
</div>
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
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-40'>
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
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 p-6 rounded-lg shadow-xl max-w-sm w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-white flex items-center justify-center">
        <svg
          className="mr-3"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          ></path>
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          ></path>
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
        </svg>
        Login with Google
      </h2>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mb-4 w-full font-semibold transition-all duration-300"
        onClick={login}
      >
        Login
      </button>
      <button
        className="mt-4 text-gray-400 hover:text-gray-200 underline text-sm transition-all duration-200"
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
