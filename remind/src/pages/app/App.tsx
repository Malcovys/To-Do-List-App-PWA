import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskCreator from "./TaskCreator";
import { cn } from "../../components/lib/utils";

export interface Task {
  id: number,
  title : string,
  completed: boolean
};

function SyncDatabaseBtn () {
  const [synced, setSynced] = useState(false);
  const style = { sync: "bg-green-500", notSync: "bg-slate-500" };

  return (
    <button className="p-2 rounded-3xl bg-slate-100 text-slate-500">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-database">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
        <path d="M3 12A9 3 0 0 0 21 12"/>
      </svg>
      <span className="relative">
        <span className="absolute left-0 bottom-0 flex h-3 w-3 items-center justify-center">
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", synced ? style.sync : style.notSync)}>
          </span>
          <span className={cn("relative inline-flex right-0 bottom-0 size-2 rounded-full", synced ? style.sync : style.notSync)}>
          </span>
        </span>
      </span>
    </button>
  )
}

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
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between shadow-lg px-3 h-16">
          <h1 className="font-semibold text-2xl">To-Do list</h1>
          <SyncDatabaseBtn/>
        </div>
        <TaskList
          tasks={tasks}
          changeCallback={handleUpdateTask}
          removeCallback={handleRemoveTask}
        />
      </div>
      <div className="absolute bottom-5 right-7">
        <TaskCreator submitCallback={hadleNewTask} />
      </div>
    </>
  )
}

export default App
