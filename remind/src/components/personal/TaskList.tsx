import { Task } from "../../App";
import TaskCard from "./TaskCard";

const TaskList : React.FC<{tasks : Task[]}> = ({tasks}) => {

    return (
        <div className="w-full h-full space-y-2 pt-2 px-5">
            {
                tasks.map((task, index) => (
                    <div key={index}>
                        <TaskCard 
                            id={task.id}
                            title={task.title}
                            completed={task.completed}
                        />
                    </div>
                ))
            }
        </div>
    )
  }
  
  export default TaskList