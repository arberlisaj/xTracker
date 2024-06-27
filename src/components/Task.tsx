import useTaskStore from "@/store";
import classNames from "classnames";
import { AiOutlineDelete } from "react-icons/ai";

const Task = ({ id }: { id: number }) => {
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const setDraggedTask = useTaskStore((s) => s.setDraggedTask);

  const task = useTaskStore((store) =>
    store.tasks.find((task) => task.id === id)
  );

  return (
    <article
      className={classNames(
        "p-2 rounded-sm cursor-move mb-1 shadow-md border",
        {
          "border-l-4 border-green-500": task?.state === "Completed",
          "border-l-4 border-blue-400": task?.state === "In Progress",
          "border-l-4 border-orange-400": task?.state === "In Review",
          "border-l-4 border-gray-400": task?.state === "Planned",
        }
      )}
      draggable
      onDragStart={() => setDraggedTask(id)}
    >
      <p className="break-words font-[500] text-gray-600">
        {task?.title.substring(0, 50)}
      </p>
      <p className="break-words text-gray-600">
        {task?.description.substring(0, 265)}
      </p>
      <footer className="relative flex items-center justify-between pt-1 mt-1 text-sm border-t border-gray-200">
        <p
          className={classNames({
            "text-gray-500": task?.state === "Planned",
            "text-blue-500": task?.state === "In Progress",
            "text-orange-500": task?.state === "In Review",
            "text-green-500": task?.state === "Completed",
          })}
        >
          {task?.date}
        </p>
        <button className="mt-0.5 text-lg" onClick={() => deleteTask(id)}>
          <AiOutlineDelete />
        </button>
      </footer>
    </article>
  );
};

export default Task;
