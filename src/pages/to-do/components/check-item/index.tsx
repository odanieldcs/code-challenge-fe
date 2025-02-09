import { CSS } from '@dnd-kit/utilities';
import { IoMdTrash } from 'react-icons/io';
import { useSortable } from '@dnd-kit/sortable';
import { MdDragIndicator } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

import { Input } from '@/components/input';
import { Checkbox } from '@/components/checkbox';
import { useTodoStore } from '@/stores/todo-store';
import { getTextColor } from '@/utils/get-text-color';
import { TagSelector } from '@/pages/to-do/components/tag-selector';

import { CheckItemProps } from './check-item.types';

export const CheckItem = ({
  id,
  tags,
  title,
  isChecked,
}: CheckItemProps) => {
  const {
    toggleTask,
    updateTask,
    removeTask,
  } = useTodoStore();

  const {
    listeners,
    transform,
    transition,
    attributes,
    setNodeRef,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="group flex items-center justify-between h-[60px] border-b border-separator hover:bg-input gap-1 p-2 sm:p-0"
    >
      <div className="flex flex-1 items-center gap-2 sm:gap-[15px] min-w-0">
        <button
          {...listeners}
          className="cursor-grab"
        >
          <MdDragIndicator className="text-separator"/>
        </button>
        <Checkbox
          checked={isChecked}
          toggleCheckbox={() => toggleTask(id)}
        />
        {!isChecked && (
          <Input
            size="sm"
            value={title}
            className="flex-1 min-w-0"
            variant="transparent"
            onChange={newValue => updateTask(id, { id, title: newValue, completed: isChecked, tags })}
          />
        )}
        {isChecked && (
          <div className="flex-1 min-w-0">
            <div
              title={title}
              className="text-base text-checked line-through truncate"
            >
              {title}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center gap-1">
          <AnimatePresence>
            {tags?.map(tag => (
              <motion.div
                key={tag.id}
                title={tag.title}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                style={{ backgroundColor: tag.color, color: getTextColor(tag.color) }}
                className="text-xs text-white rounded-full px-2 py-1 max-w-20 truncate"
              >
                {tag.title}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="items-center gap-2 pr-2 hidden group-hover:flex">
          <TagSelector
            selectedTags={tags}
            setSelectedTags={(newTags) => updateTask(id, { id, title, completed: isChecked, tags: newTags })}
          />
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => removeTask(id)}
            data-testid="remove-task-button"
          >
            <IoMdTrash size={21} className="text-danger hover:text-danger-hover" />
          </button>
        </div>
      </div>
    </div>
  )
};