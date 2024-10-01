import { Task } from "../Task/interface/Task";

const syncedTaskskey = import.meta.env.VITE_APP_LOCAL_STORAGE_SYNCED_TASKS_KEY;
const unsyncedTasksKey = import.meta.env.VITE_APP_LOCAL_STORAGE_UNSYNCED_TASKS_KEY;

/* Store */
export function storeUserId(userId:string) {
    window.localStorage.setItem(import.meta.env.VITE_APP_LOCAL_STORAGE_UID_KEY, userId);
}

export function storeSyncedTasks(tasks: Task[]) {
    window.localStorage.setItem(syncedTaskskey, JSON.stringify(tasks));
};

export function storeUnsyncedTasks(tasks: Task[]) {
    window.localStorage.setItem(unsyncedTasksKey, JSON.stringify(tasks));
}

/* Get */
export function getUserIdFromLocalStorage() : string| null {
    return window.localStorage.getItem(import.meta.env.VITE_APP_LOCAL_STORAGE_UID_KEY);
}

export function getSyncedTasksFromLocalStorage() : Task[] | undefined {
    const storedTasks = window.localStorage.getItem(syncedTaskskey);
    if (storedTasks) {
        return JSON.parse(storedTasks);
    }
    return undefined;
};

export function getUnsyncedTasksFromLocalStorage() : Task[] | undefined {
    const storedUnsyncedTasks = window.localStorage.getItem(unsyncedTasksKey);
    if (storedUnsyncedTasks) {
        return JSON.parse(storedUnsyncedTasks);
    }
    return undefined;
}

/* Clear */
export function clearSyncedTasksFromLocalStorage() {
    window.localStorage.removeItem(syncedTaskskey);
}

export function clearUnsyncedTasksFromLocalStorage() {
    window.localStorage.removeItem(unsyncedTasksKey);
}