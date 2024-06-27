import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Task {
  id: number;
  title: string;
  description: string;
  state: string;
  date: string;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  draggedTask: number;
  setDraggedTask: (id: number) => void;
  moveTask: (task: Task) => void;
}

const useTaskStore = create<TaskStore>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        draggedTask: 0,
        addTask: (task) =>
          set((store) => ({
            tasks: [...store.tasks, task],
          })),
        deleteTask: (id) =>
          set((store) => ({
            tasks: store.tasks.filter((task) => task.id !== id),
          })),
        setDraggedTask: (id) => set({ draggedTask: id }),
        moveTask: ({ id, title, description, state, date }) =>
          set((store) => ({
            tasks: store.tasks.map((task) =>
              task.id == id ? { id, title, description, state, date } : task
            ),
          })),
      }),
      { name: "tasks" }
    )
  )
);

export default useTaskStore;
