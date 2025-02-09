import toast from 'react-hot-toast';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';

import { toDoService } from '@/services/to-do-service';

import { useTodoStore } from './todo-store';

vi.mock('@/services/to-do-service');
vi.mock('react-hot-toast');

describe('useTodoStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const { setState } = useTodoStore;
    setState({ tasks: [], taskInput: '', loading: false, completedTasks: [], incompleteTasks: [] });
  });

  it('fetches tasks successfully', async () => {
    const mockTasks = [
      { id: '1', title: 'Task1', completed: false, tags: [] },
      { id: '2', title: 'Task2', completed: true, tags: [] },
    ];
    (toDoService.getTasks as Mock).mockResolvedValue(mockTasks);

    const { fetchTasks } = useTodoStore.getState();

    await fetchTasks();

    const { tasks, completedTasks, incompleteTasks, loading } = useTodoStore.getState();

    expect(tasks).toEqual(mockTasks);
    expect(completedTasks).toEqual([mockTasks[1]]);
    expect(incompleteTasks).toEqual([mockTasks[0]]);
    expect(loading).toBe(false);
  });

  it('adds a task successfully', async () => {
    const mockTasks = [
      { id: '1', title: 'Task1', completed: false, tags: [] },
      { id: '2', title: 'Task2', completed: true, tags: [] },
    ];
    (toDoService.addTask as Mock).mockResolvedValue(mockTasks);

    const { addTask } = useTodoStore.getState();

    await addTask('New Task');

    const { tasks, completedTasks, incompleteTasks } = useTodoStore.getState();

    expect(tasks).toEqual(mockTasks);
    expect(completedTasks).toEqual([mockTasks[1]]);
    expect(incompleteTasks).toEqual([mockTasks[0]]);
    expect(toast.loading).toHaveBeenCalledWith('Salvando...');
    expect(toast.success).toHaveBeenCalledWith('Tarefa adicionada com sucesso!', { id: undefined });
  });

  it('updates a task successfully', async () => {
    const mockTasks = [
      { id: '1', title: 'Updated Task', completed: false, tags: [] },
      { id: '2', title: 'Task2', completed: true, tags: [] },
    ];
    (toDoService.updateTask as Mock).mockResolvedValue(mockTasks);

    const { updateTask } = useTodoStore.getState();

    await updateTask('1', { id: '1', title: 'Updated Task', completed: false, tags: [] });

    const { tasks, completedTasks, incompleteTasks } = useTodoStore.getState();

    expect(tasks).toEqual(mockTasks);
    expect(completedTasks).toEqual([mockTasks[1]]);
    expect(incompleteTasks).toEqual([mockTasks[0]]);
  });

  it('toggles a task successfully', async () => {
    const mockTasks = [
      { id: '1', title: 'Task1', completed: true, tags: [] },
      { id: '2', title: 'Task2', completed: false, tags: [] },
    ];
    (toDoService.toggleTask as Mock).mockResolvedValue(mockTasks);

    const { toggleTask } = useTodoStore.getState();

    await toggleTask('1');

    const { tasks, completedTasks, incompleteTasks } = useTodoStore.getState();

    expect(tasks).toEqual(mockTasks);
    expect(completedTasks).toEqual([mockTasks[0]]);
    expect(incompleteTasks).toEqual([mockTasks[1]]);
  });

  it('removes a task successfully', async () => {
    const mockTasks = [
      { id: '2', title: 'Task2', completed: false, tags: [] },
    ];
    (toDoService.removeTask as Mock).mockResolvedValue(mockTasks);

    const { removeTask } = useTodoStore.getState();

    await removeTask('1');

    const { tasks, completedTasks, incompleteTasks } = useTodoStore.getState();

    expect(tasks).toEqual(mockTasks);
    expect(completedTasks).toEqual([]);
    expect(incompleteTasks).toEqual(mockTasks);
    expect(toast.loading).toHaveBeenCalledWith('Salvando...');
    expect(toast.success).toHaveBeenCalledWith('Tarefa excluída com sucesso!', { id: undefined });
  });

  it('updates task input', () => {
    const { updateTaskInput } = useTodoStore.getState();

    updateTaskInput('New Task Input');

    const { taskInput } = useTodoStore.getState();

    expect(taskInput).toBe('New Task Input');
  });
});