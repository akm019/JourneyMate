// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7n4ylJhMEwt2hs_DyFSW7S7VTxfDk7JM",
  authDomain: "journeymate-422b4.firebaseapp.com",
  projectId: "journeymate-422b4",
  storageBucket: "journeymate-422b4.appspot.com",
  messagingSenderId: "281110301052",
  appId: "1:281110301052:web:d0ea8e07b58ffa76967cf9",
  measurementId: "G-KCFPP7EX67"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);