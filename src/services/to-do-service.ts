import { Task } from '@/stores/todo-store';

const STORAGE_KEY = '@toDo/tasks';

export const fakeApiDelay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const toDoService = {
  async getTasks(fromService?: boolean): Promise<Task[]> {
    if (!fromService) await fakeApiDelay();
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  },

  async addTask(taskName: string): Promise<Task[]> {
    const tasks = await toDoService.getTasks(true);

    const updatedTasks = [...tasks, {
      tags: [],
      title: taskName,
      completed: false,
      id: Math.floor(10000 + Math.random() * 90000).toString(),
    }];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    return updatedTasks;
  },

  async toggleTask(id: string) {
    const tasks = await toDoService.getTasks(true);
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    return updatedTasks;
  },

  async updateTask(id: string, newTask: Task) {
    const tasks = await toDoService.getTasks(true);
    const updatedTasks = tasks.map((task) =>
      task.id === id ? newTask : task,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    return updatedTasks;
  },

  async removeTask(id: string) {
    const tasks = await toDoService.getTasks(true);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    return updatedTasks;
  },
};
