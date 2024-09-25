import { initializeApp } from "firebase/app";
import { addDoc, collection, DocumentData, getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Task } from "../pages/app/App";

const firebaseConfig = {
  apiKey: "AIzaSyCN3JmbOWozCH3c9fihNvQebwLfto0cfJM",
  authDomain: "remind-d9d5f.firebaseapp.com",
  projectId: "remind-d9d5f",
  storageBucket: "remind-d9d5f.appspot.com",
  messagingSenderId: "854741784842",
  appId: "1:854741784842:web:af8123ae6546697c3d02f3",
  measurementId: "G-DZC50REEE9"
};


// Initialize firebase
const app = initializeApp(firebaseConfig);

// Initialize GoogleAuth and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const databse = getFirestore(app);

// Google Auth
export async function signInWithGoogle ()  {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, provider);
  return res.user;
}

// db query
export async function createTask (task: DocumentData, uid:string) {
  const docRef = await addDoc(collection(databse, "tasks"), {
    ...task,
    uid
  });
  return docRef;
}

export async function getTasks (uid:string) {
  
}