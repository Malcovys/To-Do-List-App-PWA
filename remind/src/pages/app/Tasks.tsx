
import { useEffect, useState } from "react";
import { Task } from "./App";
import TaskCard from "./TaskCard";
import TaskCreator from "./TaskCreator";
import { localStorageTaskskey } from "../../layout/Layout";

const Tasks : React.FC<{uid: string}> = ({uid}) => {
    const [localTasks, setLocalTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");

    const hadleNewTask = (input : string) => {
        setNewTask(input);
    }

    const handleUpdateTask = (index: number) => {
        const updatedTasks = localTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
        );
        setLocalTasks(updatedTasks);
        postTasks(updatedTasks);
    };

    const handleRemoveTask = (index: number) => {
        const updatedTasks = localTasks.filter((_, i) => i !== index);
        setLocalTasks(updatedTasks);
        postTasks(updatedTasks);
    };

    // Récupérer les tâches depuis localStorage
    function getTasks() {
        const storedTasks = window.localStorage.getItem(localStorageTaskskey);
        if (storedTasks) {
        const parsedTasks: Task[] = JSON.parse(storedTasks);
        setLocalTasks(parsedTasks);
        }
    }

    // Enregistrer les tâches dans localStorage
    function postTasks(updatedTasks: Task[]) {
        window.localStorage.setItem(localStorageTaskskey, JSON.stringify(updatedTasks));
    }

    // Initialiser les tâches lors du montage
    useEffect(() => {
        getTasks();
    }, []);

    // Ajouter une nouvelle tâche
    useEffect(() => {
        if (newTask.trim() !== "") {
        const newId = localTasks.length > 0 ? localTasks[localTasks.length - 1].id + 1 : 1;
        const task: Task = { id: newId, title: newTask, completed: false };

        const updatedTasks = [...localTasks, task];
        setLocalTasks(updatedTasks);
        postTasks(updatedTasks);
        setNewTask("");
        }
    }, [newTask]);

    return (
        <div className="w-full h-full space-y-2 pt-2 px-5">
            {
                localTasks.map((task, index) => (
                    <div key={index}>
                        <TaskCard 
                            task={task}
                            index={index}
                            changeCallback={handleUpdateTask}
                            removeCallback={handleRemoveTask}
                        />
                    </div>
                ))
            }
            <div className="absolute bottom-5 right-7">
                <TaskCreator submitCallback={hadleNewTask} />
            </div>
        </div>
    )
  }
  
  export default Tasks