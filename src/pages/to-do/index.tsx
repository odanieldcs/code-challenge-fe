import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

import { Input } from '@/components/input';
import { useTagStore } from '@/stores/tag-store';
import { useTodoStore } from '@/stores/todo-store';

import { CheckList } from './components/check-list';
import { SkeletonPage } from './components/skeleton';

const notifyWarning = () => toast.error('Você não pode adicionar uma tarefa vazia');

const ToDoPage = () => {
  const {
    tasks,
    addTask,
    loading,
    taskInput,
    fetchTasks,
    completedTasks,
    incompleteTasks,
    updateTaskInput,
  } = useTodoStore();

  const { fetchTags } = useTagStore();

  useEffect(() => {
    fetchTags();
    fetchTasks();
  }, []);

  const handleAddTask = () => {
    if (!taskInput) {
      notifyWarning();
      return;
    }
    addTask(taskInput);
    updateTaskInput('');
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-background p-4 sm:p-0">
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[1280px] h-auto bg-white rounded-[20px] drop-shadow transition-all duration-300 ease-in-out">
        <div className="bg-primary w-full h-[96px] text-primary-on-primary flex items-center gap-4 px-4 sm:px-[30px] text-xl sm:text-2xl font-bold rounded-t-[20px]">
          <IoMdCheckmarkCircleOutline size={36} className="text-success"/>
          TODO List
        </div>
        {!loading && (
          <div className="p-4 sm:p-[29px] flex flex-col overflow-x-hidden overflow-y-auto h-[calc(100vh-360px)]">
            <Input
              autoFocus
              size="lg"
              value={taskInput}
              variant="outlined"
              className="w-full"
              handleEnter={handleAddTask}
              onChange={value => updateTaskInput(value)}
              placeholder="+ Adicione uma tarefa a lista. Pressione Enter para salvar."
            />
            {!tasks.length && (
              <div className="flex-1 min-h-[300px] flex items-center justify-center">
                <p className="text-primary-on-primary text-lg font-semibold mt-4">
                  Nenhuma tarefa adicionada ainda
                </p>
              </div>
            )}
            <CheckList
              isChecked={false}
              title="Para fazer"
              items={incompleteTasks}
            />
            <CheckList
              isChecked
              title="Concluído"
              items={completedTasks}
            />
          </div>
        )}
        {loading && <SkeletonPage />}
      </div>
      <Toaster
        reverseOrder={false}
        position="bottom-right"
      />
    </div>
  );
}

export default ToDoPage;