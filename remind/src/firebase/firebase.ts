// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCN3JmbOWozCH3c9fihNvQebwLfto0cfJM",
  authDomain: "remind-d9d5f.firebaseapp.com",
  projectId: "remind-d9d5f",
  storageBucket: "remind-d9d5f.appspot.com",
  messagingSenderId: "854741784842",
  appId: "1:854741784842:web:af8123ae6546697c3d02f3",
  measurementId: "G-DZC50REEE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const analytics = getAnalytics(app);