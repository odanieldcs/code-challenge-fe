import { describe, it, expect, beforeEach, vi } from 'vitest';

import { Task } from '@/stores/todo-store';

import { toDoService } from './to-do-service';

const STORAGE_KEY = '@toDo/tasks';

const mockTasks: Task[] = [
  { id: '1', title: 'Task1', completed: false, tags: [] },
  { id: '2', title: 'Task2', completed: true, tags: [] },
];

describe('toDoService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('fetches tasks successfully', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks));

    const tasks = await toDoService.getTasks();

    expect(tasks).toEqual(mockTasks);
  });

  it('adds a task successfully', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks));

    const newTaskName = 'New Task';
    const updatedTasks = await toDoService.addTask(newTaskName);

    expect(updatedTasks).toHaveLength(3);
    expect(updatedTasks[2].title).toBe(newTaskName);
    expect(updatedTasks[2].completed).toBe(false);
    expect(updatedTasks[2].id).toBeDefined();
  });

  it('toggles a task successfully', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks));

    const updatedTasks = await toDoService.toggleTask('1');

    expect(updatedTasks[0].completed).toBe(true);
    expect(updatedTasks[1].completed).toBe(true);
  });

  it('updates a task successfully', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks));

    const updatedTask: Task = { id: '1', title: 'Updated Task', completed: false, tags: [] };
    const updatedTasks = await toDoService.updateTask('1', updatedTask);

    expect(updatedTasks).toHaveLength(2);
    expect(updatedTasks[0]).toEqual(updatedTask);
  });

  it('removes a task successfully', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks));

    const updatedTasks = await toDoService.removeTask('1');

    expect(updatedTasks).toHaveLength(1);
    expect(updatedTasks[0].id).toBe('2');
  });

  it('returns an empty array if no tasks are found', async () => {
    const tasks = await toDoService.getTasks();

    expect(tasks).toEqual([]);
  });
});