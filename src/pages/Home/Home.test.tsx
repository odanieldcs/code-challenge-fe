import { render, screen } from '@testing-library/react';
import { Home } from './Home';
import { useToDoStore } from '../../store/todoStore';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ToDoList } from '../../components/ToDoList';
import { CompletedTasks } from '../../components/CompletedTasks';

vi.mock('../../store/todoStore', () => ({
    useToDoStore: vi.fn(),
}));

vi.mock('../../components/ToDoList', () => ({
    ToDoList: vi.fn(),
}));

vi.mock('../../components/CompletedTasks', () => ({
    CompletedTasks: vi.fn(),
}));

vi.mock('../../components/AddTask', () => ({
    AddTask: () => <div data-testid="addtask">AddTask</div>,
}));

vi.mock('../../components/Navbar', () => ({
    Navbar: () => <div data-testid="navbar">Navbar</div>
}));

describe('Home Component', () => {
    const mockMarkTaskComplete = vi.fn();
    const mockMarkTaskIncomplete = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        (useToDoStore as any).mockReturnValue({
            markTaskComplete: mockMarkTaskComplete,
            markTaskIncomplete: mockMarkTaskIncomplete,
        });
    });

    it('renders Navbar, AddTask, ToDoList, and CompletedTasks', () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <Home />
            </DndProvider>
        );

        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('addtask')).toBeInTheDocument();
        expect(ToDoList).toHaveBeenCalled();
        expect(CompletedTasks).toHaveBeenCalled();
    });

    it('calls markTaskIncomplete when dropping a completed task on ToDoList', () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <Home />
            </DndProvider>
        );

        const onDropToDoList = (ToDoList as any).mock.calls[0][0].onDrop;

        const completedTask = { id: 1, completed: true };
        onDropToDoList(completedTask);

        expect(mockMarkTaskIncomplete).toHaveBeenCalledWith(completedTask.id);
        expect(mockMarkTaskComplete).not.toHaveBeenCalled();
    });

    it('calls markTaskComplete when dropping an incomplete task on CompletedTasks', () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <Home />
            </DndProvider>
        );

        const onDropCompletedTasks = (CompletedTasks as any).mock.calls[0][0].onDrop;

        const incompletedTask = { id: 2, completed: false };
        onDropCompletedTasks(incompletedTask);

        expect(mockMarkTaskComplete).toHaveBeenCalledWith(incompletedTask.id);
        expect(mockMarkTaskIncomplete).not.toHaveBeenCalled();
    });
});
