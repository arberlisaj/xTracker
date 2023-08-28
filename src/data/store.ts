import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { TaskType } from "../components/Task";

interface TaskStore {
  tasks: TaskType[];
  addTask: (id: number, tile: string, state: string) => void;
  deleteTask: (id: number) => void;
  draggedTask: number;
  setDraggedTask: (id: number) => void;
  moveTask: (id: number, title: string, state: string) => void;
}

const useTaskStore = create<TaskStore>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        draggedTask: 0,
        addTask: (id, title, state) =>
          set((store) => ({ tasks: [...store.tasks, { id, title, state }] })),
        deleteTask: (id) =>
          set((store) => ({
            tasks: store.tasks.filter((task) => task.id !== id),
          })),
        setDraggedTask: (id) => set({ draggedTask: id }),
        moveTask: (id, title, state) =>
          set((store) => ({
            tasks: store.tasks.map((task) =>
              task.id == id ? { id, title, state } : task
            ),
          })),
      }),
      { name: "tasks" }
    )
  )
);

export default useTaskStore;
