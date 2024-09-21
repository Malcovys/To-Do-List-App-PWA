import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "../ui/animated-modal";

const TaskCreator: React.FC = () => {
  /* Component states and datas */

  /* Component behaviors */

  /* Component render */
  return (
    <div>
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
                <label htmlFor="task-input">To-do</label>
                <input className="h-10 border-l-2"
                    type="text" 
                    name="task-input" 
                    id="task-input" 
                />
            </ModalContent>
            <ModalFooter className="gap-4">
                <button className="px-2 py-1 bg-gray-200 text-black border border-gray-300 rounded-md text-sm w-28">
                    Cancel
                </button>
                <button className="bg-black text-white text-sm px-2 py-1 rounded-md border border-black w-28">
                    Create
                </button>
            </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TaskCreator;