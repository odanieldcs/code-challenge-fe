import React, { useEffect, useRef } from 'react';
import { useToDoStore, Task } from '../../store/todoStore';
import { DraggableTask } from '../DraggableTask';
import { useDrop } from 'react-dnd';
import { Checkbox } from '../ui/Checkbox';

const ItemType = {
    TASK: 'task',
};

interface ToDoListProps {
    onDrop: (item: { id: number, completed: boolean }) => void;
}

export const ToDoList: React.FC<ToDoListProps> = ({ onDrop }) => {
    const { tasks, fetchTasks, markTaskComplete, markTaskIncomplete } = useToDoStore();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleDrop = (item: { id: number, completed: boolean }) => {
        onDrop(item);
    };

    const handleCheckboxChange = (task: Task) => {
        if (task.completed) {
            markTaskIncomplete(task.id);
        } else {
            markTaskComplete(task.id);
        }
    };

    const [, drop] = useDrop({
        accept: ItemType.TASK,
        drop: (item: { id: number, completed: boolean }) => {
            handleDrop(item);
        },
    });

    drop(ref);

    return (
        <div ref={ref} className="rounded-lg">
            <h2 className="text-xs font-bold mb-3.75 text-stoneGray-700">Para fazer</h2>
            <ul className="space-y-2">
                {tasks.filter(task => !task.completed).map((task: Task) => (
                    <DraggableTask key={task.id} task={task} onDrop={handleDrop}>
                        <Checkbox
                            checked={task.completed}
                            onChange={() => handleCheckboxChange(task)}
                            label={task.title}
                        />
                    </DraggableTask>
                ))}
            </ul>
        </div>
    );
};