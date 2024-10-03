import { useEffect, useState } from "react";
import { useApp } from "../../App";
import TaskCard from "./TaskCard";
import TaskCreator from "./TaskCreator";;
import { getTasksFromDatabase, syncTasks } from "../../database/firebase";
import TasksFrame from "./TasksFrame";
import { Task } from "./interface/Task";
import { 
    clearSyncedTasksFromLocalStorage,
    clearUnsyncedTasksFromLocalStorage,
    getSyncedTasksFromLocalStorage,
    getUnsyncedTasksFromLocalStorage,
    storeSyncedTasks,
    storeUnsyncedTasks
} from "../../helper/localStorage";

const Tasks = () => {
    const { 
        userId, online, loadAccount, switchAccount, 
        setLoadAccout, setSwitchAccount 
    } = useApp();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [tasksHasLoaded, setTasksHasLoaded] = useState(false);
    const [isSynced, setIsSynced] = useState(false);

    /* Handles */
    function handleNewTask(input: string) {
        if (input.trim()) {
            const task: Task = { label: input, completed: false };
            const updatedTasks = [...tasks, task];
            setTasks(updatedTasks);

            clearSyncedTasksFromLocalStorage();
            storeUnsyncedTasks(updatedTasks); 
            setIsSynced(false);
        }
    };

    function handleCompleteAndUncompleteTask(index: number) {
        const updatedTasks = tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task);
        setTasks(updatedTasks);

        clearSyncedTasksFromLocalStorage();
        storeUnsyncedTasks(updatedTasks);
        setIsSynced(false);
    };

    function handleRemoveTask(index: number) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);

        clearSyncedTasksFromLocalStorage();
        storeUnsyncedTasks(updatedTasks);
        setIsSynced(false);
    };

    /* Data sync strategies */
    async function manageAccountMergingData(uid: string) {
            setTasksHasLoaded(false);
            clearSyncedTasksFromLocalStorage();

            let toSyncTasks : Task[] = [];
            const unsyncedTasks = getUnsyncedTasksFromLocalStorage();
            const tasksFromDatabase = await getTasksFromDatabase(uid);

            if (unsyncedTasks && tasksFromDatabase == undefined) {
                toSyncTasks = unsyncedTasks;
            } else if (unsyncedTasks && tasksFromDatabase != undefined) {
                const megedTasks : Task[] = [...unsyncedTasks, ...tasksFromDatabase];
                toSyncTasks = megedTasks; //
            } else if (!unsyncedTasks && tasksFromDatabase) {
                toSyncTasks = tasksFromDatabase;
            }

            syncTasks(toSyncTasks, uid);
            storeSyncedTasks(toSyncTasks);

            setTasks(toSyncTasks);

            clearUnsyncedTasksFromLocalStorage();

            setTasksHasLoaded(true);
            setLoadAccout(false);

            if(!isSynced) setIsSynced(true);
    }

    async function manageAccountSwitching(uid:string) {
            setTasksHasLoaded(false);

            clearSyncedTasksFromLocalStorage();
            clearUnsyncedTasksFromLocalStorage();

            const tasksFromDatabase : Task[]|undefined = await getTasksFromDatabase(uid);

            if(tasksFromDatabase) {
                setTasks(tasksFromDatabase); //
                storeSyncedTasks(tasksFromDatabase);
            } else {
                setTasks([]) //
                storeSyncedTasks([]);
            }
            

            setTasksHasLoaded(true);
            setSwitchAccount(false);

            if(!isSynced) setIsSynced(true);
    }

    async function syncUnsyncedTasks(uid:string) {
        const unsyncedTasks = getUnsyncedTasksFromLocalStorage();
            if(unsyncedTasks) {
                const tasksSync = await syncTasks(unsyncedTasks, uid);
                if(tasksSync) {
                    storeSyncedTasks(unsyncedTasks);
                    setTasks(unsyncedTasks);
                    clearUnsyncedTasksFromLocalStorage();
                    setIsSynced(true);
                }
            }
    }

    /* Mount */
    useEffect(() => {
        const loadedTasks = getUnsyncedTasksFromLocalStorage() || getSyncedTasksFromLocalStorage();
        setTasks(loadedTasks ? loadedTasks : tasks);
        setTasksHasLoaded(true);
    }, []);

    /* Updates */
    useEffect(() => {
        if(!isSynced && online && userId) {
            syncUnsyncedTasks(userId);
        }
    }, [isSynced])

    /* Sync */
    useEffect(() => {
        if(online) {
            console.log("online");
            if(userId && !isSynced) {
                syncUnsyncedTasks(userId);
            }
        } else {
            console.log("offline");
        }
    }, [online]);

    /* Account*/
    useEffect(() => {
        if(online && userId && switchAccount) manageAccountSwitching(userId);
        if(online && userId && loadAccount) manageAccountMergingData(userId);
    }, [switchAccount, loadAccount]);

    return (
        <div className="w-full h-full space-y-2 pt-2 px-5">
            {
                !tasksHasLoaded ? (
                <TasksFrame/>
                ) : (
                <div className="overflow-y-auto h-[85vh] flex-col space-y-3">
                    {tasks.map((task, index) => 
                    (<div key={index}>
                        <TaskCard task={task} index={index}
                            changeCallback={handleCompleteAndUncompleteTask}
                            removeCallback={handleRemoveTask}
                        />
                    </div>)
                    )}
                </div>
                )
            }
            <div className="absolute bottom-5 right-7">
                <TaskCreator submitCallback={handleNewTask} />
            </div>
        </div>
    );
};

export default Tasks;
