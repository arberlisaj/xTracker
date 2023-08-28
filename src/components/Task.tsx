import useTaskStore from "../data/store";

export interface TaskType {
  id:number
  title: string;
  state?: string;
}
const Task = ({id}: TaskType) => {
  const deleteTask = useTaskStore((store) => store.deleteTask);
  const task = useTaskStore((store) =>
    store.tasks.find((task) => task.id=== id)
  );
  const setDraggedTask = useTaskStore((store) => store.setDraggedTask);
  
  return (
    <article
      className="bg-red-100 p-2 cursor-move mb-2"
      draggable
      onDragStart={() => setDraggedTask(id)}
    >
      <p>{task?.title}</p>
      <button onClick={() => deleteTask(id)}>delete</button>
      <div className="status">{task?.state}</div>
    </article>
  );
};

export default Task;
