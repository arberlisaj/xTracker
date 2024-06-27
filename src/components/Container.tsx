import useTaskStore from "@/store";
import classNames from "classnames";
import { useMemo, useState } from "react";
import Button from "./Button";
import Task from "./Task";
import TaskForm from "./TaskForm";
import getCurrentDate from "@/utils/getCurrentDate";

const Container = ({ state }: { state: string }) => {
  const [isDropping, setIsDropping] = useState(false);
  const [addTaskWindow, setAddTaskWindow] = useState(false);
  const { tasks, setDraggedTask, draggedTask, moveTask } = useTaskStore();

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.state === state),
    [tasks, state]
  );

  return (
    <section
      className="bg-white border-gray-300 border w-[305px] h-fit p-2 rounded-sm shadow-md"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDropping(true);
      }}
      onDragLeave={() => setIsDropping(false)}
      onDrop={() => {
        setIsDropping(false);
        const { title, description } = tasks.filter(
          (task) => task.id === draggedTask
        )[0];
        moveTask({
          id: draggedTask,
          title,
          description,
          state,
          date: getCurrentDate,
        });
        setDraggedTask(0);
      }}
    >
      <header className="flex items-center justify-between pb-2 border-b border-gray-300">
        <p
          className={classNames("font-[500]", {
            "text-gray-700": state === "Planned",
            "text-blue-700": state === "In Progress",
            "text-orange-700": state === "In Review",
            "text-green-700": state === "Completed",
          })}
        >
          {state}
        </p>
        <Button
          title="addButton"
          type="button"
          className="py-1"
          handleClick={() => setAddTaskWindow((value) => !value)}
        >
          Create
        </Button>
      </header>

      <section
        className={classNames("mt-2", {
          "outline-2 outline-dotted outline-gray-400": isDropping == true,
        })}
      >
        {!filteredTasks.length && (
          <p className="pb-1 pl-0.5 text-sm">No tasks.</p>
        )}
        {filteredTasks.map((task) => (
          <Task key={task.id} id={task.id} />
        ))}
      </section>

      {addTaskWindow && (
        <TaskForm
          status={state}
          setTaskState={(value) => setAddTaskWindow(value)}
        />
      )}
    </section>
  );
};

export default Container;
