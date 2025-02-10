import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { AddTask } from './AddTask';
import { useToDoStore } from '../../store/todoStore';

vi.mock('../../store/todoStore', () => {
    const mockAddTask = vi.fn();
    return {
        useToDoStore: () => ({
            addTask: mockAddTask,
        }),
    };
});

describe('component :: AddTask', () => {
    it('should add a task when the form is submitted', () => {
        render(<AddTask />);

        const inputElement = screen.getByTestId('task-input') as HTMLInputElement;
        const taskTitle = 'Nova tarefa';

        fireEvent.change(inputElement, { target: { value: taskTitle } });
        fireEvent.submit(inputElement);

        expect(useToDoStore().addTask).toHaveBeenCalledWith(taskTitle);
        expect(inputElement.value).toBe('');
    });

    it('should not add a task if the input is empty', () => {
        render(<AddTask />);

        const inputElement = screen.getByTestId('task-input') as HTMLInputElement;

        fireEvent.submit(inputElement);

        expect(useToDoStore().addTask).not.toHaveBeenCalled();
    });

    it('should add a task when enter key is pressed', () => {
        render(<AddTask />);

        const inputElement = screen.getByTestId('task-input') as HTMLInputElement;
        const taskTitle = 'Nova tarefa enter';

        fireEvent.change(inputElement, { target: { value: taskTitle } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(useToDoStore().addTask).toHaveBeenCalledWith(taskTitle);
        expect(inputElement.value).toBe('');
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });
});
