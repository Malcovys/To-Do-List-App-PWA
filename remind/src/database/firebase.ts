import { initializeApp } from "firebase/app";
import { doc, DocumentData, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: import.meta.env.VITE_FIRE_BASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIRE_BASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIRE_BASE_MESSAGIN_SENDER_ID,
  appId: import.meta.env.VITE_FIRE_BASE_APP_ID,
  measurementId: import.meta.env.VITE_FIRE_BASE_MEASUREMENT_ID
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
export async function syncTasks(tasks: DocumentData, uid: string|null|undefined) {
  if (uid == null) {
    console.error("UID is null, cannot sync tasks.");
    return false;
  }

  try 
  {
    const userDoc = doc(firestore, `users/${uid}`);
    const docData = {
      tasks: tasks
    };

    await setDoc(userDoc, docData, { merge: true });
    return true;
  } 
  catch (error: any) 
  {
    console.error(`Sync data error: ${error.message}`);
    return false;
  }
}

export async function getTasksFromDatabase(uid: string) : Promise<[]|undefined> {
  const userDoc = doc(firestore, `users/${uid}`);
    const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    return userSnapshot.data().tasks;
  } else {
    console.log("No such document!");
    return undefined;
  }
}