import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SelectTravelList, BudgetOptionsList, AI_PROMPT } from '../Constants/options';
import { chatSession } from '../Service/AiModel';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '@/Service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
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
    await setDoc(doc(db, "AITrips",docId), {
     userSelection:formData,
     tripData:JSON.parse(TripData),
     userEmail:user?.email,
     id:docId
    
    });

    setLoading(false);
    navigate('/view-trip/'+docId)
    
    }


  return (
    <div>
      <div className='mt-20 flex flex-col gap-4 ml-10 items-center justify-center bg-black '>
        <h1 className='sm:text-6xl md:text-6xl font-extralight'>Tell us your <span className='text-purple-500'>Travel preferences</span></h1>
        <h1 className='text-2xl font-extralight'>
          Just provide us some basic information and our trip planner will generate a customized itinerary based on your preferences.
        </h1>
      </div>

      <div className=' mt-10 flex flex-col gap-6 items-center justify-center'>
        <h1 className='font-extralight text-4xl'>
          Give a destination of your choice
        </h1>
        <div className='text-black w-[60%]'>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyDOIu1MDZsG4AVS4etHt5PParQJOHhAy3Q"
            selectProps={{
              place,
              onChange: (e) => { setPlace(e); handleInputChange('location', e) },
            }}
          />
        </div>
        <div className='mt-20 flex flex-col gap-6 items-center justify-center'>
          <h1 className='font-extralight text-4xl'>
            How many days you are planning your trip for?
          </h1>
          <input className='text-black w-[63%] md:w-[130%] rounded-sm h-10'
            placeholder={'   Ex.3'}
            type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>
        <div className='mt-10 flex flex-col gap-10 items-center justify-center'>
          <p className='font-extralight text-4xl'>What is your budget?</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {BudgetOptionsList.map(category => (
              <div
                key={category.id}
                onClick={(e) => handleInputChange('budget', category.category)}
                className={`border p-4 rounded-lg shadow-md ${formData?.budget === category.category && 'border-purple-500 scale-105'}`}
              >
                <h2 className="hover:shadow-white text-xl font-bold mb-4">{category.category}</h2>
                {category.options.map(option => (
                  <div key={option.id} className="mb-4">
                    <h3 className="text-lg font-light">{option.title}</h3>
                    <p className="font-extralight mb-2">{option.desc}</p>
                    <div className="flex items-center mb-2">
                      <div className="mr-2">{option.icon}</div>
                      <p className="text-gray-600">{option.budget}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Select Travel Option</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SelectTravelList.map((option) => (
            <div
              key={option.id}
              onClick={(e) => handleInputChange('travelers', option.people)}
              className={`border p-4 rounded-lg shadow-md cursor-pointer transition-transform transform ${formData?.travelers === option.people && 'border-purple-500 scale-105'}`}
            >
              <div className="flex justify-center mb-2">{option.icon}</div>
              <h3 className="text-lg font-bold mb-1">{option.title}</h3>
              <p className="text-gray-600">{option.desc}</p>
              <p className="text-gray-500 text-sm">{option.people}</p>
            </div>
          ))}
        </div>
        <div>
         
          <button onClick={onGenerateTrip}>   {loading? "loading":"Generate"

}</button>
        </div>
      </div>

      {openDialogue && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Login or Signup</h2>
            <button
              className="bg-blue-500 text-white p-2 rounded-lg mb-4 w-full"
              onClick={login}
            >
              Login with Google
            </button>
            <button
              className="bg-green-500 text-white p-2 rounded-lg w-full"
              onClick={() => { /* Implement Google Signup */ }}
            >
              Signup with Google
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
}


export default Index;
