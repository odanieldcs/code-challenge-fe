import { create } from 'zustand';
import toast from 'react-hot-toast';

import { Tag } from '@/stores/tag-store';
import { fakeApiDelay, toDoService } from '@/services/to-do-service';

export type Task = {
  id: string;
  tags: Tag[];
  title: string;
  completed: boolean;
};

type TodoStore = {
  tasks: Task[];
  loading: boolean;
  taskInput: string;
  completedTasks: Task[];
  incompleteTasks: Task[];
  fetchTasks: () => Promise<void>;
  updateTaskInput: (value: string) => void;
  setLoading: (newLoading: boolean) => void;
  toggleTask: (id: string) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  addTask: (taskName: string) => Promise<void>;
  updateCompletedTasks: (newTasks: Task[]) => void;
  updateImcompleteTasks: (newTasks: Task[]) => void;
  updateTask: (id: string, newTask: Task) => Promise<void>;
};

export const useTodoStore = create<TodoStore>((set) => ({
  tasks: [],
  taskInput: '',
  loading: false,
  completedTasks: [],
  incompleteTasks: [],

  setLoading: (newLoading) => set({ loading: newLoading }),
  updateTaskInput: (value: string) => set({ taskInput: value }),
  updateCompletedTasks: (newTasks: Task[]) => set({ completedTasks: newTasks }),
  updateImcompleteTasks: (newTasks: Task[]) => set({ incompleteTasks: newTasks }),

  fetchTasks: async () => {
    set({ loading: true });
    const tasks = await toDoService.getTasks();
    const completedTasks = tasks.filter((task) => task.completed);
    const incompleteTasks = tasks.filter((task) => !task.completed);
    set({
      tasks,
      completedTasks,
      incompleteTasks,
      loading: false,
    });
  },

  addTask: async (taskName) => {
    const loadingToast = toast.loading('Salvando...');
    const updatedTasks = await toDoService.addTask(taskName);
    const completedTasks = updatedTasks.filter((task) => task.completed);
    const incompleteTasks = updatedTasks.filter((task) => !task.completed);
    set({
      tasks: updatedTasks,
      completedTasks,
      incompleteTasks,
    });

    await fakeApiDelay();

    toast.success('Tarefa adicionada com sucesso!', { id: loadingToast });
  },

  updateTask: async (id, newTask: Task) => {
    if (!newTask.title) return;

    const updatedTasks = await toDoService.updateTask(id, newTask);
    const completedTasks = updatedTasks.filter((task) => task.completed);
    const incompleteTasks = updatedTasks.filter((task) => !task.completed);
    set({
      tasks: updatedTasks,
      completedTasks,
      incompleteTasks,
    });
  },

  toggleTask: async (id) => {
    const updatedTasks = await toDoService.toggleTask(id);
    const completedTasks = updatedTasks.filter((task) => task.completed);
    const incompleteTasks = updatedTasks.filter((task) => !task.completed);
    set({
      tasks: updatedTasks,
      completedTasks,
      incompleteTasks,
    });
  },

  removeTask: async (id) => {
    const loadingToast = toast.loading('Salvando...');
    const updatedTasks = await toDoService.removeTask(id);
    const completedTasks = updatedTasks.filter((task) => task.completed);
    const incompleteTasks = updatedTasks.filter((task) => !task.completed);
    set({
      tasks: updatedTasks,
      completedTasks,
      incompleteTasks,
    });

    await fakeApiDelay();

    toast.success('Tarefa excluída com sucesso!', { id: loadingToast });
  },
}));
