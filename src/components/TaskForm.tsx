import useTaskStore from "@/store";
import { useEffect, useRef } from "react";
import Button from "./Button";
import getCurrentDate from "@/utils/getCurrentDate";

interface Props {
  setTaskState: (value: boolean) => void;
  status: string;
}

const TaskForm = ({ setTaskState, status }: Props) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  const handleEscKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") setTaskState(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  });

  const addTask = useTaskStore((store) => store.addTask);

  const handleSubmit = () => {
    if (titleRef.current && descRef.current) {
      if (
        titleRef.current.value.length > 2 &&
        descRef.current.value.length > 5
      ) {
        const newTask = {
          id: Date.now(),
          title: titleRef.current.value,
          description: descRef.current.value,
          state: status,
          date: getCurrentDate,
        };
        addTask(newTask);
        setTaskState(false);
      }
    }
  };
  return (
    <div
      onClick={() => setTaskState(false)}
      className="absolute top-0 left-0 h-screen w-screen bg-[#282828b9] grid place-content-center z-50"
    >
      <div
        className="p-5 px-8 bg-white rounded shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-lg font-[500] text-black mb-1">{status}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-1.5 pb-2 "
        >
          <input
            placeholder="Title... (at least 3 characters)"
            type="text"
            autoFocus
            required
            ref={titleRef}
          />
          <input
            placeholder="Description... (at least 6 characters)"
            type="text"
            required
            ref={descRef}
          />
          <Button type="submit" title="submitButton">
            Create Task
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
