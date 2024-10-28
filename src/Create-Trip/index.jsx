import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SelectTravelList, BudgetOptionsList, AI_PROMPT } from '../Constants/options';
import { chatSession } from '../Service/AiModel';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '@/Service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import ani from '../assets/Ani1.json'
const Index = () => {
  const [selectedTravelOption, setSelectedTravelOption] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [loading,setLoading] = useState(false);



  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

const login = useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
})





const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,{
        headers:{
            Authorization:`Bearer ${tokenInfo.access_token}`,
            Accept:'Application/json'
        }
    }).then((resp)=>{
        console.log(resp)
        localStorage.setItem('user',JSON.stringify(resp.data));
        setOpenDialogue(false);
        onGenerateTrip();  
        // console.log(resp);
    })
    }



  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onGenerateTrip = async () => {
    if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.travelers) {
      alert("please fill all details");
      return;
    }

    // If user is not logged in, open the dialog box
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialogue(true);
      return;
    }
setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location.label)
      .replace('{noOfDays}', formData?.noOfDays)
      .replace('{budget}', formData?.budget)
      .replace('{travelers}', formData?.travelers)
      .replace('{noOfDays}', formData?.noOfDays);

   

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--",result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const closeDialog = () => {
    setOpenDialogue(false);
  };

  const SaveAiTrip =async(TripData)=>{
   
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString()
    // Add a new document in collection "cities"
    try {
      await setDoc(doc(db, "AITrips",docId), {
        userSelection:formData,
        tripData:JSON.parse(TripData),
        userEmail:user?.email,
        id:docId
       });
    } catch (error) {
      console.log(error)
    }


    setLoading(false);
    navigate('/view-trip/'+docId)
    
    }


  return (
    <div>
      {loading?(<div className=' w-[50%] ml-[20%] md:w-[20%] md:ml-[40%]'><Lottie animationData={ani}></Lottie></div>):(<div className='min-h-screen bg-gradient-to-r from-black to-gray-900 p-10'>
    <div className='pt-4 flex flex-col gap-6 items-center text-center text-white'>
      <h1 className='sm:text-6xl md:text-6xl font-extralight'>
        Tell us your <span className='bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text'>Travel preferences</span>
      </h1>
      <h1 className='text-xl sm:text-2xl font-extralight'>
        Provide some basic details and our AI will generate a customized itinerary just for you.
      </h1>
    </div>
  
    <div className='mt-12 flex flex-col gap-6 items-center'>
      <h1 className='font-extralight text-3xl'>Give a destination of your choice</h1>
      <div className='w-[60%] text-black'>
        <GooglePlacesAutocomplete
          apiKey="AIzaSyDOIu1MDZsG4AVS4etHt5PParQJOHhAy3Q"
          selectProps={{
            place,
            onChange: (e) => { setPlace(e); handleInputChange('location', e) },
          }}
        />
      </div>
  
      <div className='mt-10 flex flex-col gap-4 items-center'>
        <h1 className='font-extralight text-3xl'>
          How many days are you planning your trip for?
        </h1>
        <input
          className='w-[60%] bg-gray-800 text-white rounded-sm h-10 p-4 placeholder-gray-500'
          placeholder='Ex. 3 days'
          type="number"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
        />
      </div>
  
      <div className='mt-10 flex flex-col gap-6 items-center'>
        <h1 className='font-extralight text-3xl'>What is your budget?</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 w-[80%]">
          {BudgetOptionsList.map(category => (
            <div
              key={category.id}
              onClick={(e) => handleInputChange('budget', category.category)}
              className={`border p-6 rounded-lg shadow-md bg-gray-800 text-white transition-all transform hover:scale-105 ${formData?.budget === category.category && 'border-purple-500 scale-105'}`}
            >
              <h2 className="text-xl font-bold mb-2">{category.category}</h2>
              {category.options.map(option => (
                <div key={option.id}>
                  <h3 className="text-lg">{option.title}</h3>
                  <p className="font-extralight">{option.desc}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
  
      <h2 className="mt-10 text-2xl font-bold">Select Travel Option</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-[80%] mt-4">
        {SelectTravelList.map((option) => (
          <div
            key={option.id}
            onClick={(e) => handleInputChange('travelers', option.people)}
            className={`border p-6 rounded-lg shadow-md cursor-pointer bg-gray-800 text-white hover:scale-105 transform transition-transform ${formData?.travelers === option.people && 'border-purple-500 scale-105'}`}
          >
            <div className="flex justify-center mb-2">{option.icon}</div>
            <h3 className="text-lg font-bold">{option.title}</h3>
            <p className="text-gray-400">{option.desc}</p>
            <p className="text-gray-500 text-sm">{option.people}</p>
          </div>
        ))}
      </div>
       <button
        className='mt-10 bg-gradient-to-r from-violet-500 via-sky-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105'
        onClick={onGenerateTrip}
      >
        Generate
        
      </button>
    
    </div>
  
    {openDialogue && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <button
            className="bg-blue-500 text-white p-4 rounded-lg w-full mb-4 flex items-center justify-center"
            onClick={login}
          >
            <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 48 48">
              {/* Google login icon */}
              <path fill="#FFC107" d="M43.611,20.083..."></path>
              {/* other paths for icon */}
            </svg>
            Login with Google
          </button>
          <button className="text-gray-400 underline" onClick={closeDialog}>
            Close
          </button>
        </div>
      </div>
    )}
  </div>)}
     
    </div>
    
  
  
  );
}


export default Index;
