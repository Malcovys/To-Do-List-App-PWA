import Input from "./Input"
import TaskCard from "./TaskCard";
import { useState } from "react";

interface Task {
    id: number,
    title : string,
    create_at: string,
    update_at: string,
    isDone: boolean
};

function ToDo() {
    const [tasks, setTask] = useState<Task[]>([]);

    const onSubmit = (input : string) => {
        let newTask : Task = {
            id: -1,
            title : input,
            create_at: new Date().toISOString(),
            update_at: new Date().toISOString(),
            isDone: false
        };

        setTask([...tasks, newTask]);
        console.log(tasks);
    }

    return (
        <div className="mx-auto h-[calc(100dvh)] flex flex-col items-center space-y-2">
            <div id="card-container" className="w-full h-full space-y-2 pt-2">
                {
                    tasks.map((task, index) => (
                        <div key={index}>
                            <TaskCard 
                                id={task.id}
                                title={task.title}
                                isDone={task.isDone}
                            />
                        </div>
                    ))
                }
            </div>
            <div className="w-full flex justify-center items-center bg-white">
                <Input callback={onSubmit}/>
            </div>
        </div>
    )
  }
  
  export default ToDo