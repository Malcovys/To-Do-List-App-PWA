import { useEffect, useState } from "react";
import { Task } from "./App";
import TaskCard from "./TaskCard";
import TaskCreator from "./TaskCreator";
import { localStorageTaskskey, userID } from "../../layout/Layout";
import { getTasksFromDatabase, syncTasks } from "../../database/firebase";

const Tasks = () => {
    const [tasksHasLoaded, setTasksHasLoaded] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleNewTask = (input: string) => {
        const newTask = input.trim();
        if (newTask) {
            const task: Task = { 
                label: newTask, 
                completed: false 
            };
            const updatedTasks = [...tasks, task];
            setTasks(updatedTasks); // update task state
            postTasksInLocalStorage(updatedTasks); // Store task in local storage
        }
    };

    const handleCompleteAndUncompleteTask = (index: number) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        postTasksInLocalStorage(updatedTasks);
    };

    const handleRemoveTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        postTasksInLocalStorage(updatedTasks);
    };

    function loadTasksFromLocalStorage() {
        const storedTasks = window.localStorage.getItem(localStorageTaskskey);
        if (storedTasks) {
            const parsedTasks: Task[] = JSON.parse(storedTasks);
            setTasks(parsedTasks);
        }
    }

    const loadTasksFromDatabase = async () => {
        try {
            const tasksFromDatabase = await getTasksFromDatabase(userID);
            if (tasksFromDatabase) {
                const parsedTasks: Task[] = JSON.parse(JSON.stringify(tasksFromDatabase));
                setTasks(parsedTasks);
            } else {
                console.warn("No tasks found in the database, loading from local storage.");
                loadTasksFromLocalStorage();
            }
        } catch (error: any) {
            console.warn(`Error loading tasks from database: ${error.message}`);
            console.warn("Loading tasks from local storage instead.");
            loadTasksFromLocalStorage();
        }
    };

    function postTasksInLocalStorage(updatedTasks: Task[]) {
        window.localStorage.setItem(localStorageTaskskey, JSON.stringify(updatedTasks));
    }

    useEffect(() => {
        if (!tasksHasLoaded) {
            loadTasksFromDatabase().finally(() => {
                setTasksHasLoaded(true);
            });
        }
    }, [tasksHasLoaded]);

    // Listen to task state modification and sync with the database
    useEffect(() => {
        const syncTasksToDatabase = async () => {
            if (userID && tasks.length !== 0) {
                try {
                    await syncTasks(tasks, userID); // Sync tasks with database
                    console.log("Tasks successfully synced with database.");
                } catch (error: any) {
                    console.warn(`Sync tasks with database error: ${error.message}`);
                    console.warn("Tasks will be saved in local storage instead.");
                }
            }
        };
        syncTasksToDatabase();
    }, [tasks]);

    return (
        <div className="w-full h-full space-y-2 pt-2 px-5">
            {
                tasks.map((task, index) => (
                    <div key={index}>
                        <TaskCard 
                            task={task}
                            index={index}
                            changeCallback={handleCompleteAndUncompleteTask}
                            removeCallback={handleRemoveTask}
                        />
                    </div>
                ))
            }
            <div className="absolute bottom-5 right-7">
                <TaskCreator submitCallback={handleNewTask} />
            </div>
        </div>
    );
};

export default Tasks;
