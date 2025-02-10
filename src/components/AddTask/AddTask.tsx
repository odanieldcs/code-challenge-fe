import React, { useState } from 'react';
import { useToDoStore } from '../../store/todoStore';

export const AddTask: React.FC = () => {
    const [title, setTitle] = useState('');
    const { addTask } = useToDoStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            addTask(title);
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-4 mb-6">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="+ Adicione uma tarefa à lista. Pressione Enter para salvar."
                className="flex-grow text-base text-stoneGray-700 border-2 bg-stoneGray-100 border-stoneGray-500 min-h-15 py-2 px-4 rounded-lg focus:outline-none"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit(e);
                    }
                }}
                data-testid="task-input"
            />
        </form>
    );
};
