import { useState } from "react";
import TaskList from "./components/personal/TaskList";
import TaskCreator from "./components/personal/TaskCreator";

export interface Task {
  id: number,
  title : string,
  completed: boolean
};

function App() {
  //const [tasks, setTask] = useState<Task[]>([]);
  const [createTask, setCreateTask] = useState(false);

  const tasks = [
    { id: 1, title: "Learn TypeScript", completed: false },
    { id: 2, title: "Build a React app", completed: true },
  ];

  const onSubmit = (input : string) => {
      let newTask : Task = {
          id: -1,
          title : input,
          completed: false
      };

      // setTask([...tasks, newTask]);
      // console.log(tasks);
  }

  const displayTaskForm = () => {
    console.log("Form");
  };

  return (
    <div className="p-2">
      <div className="flex flex-col space-y-4">
        <h1 className="font-semibold text-2xl">To-Do list</h1>
        <TaskList tasks={tasks} />
      </div>
      <div className="absolute bottom-5 right-7">
        <TaskCreator/>
      </div>
    </div>
  )
}

export default App
