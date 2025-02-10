import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CompletedTasks } from './CompletedTasks';
import { Task } from '../../store/todoStore';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const mockTasks: Task[] = [
    { id: 1, title: 'Tarefa 1', completed: true },
    { id: 2, title: 'Tarefa 2', completed: true },
];

const mockMarkTaskIncomplete = vi.fn();

vi.mock('../../store/todoStore', () => ({
    useToDoStore: () => ({
        tasks: mockTasks,
        markTaskIncomplete: mockMarkTaskIncomplete,
    }),
    Task: vi.fn(),
}));

vi.mock('../DraggableTask', () => ({
    DraggableTask: ({ children }: any) => <div data-testid="draggable-task">{children}</div>,
}));

vi.mock('../ui/Checkbox', () => {
    return {
        Checkbox: ({ checked, onChange, label, ...rest }: any) => (
            <div data-testid="checkbox-container">
                <input type="checkbox" checked={checked} onChange={onChange} {...rest} data-testid="checkbox" />
                <label>{label}</label>
            </div>
        ),
    };
});

describe('component :: CompletedTasks', () => {
    it('should render completed tasks', () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <CompletedTasks onDrop={vi.fn()} />
            </DndProvider>
        );
        expect(screen.getByText('Concluído')).toBeInTheDocument();
        expect(screen.getAllByTestId('draggable-task').length).toBeGreaterThan(0);
    });

    it('should call onTaskToggle when checkbox is clicked', () => {
        const mockOnTaskToggle = vi.fn();
        render(
            <DndProvider backend={HTML5Backend}>
                <CompletedTasks onDrop={vi.fn()} onTaskToggle={mockOnTaskToggle} />
            </DndProvider>
        );

        const checkbox = screen.getAllByTestId('checkbox')[0] as HTMLInputElement;
        fireEvent.click(checkbox);

        expect(mockOnTaskToggle).toHaveBeenCalled();
        expect(mockOnTaskToggle).toHaveBeenCalledWith(mockTasks[0].id);
    });

    it('should render and allow drag and drop (basic check)', () => {
        const mockOnDrop = vi.fn();
        render(
            <DndProvider backend={HTML5Backend}>
                <CompletedTasks onDrop={mockOnDrop} />
            </DndProvider>
        );

        expect(screen.getAllByTestId('draggable-task').length).toBeGreaterThan(0);
        expect(screen.getByTestId('completed-tasks-container')).toBeInTheDocument();
    });
});
