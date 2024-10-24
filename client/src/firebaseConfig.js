// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAD168d2LWUpaPN0TOONQ78HqcdJrtuctU",
    authDomain: "quickmart-95fb5.firebaseapp.com",
    projectId: "quickmart-95fb5",
    storageBucket: "quickmart-95fb5.appspot.com",
    messagingSenderId: "679642686962",
    appId: "1:679642686962:web:db1d359b0766722bdaf76b",
    measurementId: "G-F9VDD723YS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
