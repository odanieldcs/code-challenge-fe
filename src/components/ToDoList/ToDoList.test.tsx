import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToDoList } from './ToDoList';
import { useToDoStore, Task } from '../../store/todoStore';
import { useDrop } from 'react-dnd';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../store/todoStore', () => ({
    useToDoStore: vi.fn(),
    Task: vi.fn(),
}));

vi.mock('../DraggableTask', () => ({
    DraggableTask: ({ children }: { children: React.ReactNode }) => <div data-testid="draggable-task">{children}</div>,
}));

vi.mock('react-dnd', () => ({
    useDrop: vi.fn(() => [{}, vi.fn()])
}));

vi.mock('../ui/Checkbox', () => ({
    Checkbox: ({ checked, onChange, label }: { checked: boolean, onChange: () => void, label: string }) => (
        <div data-testid="checkbox-container">
            <input type="checkbox" checked={checked} onChange={onChange} data-testid="checkbox" />
            <label>{label}</label>
        </div>
    )
}));

describe('ToDoList Component', () => {
    const mockTasks: Task[] = [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: false },
        { id: 3, title: 'Task 3', completed: true },
    ];
    const mockOnDrop = vi.fn();
    const mockFetchTasks = vi.fn();
    const mockMarkTaskComplete = vi.fn();
    const mockMarkTaskIncomplete = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        (useToDoStore as any).mockReturnValue({
            tasks: mockTasks,
            fetchTasks: mockFetchTasks,
            markTaskComplete: mockMarkTaskComplete,
            markTaskIncomplete: mockMarkTaskIncomplete,
        });
    });

    it('renders the "Para fazer" heading', () => {
        render(<ToDoList onDrop={mockOnDrop} />);
        expect(screen.getByText('Para fazer')).toBeInTheDocument();
    });

    it('fetches tasks on mount', () => {
        render(<ToDoList onDrop={mockOnDrop} />);
        expect(mockFetchTasks).toHaveBeenCalledTimes(1);
    });

    it('renders the correct number of incomplete tasks', () => {
        render(<ToDoList onDrop={mockOnDrop} />);
        const taskElements = screen.getAllByTestId('draggable-task');
        expect(taskElements.length).toBe(2);
    });

    it('renders task titles correctly', () => {
        render(<ToDoList onDrop={mockOnDrop} />);
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.queryByText('Task 3')).not.toBeInTheDocument();
    });

    it('calls markTaskComplete when an incomplete task checkbox is clicked', () => {
        render(<ToDoList onDrop={mockOnDrop} />);
        const checkbox = screen.getAllByTestId('checkbox')[0] as HTMLInputElement;
        fireEvent.click(checkbox);
        expect(mockMarkTaskComplete).toHaveBeenCalledWith(mockTasks[0].id);
        expect(mockMarkTaskIncomplete).not.toHaveBeenCalled();
    });

    it('calls onDrop when a task is dropped', () => {
        render(<ToDoList onDrop={mockOnDrop} />);

        const dropFunction = (useDrop as any).mock.calls[0][0].drop;

        const droppedItem = { id: 4, title: 'Dropped Task', completed: false };
        dropFunction(droppedItem);

        expect(mockOnDrop).toHaveBeenCalledWith(droppedItem);
    });
});