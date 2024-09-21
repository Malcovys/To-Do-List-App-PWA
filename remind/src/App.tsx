import { useEffect, useState } from "react";
import TaskList from "./components/personal/TaskList";
import TaskCreator from "./components/personal/TaskCreator";

export interface Task {
  id: number,
  title : string,
  completed: boolean
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [removeTaskIndex, setRemoveTaskIndex] = useState(-1);

  const hadleNewTask = (input : string) => {
      setNewTask(input);
  }

  const handleUpdateTask = (index:number) => {
    tasks[index].completed = !tasks[index].completed;
  }

  const handleRemoveTask = (index:number) => {
    setRemoveTaskIndex(index);
  }

  useEffect(()=> {
      if(newTask.trim() != "") {
        let task : Task = {
          id: -1,
          title : newTask,
          completed: false
        };

        setTasks([...tasks, task]);
        setNewTask("");
      }

      if(removeTaskIndex != -1) {
        let updatedTaskList = tasks;
        updatedTaskList.splice(removeTaskIndex, 1);
        
        setTasks(updatedTaskList);
        setRemoveTaskIndex(-1);
      }
  }, [tasks, newTask, removeTaskIndex])

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
