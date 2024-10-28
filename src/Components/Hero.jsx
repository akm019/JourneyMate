import React from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react';
import ani from '../assets/Ani2.json'

const Hero = () => {
  return (
<div className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-gradient-to-r from-black to-gray-900 ">
  {/* Left Section (Text and Button) */}
  <div className="w-full md:w-1/2 flex flex-col items-start text-left p-10 md:p-20 gap-8">
    <p className="font-bold text-4xl sm:text-5xl md:text-6xl">
      Welcome to{' '}
      <span className="bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
        JourneyMate
      </span>
      , an{' '}
      <span className="bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
        AI trip planner
      </span>
    </p>
    <p className="text-xl sm:text-2xl mt-4">
      "Your Smart Travel Companion – Plan, Explore, and Enjoy Every Journey with Ease!"
    </p>

    {/* Additional Content */}
    <p className="text-lg sm:text-xl text-gray-300">
      JourneyMate uses advanced AI algorithms to help you customize your trips, find the best destinations.
    </p>

    <p className="text-lg sm:text-xl text-gray-300">
      Whether you're planning a solo adventure, a family vacation, or a business trip, JourneyMate provides tailored recommendations, personalized itineraries, and a hassle-free booking experience.
    </p>

    {/* Get Started Button */}
    <Link to="index" className="mt-6">
      <button className="cursor-pointer text-white font-bold relative text-[16px] w-[12em] h-[4em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700">
        GET STARTED
      </button>
    </Link>
  </div>

  {/* Right Section (Lottie Animation) */}
  <div className="w-full md:w-1/2 flex justify-center p-10">
    <Lottie animationData={ani} className="w-full h-auto md:w-3/4" />
  </div>
</div>
  )
}

export default Hero