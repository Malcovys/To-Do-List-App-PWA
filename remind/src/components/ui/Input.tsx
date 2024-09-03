import { useEffect, useState } from "react";

const Input : React.FC<{callback:(input:string) => void}> = ({callback}) => {
    const minimalCharacter = 3;
    const buttonStyle = {
        "default" : "py-1 px-2 rounded-2xl bg-slate-500 bg-opacity-10",
        "submitable" : "py-1 px-2 rounded-2xl bg-slate-900 hover:bg-slate-800"
    }
    const [inputIsValide, setInputIsValide] = useState<boolean>(false);
    const [characters, setCharacters] = useState<string>("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCharacters(e.target.value);
    }

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(inputIsValide)
        {
            callback(characters);
        }
    }

    useEffect(() => {
        if(characters.length >= minimalCharacter)
        {
            setInputIsValide(true);
        } 
        else 
        {
            setInputIsValide(false);
        }
    }, [characters])

    return (
        <form
            className="flex flex-row w-full"
            onSubmit={onSubmit}
        >
            <input
                className="w-full px-3 py-2 border-solid rounded-full focus:outline-none bg-secondary mx-2 font-medium text-slate-600"
                type="text" 
                name="task-input" 
                id="task-input"
                placeholder="Aa"
                onChange={handleChange}
            />
            <button className={inputIsValide ? buttonStyle.submitable : buttonStyle.default}>
                <span>{inputIsValide ? "👌" : "✍️"}</span>
            </button>
        </form>
    )
}

export default Input