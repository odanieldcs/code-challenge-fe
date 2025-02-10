import React from 'react';
import { ToDoList } from '../../components/ToDoList';
import { AddTask } from '../../components/AddTask';
import { CompletedTasks } from '../../components/CompletedTasks';
import { Navbar } from '../../components/Navbar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useToDoStore } from '../../store/todoStore';

export const Home: React.FC = () => {
    const { markTaskComplete, markTaskIncomplete } = useToDoStore();

    const handleDrop = (item: { id: number, completed: boolean }, targetList: 'todo' | 'completed') => {
        if (targetList === 'todo' && item.completed) {
            markTaskIncomplete(item.id);
        } else if (targetList === 'completed' && !item.completed) {
            markTaskComplete(item.id);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-full min-h-screen max-h-full p-4 flex justify-center items-center bg-stoneGray-100">
                <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden">
                    <Navbar />
                    <div className='p-7.5'>
                        <AddTask />
                        <div className="flex flex-col space-y-6">
                            <ToDoList onDrop={(item) => handleDrop(item, 'todo')} />
                            <CompletedTasks onDrop={(item) => handleDrop(item, 'completed')} />
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};