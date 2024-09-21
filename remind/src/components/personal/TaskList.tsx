import { Task } from "../../App";
import TaskCard from "./TaskCard";

const TaskList : React.FC<{
    tasks : Task[],
    changeCallback:(id:number) => void | null, 
    removeCallback:(id:number) => void | null
}> = ({tasks, changeCallback, removeCallback}) => {
    const onChange = (index:number) => {
        if(changeCallback != null) changeCallback(index);
    }

    const onRemove = (index:number) => {
        if(removeCallback != null) removeCallback(index);
    }

    return (
        <div className="w-full h-full space-y-2 pt-2 px-5">
            {
                tasks.map((task, index) => (
                    <div key={index}>
                        <TaskCard 
                            task={task}
                            index={index}
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