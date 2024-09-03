import Input from "../../components/ui/Input"

function Home() {
    const onSubmit = (input : string) => {
        console.log(input);
    }

    return (
        <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
            <Input callback={onSubmit}/>
        </div>
    )
  }
  
  export default Home