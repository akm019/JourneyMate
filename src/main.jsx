import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Hero from './Components/Hero.jsx'
import CreateTrip from './Create-Trip/index.jsx'
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './Components/my-trips/MyTrips.jsx'

const router = createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>,
      children:[
        {
          path:'',
          element:<Hero/>
        }
        ,
    {
      path:'/index',
      element:<CreateTrip/>
    },
    {
      path:'/view-trip/:tripId',
      element:<ViewTrip/>
    },
    {
      path:'/MyTrips',
      element:<MyTrips/>
    }
      ]
    }
  ]
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='186268793579-9oha9fufrvaeddu8pm9lnbi94fe72k7v.apps.googleusercontent.com'>
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  
  </React.StrictMode>
)
