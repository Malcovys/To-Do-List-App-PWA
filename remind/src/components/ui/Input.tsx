import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useEffect, useState } from "react";

const Input : React.FC<{callback:(input:string) => void}> = ({callback}) => {
    const minimalCharacter = 1;
    const buttonStyle = {
        "default" : "py-1 px-2 rounded-2xl bg-slate-500 bg-opacity-10",
        "submitable" : "py-1 px-2 rounded-2xl bg-slate-900 hover:bg-slate-800"
    }

    const [inputIsValide, setInputIsValide] = useState<boolean>(false);
    const [characters, setCharacters] = useState<string>("");

    const [showEmojiPiker, setShowEmojiPiker] = useState<boolean>(false);


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
       setCharacters(e.target.value);
    }

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!inputIsValide) return;
        callback(characters);
        setCharacters("");
    }

    const handleEmojiPikerButton = () => {
        setShowEmojiPiker(!showEmojiPiker);
    }

    const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
        if(emojiData.emoji) {
            setCharacters(`${characters}  ${emojiData.emoji}`);
        }
        
        if(event.cancelable) setShowEmojiPiker(false);
    }

    useEffect(() => {
        if(characters.length >= minimalCharacter)
        {
            setInputIsValide(true);
            return;
        } 
        setInputIsValide(false);
    }, [characters])

    return (
        <form
            className="flex w-full flex-col absolute bottom-[12%] space-y-2"
            onSubmit={onSubmit}
        >
            <div className="w-full flex justify-end z-10">
                <EmojiPicker
                    className="mx-4"
                    open={showEmojiPiker}
                    onEmojiClick={onEmojiClick}
                />
            </div>
            <div className="w-full flex">
                <div className="flex w-full px-3 py-2 border-solid rounded-full bg-secondary mx-2">
                    <input
                        className="w-full focus:outline-none bg-secondary font-medium text-slate-600"
                        type="text" 
                        name="task-input" 
                        id="task-input"
                        placeholder="Aa"
                        value={characters}
                        onChange={handleChange}
                    />
                    <button
                        onClick={handleEmojiPikerButton}
                        type="button" 
                        className="w-7 border-solid rounded-full bg-slate-300 hover:bg-slate-400"
                    >🥸</button>

                </div>
                <button type="submit" className={inputIsValide ? buttonStyle.submitable : buttonStyle.default}>
                    <span>✈️</span>
                </button>
            </div>
        </form>
    )
}

export default Input