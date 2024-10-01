import { createContext, useContext, useEffect, useState } from "react";
import Tasks from "./pages/Task/Tasks";
import { SyncDatabaseBtn } from "./pages/sync/SyncDatabaseBtn";
import { getUserIdFromLocalStorage } from "./pages/helper/localStorage";

interface AppContextType {
  online: boolean;
  userId: string|null|undefined;
  loadAccount: boolean;
  switchAccount: boolean;
  setUserId: (userId:string|null|undefined) => void;
  setLoadAccout: (loadAccount:boolean) => void;
  setSwitchAccount: (switchAccount:boolean) => void;
}
const AppContext = createContext<AppContextType|undefined>(undefined);
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};

const App = () => {
  const [online, setOnline] = useState(false);
  const [userId, setUserId] = useState<string|undefined|null>(undefined);
  const [loading, setLoading] = useState(true);
  const [loadAccount, setLoadAccout] = useState(false);
  const [switchAccount, setSwitchAccount] = useState(false);

  useEffect(() => {
    // UserId
    const userIdFromLocalStorage = getUserIdFromLocalStorage();
    if (userIdFromLocalStorage && userIdFromLocalStorage.trim()) {
      setUserId(userIdFromLocalStorage);
    } else {
      setUserId(undefined);
    }

    // Network
    if(navigator.onLine)setOnline(true);
    
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    setLoading(false);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4 w-full h-full">
      {
        !loading ? (
          <AppContext.Provider 
            value={{ 
              online, userId,loadAccount, switchAccount,
              setSwitchAccount, setUserId, setLoadAccout }}
          >
            <div className="flex items-center justify-between shadow-lg px-3 h-16">
              <h1 className="font-semibold text-2xl">To-Do list</h1>
              <SyncDatabaseBtn/>
            </div>
            <div className="w-full h-full">
                <Tasks />
            </div>
          </AppContext.Provider>
        ) : (
          <h1>Loading...</h1>
        )
      }
    </div>
  );
};

export default App;