import { initializeApp } from "firebase/app";
import { doc, DocumentData, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
const firestore = getFirestore(app);

// Google Auth
export async function signInWithGoogle ()  {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, provider);
  return res.user;
}

// db query
export async function syncTasks(tasks: DocumentData, uid: string | null) {
  if (uid == null) {
    console.error("UID is null, cannot sync tasks.");
    return -1;
  }

  try {
    const userDoc = doc(firestore, `users/${uid}`);
    
    const docData = {
      tasks: tasks
    };

    await setDoc(userDoc, docData, { merge: true });
    return 0; /// Return 0 if success
  } catch (error: any) {
    console.error(`Sync data error: ${error.message}`);
    return -1; /// Return -1 if error
  }
}

export async function getTasksFromDatabase(uid: string | null) {
  if (uid == null) return;

  const userDoc = doc(firestore, `users/${uid}`);
    const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    return userSnapshot.data().tasks;
  } else {
    console.log("No such document!");
    return null;
  }
}