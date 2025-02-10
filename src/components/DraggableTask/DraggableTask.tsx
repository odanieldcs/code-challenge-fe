import React, { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { Task } from '../../store/todoStore';

const ItemType = {
    TASK: 'task',
};

interface DraggableTaskProps {
    task: Task;
    onDrop: (task: Task) => void;
    children: React.ReactNode;
}

export const DraggableTask: React.FC<DraggableTaskProps> = ({ task, onDrop, children }) => {
    const ref = useRef<HTMLLIElement>(null);

    const [{ isDragging }, drag] = useDrag({
        type: ItemType.TASK,
        item: { id: task.id, completed: task.completed },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemType.TASK,
        drop: (item: Task, monitor: DropTargetMonitor) => {
            if (!monitor.didDrop()) {
                onDrop(item);
            }
        },
    });

    drag(drop(ref));

    return (
        <li
            ref={ref}
            className={`flex justify-between items-center p-2 border-b border-stoneGray-400 min-h-15 ${isDragging ? 'opacity-50' : ''}`}
        >
            {children}
        </li>
    );
};