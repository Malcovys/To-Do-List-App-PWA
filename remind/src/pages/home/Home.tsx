import Input from "../../components/ui/Input"
import Card from "../../components/ui/Card";
import { useState } from "react";

interface Task {
    id: number,
    tile: string,
    create_at: Date,
    update_at: Date,
    isDone: boolean
}

function Home() {
    const [tasks, setTask] = useState<Task[]>();

    const onSubmit = (input : string) => {
        console.log(input);
    }

    return (
        <div className="mx-auto h-[calc(100dvh)] flex flex-col items-center space-y-2">
            <div id="card-container" className="w-full h-full space-y-2 pt-2">
                <Card text="Task" />
                <Card text="Task" />
                <Card text="Task" />
            </div>
            <div className="w-full flex justify-center items-center bg-white">
                <Input callback={onSubmit}/>
            </div>
        </div>
    )
  }
  
  export default Home