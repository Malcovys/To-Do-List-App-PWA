import { useEffect, useState } from "react";
import TaskList from "./components/personal/TaskList";
import TaskCreator from "./components/personal/TaskCreator";

export interface Task {
  id: number,
  title : string,
  completed: boolean
};

function App() {
  const taskListKey = 'taskList';

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const hadleNewTask = (input : string) => {
      setNewTask(input);
  }

  const handleUpdateTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    postTasks(updatedTasks);
  };

  const handleRemoveTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    postTasks(updatedTasks);
  };

  // Récupérer les tâches depuis localStorage
  function getTasks() {
    const storedTasks = window.localStorage.getItem(taskListKey);
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      setTasks(parsedTasks);
    }
  }

  // Enregistrer les tâches dans localStorage
  function postTasks(updatedTasks: Task[]) {
    window.localStorage.setItem(taskListKey, JSON.stringify(updatedTasks));
  }


  // Initialiser les tâches lors du montage
  useEffect(() => {
    getTasks();
  }, []);

  // Ajouter une nouvelle tâche
  useEffect(() => {
    if (newTask.trim() !== "") {
      const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
      const task: Task = { id: newId, title: newTask, completed: false };

      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      postTasks(updatedTasks);
      setNewTask("");
    }
  }, [newTask]);

  return (
    <div className="p-2">
      <div className="flex flex-col space-y-4">
        <h1 className="font-semibold text-2xl">To-Do list</h1>
        <TaskList 
          tasks={tasks}
          changeCallback={handleUpdateTask}
          removeCallback={handleRemoveTask}
        />
      </div>
      <div className="absolute bottom-5 right-7">
        <TaskCreator submitCallback={hadleNewTask} />
      </div>
    </div>
  )
}

export default App
