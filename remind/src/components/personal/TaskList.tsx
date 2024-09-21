import { Task } from "../../App";
import TaskCard from "./TaskCard";

const TaskList : React.FC<{
    tasks : Task[],
    changeCallback:(id:number) => void | null, 
    removeCallback:(id:number) => void | null
}> = ({tasks, changeCallback, removeCallback}) => {
    const onChange = (id:number) => {
        if(changeCallback != null) changeCallback(id);
    }

    const onRemove = (id:number) => {
        if(removeCallback != null) removeCallback(id);
    }

    return (
        <div className="w-full h-full space-y-2 pt-2 px-5">
            {
                tasks.map((task, index) => (
                    <div key={index}>
                        <TaskCard 
                            task={task}
                            changeCallback={onChange}
                            removeCallback={onRemove}
                        />
                    </div>
                ))
            }
        </div>
    )
  }
  
  export default TaskList