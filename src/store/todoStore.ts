import { create } from 'zustand';
import { loadFromStorage, saveToStorage } from '../utils/storage';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface ToDoState {
  tasks: Task[];
  fetchTasks: () => void;
  addTask: (title: string) => void;
  markTaskComplete: (id: number) => void;
  markTaskIncomplete: (id: number) => void;
}

const STORAGE_KEY = 'todo_tasks';

export const useToDoStore = create<ToDoState>((set) => ({
  tasks: [],
  fetchTasks: () => {
    const tasks = loadFromStorage<Task[]>(STORAGE_KEY, []);
    set({ tasks });
  },
  addTask: (title: string) => {
    set((state) => {
      const newTask = { id: Date.now(), title, completed: false };
      const updatedTasks = [...state.tasks, newTask];
      saveToStorage(STORAGE_KEY, updatedTasks);
      return { tasks: updatedTasks };
    });
  },
  markTaskComplete: (id: number) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      );
      saveToStorage(STORAGE_KEY, updatedTasks);
      return { tasks: updatedTasks };
    });
  },
  markTaskIncomplete: (id: number) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: false } : task
      );
      saveToStorage(STORAGE_KEY, updatedTasks);
      return { tasks: updatedTasks };
    });
  },
}));
