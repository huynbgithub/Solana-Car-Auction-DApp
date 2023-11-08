// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "solana-car-auction.firebaseapp.com",
    projectId: "solana-car-auction",
    storageBucket: "solana-car-auction.appspot.com",
    messagingSenderId: "504562140077",
    appId: "1:504562140077:web:faf59e5580f7bba9a15724"
};

// Initialize Firebase
const initializeFirebase = () => initializeApp(firebaseConfig)

export default initializeFirebase