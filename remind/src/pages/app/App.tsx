import { useEffect, useState } from "react";
import { cn } from "../../components/lib/utils";
import { signInWithGoogle } from "../../database/firebase";
import { User } from "firebase/auth";
import Tasks from "./Tasks";
import { localStorageUidKey } from "../../layout/Layout";

export interface Task {
  label: string;
  completed: boolean;
}

const SyncDatabaseBtn = ({ auth, callback }: { auth: boolean; callback: (user: User | undefined) => void }) => {
  const style = { sync: "bg-green-500", notSync: "bg-slate-500" };
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    const handleOnline = () => auth && setSynced(true);
    const handleOffline = () => setSynced(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [auth]);

  const handleClick = async () => {
    try {
      const user = await signInWithGoogle();
      callback(user);
    } catch (e) {
      console.error("Erreur lors de l'authentification : " + e);
    }
  };

  useEffect(() => {
    if (auth && navigator.onLine) {
      setSynced(true);
    }
  }, [auth]);

  return (
    <button
      className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-white hover:bg-black"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-database"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
      <div className="relative">
        <div className={cn("absolute right-0 bottom-0 size-2 rounded-full", synced ? style.sync : style.notSync)}></div>
      </div>
    </button>
  );
};

const App = () => {
  const [auth, setAuth] = useState(false);

  const handleSignIn = (user: User | undefined) => {
    if (!user) return;
    setAuth(true);
    window.localStorage.setItem(localStorageUidKey, user.uid);
  };

  useEffect(() => {
    const uid = window.localStorage.getItem(localStorageUidKey);
    if (uid && uid.trim()) setAuth(true);
  }, []);

  return (
    <div className="flex flex-col space-y-4 w-full h-full">
      <div className="flex items-center justify-between shadow-lg px-3 h-16">
        <h1 className="font-semibold text-2xl">To-Do list</h1>
        <SyncDatabaseBtn auth={auth} callback={handleSignIn} />
      </div>
      <div className="w-full h-full">
        <Tasks />
      </div>
    </div>
  );
};

export default App;