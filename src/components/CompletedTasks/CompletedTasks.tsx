import React, { useRef } from 'react';
import { useToDoStore, Task } from '../../store/todoStore';
import { DraggableTask } from '../DraggableTask';
import { useDrop } from 'react-dnd';
import { Checkbox } from '../ui/Checkbox';

const ItemType = {
    TASK: 'task',
};

interface CompletedTasksProps {
    onDrop: (item: { id: number; completed: boolean }) => void;
    onTaskToggle?: (taskId: number) => void;
}

export const CompletedTasks: React.FC<CompletedTasksProps> = ({ onDrop, onTaskToggle }) => {
    const { tasks, markTaskIncomplete } = useToDoStore();
    const ref = useRef<HTMLDivElement>(null);

    const handleDrop = (item: { id: number; completed: boolean }) => {
        onDrop(item);
    };

    const handleToggle = (taskId: number) => {
        if (onTaskToggle) {
            onTaskToggle(taskId);
        } else {
            markTaskIncomplete(taskId);
        }
    };

    const [, drop] = useDrop({
        accept: ItemType.TASK,
        drop: (item: { id: number; completed: boolean }) => {
            handleDrop(item);
        },
    });

    drop(ref);

    return (
        <div ref={ref} className="rounded-lg" data-testid="completed-tasks-container">
            <h2 className="text-xs font-bold mb-3.75 text-stoneGray-700">Concluído</h2>
            <ul className="space-y-2" data-testid="completed-tasks-list">
                {tasks &&
                    tasks
                        .filter((task) => task.completed)
                        .map((task: Task) => (
                            <DraggableTask key={task.id} task={task} onDrop={handleDrop}>
                                <Checkbox
                                    checked={task.completed}
                                    onChange={() => handleToggle(task.id)}
                                    label={task.title}
                                    data-testid={`task-checkbox-${task.id}`}
                                />
                            </DraggableTask>
                        ))}
            </ul>
        </div>
    );
};
