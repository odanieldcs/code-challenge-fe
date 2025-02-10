import { render, screen } from '@testing-library/react';
import { DraggableTask } from './DraggableTask';
import { useDrag, useDrop } from 'react-dnd';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Task } from '../../store/todoStore';

vi.mock('react-dnd', () => ({
    useDrag: vi.fn(),
    useDrop: vi.fn(),
}));

const mockTask: Task = { id: 1, title: 'Test Task', completed: false };
const mockOnDrop = vi.fn();

describe('DraggableTask', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        (useDrag as any).mockReturnValue([{ isDragging: false }, vi.fn()]);

        (useDrop as any).mockReturnValue([{}, vi.fn()]);
    });

    it('renders children correctly', () => {
        render(
            <DraggableTask task={mockTask} onDrop={mockOnDrop}>
                <div>Test Child</div>
            </DraggableTask>
        );
        expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    it('calls useDrag with correct arguments', () => {
        render(
            <DraggableTask task={mockTask} onDrop={mockOnDrop}>
                <div>Test Child</div>
            </DraggableTask>
        );

        expect(useDrag).toHaveBeenCalledWith({
            type: 'task',
            item: { id: mockTask.id, completed: mockTask.completed },
            collect: expect.any(Function),
        });
    });

    it('calls useDrop with correct arguments', () => {
        render(
            <DraggableTask task={mockTask} onDrop={mockOnDrop}>
                <div>Test Child</div>
            </DraggableTask>
        );

        expect(useDrop).toHaveBeenCalledWith({
            accept: 'task',
            drop: expect.any(Function),
        });
    });

    it('applies opacity when isDragging is true', () => {
        (useDrag as any).mockReturnValue([{ isDragging: true }, vi.fn()]);

        render(
            <DraggableTask task={mockTask} onDrop={mockOnDrop}>
                <div>Test Child</div>
            </DraggableTask>
        );

        const listItem = screen.getByRole('listitem');
        expect(listItem).toHaveClass('opacity-50');
    });

    it('calls onDrop when drop occurs and monitor.didDrop() is false', () => {
        (useDrop as any).mockReturnValue([{}, vi.fn()]);

        render(
            <DraggableTask task={mockTask} onDrop={mockOnDrop}>
                <div>Test Child</div>
            </DraggableTask>
        );

        const dropFunction = (useDrop as any).mock.calls[0][0].drop;

        dropFunction({ id: 2, title: 'Test Task', completed: true }, { didDrop: () => false });

        expect(mockOnDrop).toHaveBeenCalledWith({ id: 2, title: 'Test Task', completed: true });
    });

    it('does not call onDrop when monitor.didDrop() is true', () => {
        (useDrop as any).mockReturnValue([{}, vi.fn()]);

        render(
            <DraggableTask task={mockTask} onDrop={mockOnDrop}>
                <div>Test Child</div>
            </DraggableTask>
        );

        const dropFunction = (useDrop as any).mock.calls[0][0].drop;
        dropFunction({ id: 2, title: 'Test Task', completed: true }, { didDrop: () => true });

        expect(mockOnDrop).not.toHaveBeenCalled();
    });

});