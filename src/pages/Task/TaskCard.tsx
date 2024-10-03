import { useState } from "react";
import { MagicCard } from "../../components/magicui/magic-card";
import { Task } from "./interface/Task";

const TaskCard: React.FC<{
  task:Task,
  index: number,
  changeCallback:(index:number) => void | null, 
  removeCallback:(index:number) => void | null
}> = ({task, index, changeCallback, removeCallback}) => {
  const [completed, setCompleted] = useState(task.completed);


  const handleChange = () => {
    setCompleted(!task.completed);
    if(changeCallback != null) changeCallback(index);
  }

  const handleRemove = () => {
    if(removeCallback != null) removeCallback(index);
  }

  return (
    <div className="h-20">
        <MagicCard
            className="bg-white cursor-pointer items-center shadow-lg whitespace-nowrap"
            gradientColor={"#D9D9D955"}
        >
          <div className="content flex items-center px-5">
            <div className="w-[70vw] sm:w-[82vw] md:w-[85vw] lg:w-[90vw] flex items-center">
              <input
                className="mr-5 size-5"
                type="checkbox" 
                name="task" 
                id={`${index}`}
                checked={completed}
                onChange={handleChange}
              />
              <label 
                htmlFor={`${index}`} 
                className={completed ? "line-through text-xl":"text-xl"}
              >{task.label}</label>
            </div>
            <button
              className="text-red-600 hover:bg-slate-200 p-2 rounded-lg"
              onClick={handleRemove}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
              </svg>
              </button>
          </div>
        </MagicCard>
    </div>
  );
};

export default TaskCard;