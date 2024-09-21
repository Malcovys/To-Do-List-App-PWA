import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalProvider, ModalTrigger } from "../ui/animated-modal";

const TaskCreator: React.FC<{submitCallback:(input : string) => void | null }> = ({submitCallback}) => {
  /* Component states and datas */
  const minInputCharater = 2;
  const [inputValue, setInputValue] = useState(""); 
  const [validableInput, setValidableInput] = useState(false);
  const submitButtonStyle = {
    "unSubmitable" : "bg-black text-white text-sm px-2 py-1 rounded-md w-28 bg-opacity-10",
    "submitable" : "bg-black text-white text-sm px-2 py-1 rounded-md w-28 hover:bg-opacity-75"
  }

  /* Component behaviors */
  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!validableInput) return;

    if(submitCallback != null) submitCallback(inputValue);
    
    setInputValue("");
  }

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    if(inputValue.trim().length >= minInputCharater) {
      setValidableInput(true);
      return;
    } 
    setValidableInput(false);
  }, [inputValue])

  /* Component render */
  return (
    <form onSubmit={handleSubmit}>
      <ModalProvider>
        <Modal>
          <ModalTrigger className="bg-black text-white rounded-lg w-11 h-11 flex justify-center items-center">
            <span className="text-center text-3xl">+</span>
          </ModalTrigger>
          <ModalBody className="mx-2">
            <ModalContent>
              <h4 className="text-lg md:text-2xl text-neutral-600 font-bold text-center mb-8">
                Create new{" "}
                <span className="px-1 py-0.5 rounded-md bg-gray-100 border-gray-200">
                  Task
                </span>{" "}
                now! ✈️
              </h4>
              <label htmlFor="task-input" className="text-slate-500">To-do</label>
              <input className="h-10 border-l-2 font-medium"
                  type="text" 
                  name="task-input" 
                  id="task-input"
                  value={inputValue}
                  onChange={handleInputChange}
              />
            </ModalContent>
            <ModalFooter className="gap-4">
              <button className={validableInput ? submitButtonStyle.submitable : submitButtonStyle.unSubmitable}>
                Create
              </button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </ModalProvider>
    </form>
  );
};

export default TaskCreator;