import React from 'react'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
<div>
<div className='w-full flex flex-col md:justify-center items-center '>
       <p className='sm:my-[10%] md:my-[6%] mx-[15%] text- font-extralight md:text-6xl text-5xl'>
       Welcome to <span className='text-purple-500'>JounreyMate</span> an <span className='text-blue-400'>AI trip planner </span>

"Your Smart Travel Companion – Plan, Explore, and Enjoy Every Journey with Ease!"
       </p>
        <Link to='index'>
        <button
  class="cursor-pointer text-white font-bold relative text-[16px] w-[12em] h-[4em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
>
  GET STARTED
</button>

</Link>
    </div>
    
</div>
  )
}

export default Hero