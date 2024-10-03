import { useEffect, useState } from "react";
import { useApp } from "../../App";
import { cn } from "../../components/lib/utils";
import { signInWithGoogle } from "../../firebase/firebase";
import { getUserIdFromLocalStorage, storeUserId } from "../../helper/localStorage";

export const SyncDatabaseBtn = () => {
    const { userId, online, setLoadAccout, setSwitchAccount, setUserId } = useApp();
    const [connected, setConnected] = useState(false);
  
    const style = { sync: "bg-green-500", notSync: "bg-slate-500" };
  
    const handleSignIn = async () => {
      if(online) {
        try {
          const user = await signInWithGoogle();
  
          const userIdFromLocalStorage = getUserIdFromLocalStorage();
  
          if(!userIdFromLocalStorage) {
            setLoadAccout(true);
          }
          
          if(userIdFromLocalStorage && userIdFromLocalStorage != user.uid) {
            setSwitchAccount(true);
          }
  
          setUserId(user.uid);
          storeUserId(user.uid);
        } catch (error:any) {
          console.warn(`Sing in error : ${error.message}`);
        }
      }
    };

    useEffect(() => {
      if (userId && online) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    }, [userId, online]);
  
    return (
      <button
        className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-white hover:bg-black"
        onClick={handleSignIn}
      >
        <svg className="lucide lucide-database"
          xmlns="http://www.w3.org/2000/svg"
          width="24" height="24"
          viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5V19A9 3 0 0 0 21 19V5" />
          <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
        <div className="relative">
          <div className={cn("absolute right-0 bottom-0 size-2 rounded-full", connected ? style.sync : style.notSync)}></div>
        </div>
      </button>
    );
};