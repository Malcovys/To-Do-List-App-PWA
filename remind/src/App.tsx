import { useState } from "react";
import TaskList from "./components/personal/TaskList";
import TaskCreator from "./components/personal/TaskCreator";

export interface Task {
  id: number,
  title : string,
  completed: boolean
};

function App() {
  const [tasks, setTask] = useState<Task[]>([]);

  const hadleNewTask = (input : string) => {
      let newTask : Task = {
          id: -1,
          title : input,
          completed: false
      };
      setTask([...tasks, newTask]);
      console.log(tasks);
  }

  const handleUpdateTask = (id:number) => {
    console.log(id);
  }

  const handleRemoveTask = (id:number) => {
    console.log(id);
  }

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
