import { useEffect, useState } from "react";
import { Task } from "./App";
import TaskCard from "./TaskCard";
import TaskCreator from "./TaskCreator";
import { userID } from "../../layout/Layout";
import { getTasksFromDatabase, syncTasks } from "../../database/firebase";

const Tasks = () => {
    const unsyncedTasksKey = "unsyncedTasks";
    const syncedTaskskey = "taskList"; 
    const [tasksHasLoaded, setTasksHasLoaded] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isSynced, setIsSynced] = useState(false); // Flag to track sync state

    /* Handles */

    function handleNewTask(input: string) {
        const newTask = input.trim();
        if (newTask) {
            const task: Task = {
                label: newTask,
                completed: false,
            };
            const updatedTasks = [...tasks, task];
            setTasks(updatedTasks);
            setIsSynced(false); // Mark as unsynced
        }
    };

    function handleCompleteAndUncompleteTask(index: number) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        setIsSynced(false); // Mark as unsynced
    };

    function handleRemoveTask(index: number) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        setIsSynced(false); // Mark as unsynced
    };

    /* Local storages (get) */

    function getSyncedTasksFromLocalStorage() : Task[] {
        const storedTasks = window.localStorage.getItem(syncedTaskskey);
        if (storedTasks) {
            return JSON.parse(storedTasks);
        }

        return [];
    };

    function getUnsyncedTasksFromLocalStorage() : Task[] {
        const storedUnsyncedTasks = window.localStorage.getItem(unsyncedTasksKey);
        if (storedUnsyncedTasks) {
            return JSON.parse(storedUnsyncedTasks);
        }
        return [];
    }

    /* Local storages (store) */

    function storeSyncedTasks(updatedTasks: Task[]) {
        window.localStorage.setItem(syncedTaskskey, JSON.stringify(updatedTasks));
    };

    function storeUnsyncedTasks(unsyncedTasks: Task[]) {
        window.localStorage.setItem(unsyncedTasksKey, JSON.stringify(unsyncedTasks));
    }

    /* Local storages (clean) */

    function clearSyncedTasksFromLocalStorage() {
        window.localStorage.removeItem(syncedTaskskey);
    }
    
    function clearUnsyncedTasksFromLocalStorage() {
        window.localStorage.removeItem(unsyncedTasksKey);
    }

    /* sync */

    const syncUnsyncedTasksToDatabase = async () => {
        const unsyncedTasks = getUnsyncedTasksFromLocalStorage();
        if (unsyncedTasks.length > 0) {
            if(await syncTasks(unsyncedTasks, userID)) {
                clearUnsyncedTasksFromLocalStorage();
                storeSyncedTasks(unsyncedTasks);
                console.log("Unsynced tasks sended in database.");
            }
        }
    };

    const syncTasksToDatabase = async () => {
        storeUnsyncedTasks(tasks);
        if(await syncTasks(tasks, userID)){
            clearUnsyncedTasksFromLocalStorage();
            storeSyncedTasks(tasks);
            setIsSynced(true);
            console.log("Tasks successfully synced with the database.");
        } else {
            console.warn("Tasks will be saved in local storage instead.");
            clearSyncedTasksFromLocalStorage();
        }
    };

    /* Load */

    const loadUnSyncedOrSyncedTasksFromLocalStorage = () => {
        let toLoadTasks = getUnsyncedTasksFromLocalStorage();
        if(toLoadTasks.length == 0) {
            toLoadTasks = getSyncedTasksFromLocalStorage();
        }
        setTasks(toLoadTasks);
    }

    const loadTasksFromDatabaseOrLocalStorage = async () => {
        syncUnsyncedTasksToDatabase();
        try {
            const tasksFromDatabase = await getTasksFromDatabase(userID);
            const parsedTasks: Task[] = JSON.parse(JSON.stringify(tasksFromDatabase));
            setTasks(parsedTasks);

        } catch (error: any) {
            console.warn(`Error loading tasks from database: ${error.message}`);
            console.warn("Loading tasks from local storage instead.");

            loadUnSyncedOrSyncedTasksFromLocalStorage()
        }
    };

    useEffect(() => {
        if(userID?.trim()) {
            loadTasksFromDatabaseOrLocalStorage().finally(() => {
                setTasksHasLoaded(true); 
            });
        }
    }, [tasksHasLoaded]);

    useEffect(() => {
        // Sync tasks with the database whenever tasks change
        if (!isSynced && tasks.length > 0 && userID?.trim()) {
            syncTasksToDatabase();
        }
    }, [tasks]);

    // Network listener
    useEffect(() => {
        const handleOnline = () => {
            console.log("Back online! Synchronizing tasks...");
            syncUnsyncedTasksToDatabase();
        };

        const handleOffline = () => {
            console.warn("You are offline. Changes will be stored locally.");
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <div className="w-full h-full space-y-2 pt-2 px-5">
            {tasks.map((task, index) => (
                <div key={index}>
                    <TaskCard
                        task={task}
                        index={index}
                        changeCallback={handleCompleteAndUncompleteTask}
                        removeCallback={handleRemoveTask}
                    />
                </div>
            ))}
            <div className="absolute bottom-5 right-7">
                <TaskCreator submitCallback={handleNewTask} />
            </div>
        </div>
    );
};

export default Tasks;
