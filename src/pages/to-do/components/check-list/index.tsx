import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

import { useTodoStore } from '@/stores/todo-store';

import { CheckItem } from '../check-item';
import { CheckListProps } from './check-list.types';

export const CheckList = ({
  title,
  items,
  isChecked,
}: CheckListProps) => {
  const {
    updateCompletedTasks,
    updateImcompleteTasks,
  } = useTodoStore();
  if (!items.length) return <></>;

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((t) => t.id === active.id);
      const newIndex = items.findIndex((t) => t.id === over.id);

      if (isChecked) {
        updateCompletedTasks(arrayMove(items, oldIndex, newIndex));
      } else {
        updateImcompleteTasks(arrayMove(items, oldIndex, newIndex));
      }
    }
  }

  return (
    <div className="mt-4 sm:mt-[43px]">
      <div className="text-xs sm:text-sm text-checked font-bold">
        {title}
      </div>
      <div>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((t) => t.id)}>
            <div className="mt-4 sm:mt-5">
              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={item.id}
                    exit={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    initial={{ opacity: 0, y: 10 }}
                  >
                    <CheckItem
                      id={item.id}
                      tags={item.tags}
                      title={item.title}
                      isChecked={isChecked}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};