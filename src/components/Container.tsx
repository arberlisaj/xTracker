import { useMemo, useState } from "react";
import Task from "./Task";
import useTaskStore from "../data/store";

type Props = {
  state: string;
};
const Container = ({ state }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [addTaskWindowState, setAddTaskWindowState] = useState(false);
  const { tasks, addTask } = useTaskStore();
  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.state === state),
    [tasks, state]
  );
  const setDraggedTask = useTaskStore((store) => store.setDraggedTask);
  const draggedTask = useTaskStore((store) => store.draggedTask);
  const moveTask = useTaskStore((store) => store.moveTask);

  return (
    <section
      className="bg-gray-200 min-h-[20rem] w-[300px]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        const dragged = tasks.filter((task) => task.id == draggedTask)[0].title;
        moveTask(draggedTask, dragged, state);
        setDraggedTask(0);
      }}
    >
      <button
        className="border border-white m-1 w-full p-1"
        onClick={() => setAddTaskWindowState(true)}
      >
        add task
      </button>
      <p>{state}</p>
      {filteredTasks.map((task) => (
        <Task key={task.id} title={task.title} id={task.id} />
      ))}
      {addTaskWindowState && (
        <div>
          <input
            type="text"
            value={inputValue}
            autoFocus
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={() => {
              addTask(Date.now(), inputValue, state);
              setInputValue("");
              setAddTaskWindowState(false);
            }}
          >
            add
          </button>
        </div>
      )}
    </section>
  );
};

export default Container;
