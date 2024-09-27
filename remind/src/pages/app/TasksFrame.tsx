
const TasksFrame = ({ count }: {count:number}) => {
  const tasks = Array.from({ length: count }, (_, index) => ({
    id: index,
  }));

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="shadow-lg rounded-md p-4 w-full">
          <div className="animate-pulse flex space-x-4 items-center mb-2">
            <div className="rounded-sm bg-slate-200 h-8 w-8"></div>
            <div className="h-2 bg-slate-200 rounded w-full"></div>
            <div className="rounded-full bg-slate-200 h-9 w-9"></div>
          </div>
        </div>
        )
      )}
    </div>
  );
};

export default TasksFrame;
