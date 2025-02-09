import toast from 'react-hot-toast';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { useTagStore } from '@/stores/tag-store';
import { Task, useTodoStore } from '@/stores/todo-store';

import ToDoPage from './index';

vi.mock('@/stores/tag-store', () => ({
  useTagStore: vi.fn(),
}));

vi.mock('@/stores/todo-store', () => ({
  useTodoStore: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
    success: vi.fn(),
    loading: vi.fn(),
  },
  Toaster: () => <div data-testid="toaster" />,
}));

vi.mock('@/components/input', () => ({
  Input: vi.fn(({ value, onChange, handleEnter, placeholder }) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
      placeholder={placeholder}
    />
  )),
}));

vi.mock('./components/check-list', () => ({
  CheckList: vi.fn(({ title, items }) => (
    <div data-testid="check-list">
      <span>{title}</span>
      {items.map((item: Task) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  )),
}));

vi.mock('./components/skeleton', () => ({
  SkeletonPage: () => <div data-testid="skeleton-page" />,
}));

describe('ToDoPage', () => {
  const mockFetchTags = vi.fn();
  const mockFetchTasks = vi.fn();
  const mockAddTask = vi.fn();
  const mockUpdateTaskInput = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTagStore as any).mockReturnValue({
      fetchTags: mockFetchTags,
    });
    (useTodoStore as any).mockReturnValue({
      tasks: [],
      addTask: mockAddTask,
      loading: false,
      taskInput: '',
      fetchTasks: mockFetchTasks,
      completedTasks: [],
      incompleteTasks: [],
      updateTaskInput: mockUpdateTaskInput,
    });
  });

  it('renders the ToDoPage component', () => {
    render(
      <MemoryRouter>
        <ToDoPage />
      </MemoryRouter>
    );

    expect(screen.getByText('TODO List')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+ Adicione uma tarefa a lista. Pressione Enter para salvar.')).toBeInTheDocument();
  });

  it('calls fetchTags and fetchTasks on mount', () => {
    render(
      <MemoryRouter>
        <ToDoPage />
      </MemoryRouter>
    );

    expect(mockFetchTags).toHaveBeenCalled();
    expect(mockFetchTasks).toHaveBeenCalled();
  });

  it('displays a warning when trying to add an empty task', () => {
    render(
      <MemoryRouter>
        <ToDoPage />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText('+ Adicione uma tarefa a lista. Pressione Enter para salvar.');
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(toast.error).toHaveBeenCalledWith('Você não pode adicionar uma tarefa vazia');
  });

  it('adds a task when Enter is pressed and input is not empty', () => {
    (useTodoStore as any).mockReturnValue({
      tasks: [],
      addTask: mockAddTask,
      loading: false,
      taskInput: 'New Task',
      fetchTasks: mockFetchTasks,
      completedTasks: [],
      incompleteTasks: [],
      updateTaskInput: mockUpdateTaskInput,
    });

    render(
      <MemoryRouter>
        <ToDoPage />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText('+ Adicione uma tarefa a lista. Pressione Enter para salvar.');
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockAddTask).toHaveBeenCalledWith('New Task');
    expect(mockUpdateTaskInput).toHaveBeenCalledWith('');
  });

  it('renders the SkeletonPage when loading is true', () => {
    (useTodoStore as any).mockReturnValue({
      tasks: [],
      addTask: mockAddTask,
      loading: true,
      taskInput: '',
      fetchTasks: mockFetchTasks,
      completedTasks: [],
      incompleteTasks: [],
      updateTaskInput: mockUpdateTaskInput,
    });

    render(
      <MemoryRouter>
        <ToDoPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('skeleton-page')).toBeInTheDocument();
  });

  it('renders the CheckList components with tasks', () => {
    (useTodoStore as any).mockReturnValue({
      tasks: [{ id: '1', title: 'Task 1', completed: false, tags: [] }],
      addTask: mockAddTask,
      loading: false,
      taskInput: '',
      fetchTasks: mockFetchTasks,
      completedTasks: [{ id: '2', title: 'Task 2', completed: true, tags: [] }],
      incompleteTasks: [{ id: '1', title: 'Task 1', completed: false, tags: [] }],
      updateTaskInput: mockUpdateTaskInput,
    });

    render(
      <MemoryRouter>
        <ToDoPage />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('check-list')).toHaveLength(2);
  });
});
