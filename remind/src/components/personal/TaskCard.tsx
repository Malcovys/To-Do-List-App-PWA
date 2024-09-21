import { MagicCard } from "../magicui/magic-card";

const TaskCard: React.FC<{id: number,title: string,completed: boolean}> = (task) => {

  return (
    <div className="flex h-20 w-full">
        <MagicCard
            className="bg-white cursor-pointer flex-col items-center justify-center shadow-lg whitespace-nowrap"
            gradientColor={"#D9D9D955"}
        >
            <span className={task.completed ? "line-through":""}>{task.title}</span>
        </MagicCard>
    </div>
  );
};

export default TaskCard;