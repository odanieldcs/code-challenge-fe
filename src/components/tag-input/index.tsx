import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { FiXCircle } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';

import { Tag } from '@/stores/tag-store';
import { getTextColor } from '@/utils/get-text-color';
import { TagInputProps } from '@/components/tag-input/tag-input.types';

const notifyWarning = () => toast.error('Você só pode selecionar 3 tags');

export const TagInput: React.FC<TagInputProps> = ({
  allTags,
  selectedTags,
  setSelectedTags,
}) => {
  const availableTags = useMemo(() => {
    return allTags.filter((tag) => !selectedTags.some((selectedTag) => selectedTag.id === tag.id));
  }, [allTags, selectedTags]);

  const handleToggleTag = (tag: Tag) => {
    const isSelected = selectedTags.some((selectedTag) => selectedTag.id === tag.id);

    if (isSelected) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag.id !== tag.id));
    } else {
      if (selectedTags.length === 3) {
        notifyWarning();
        return;
      }
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div>
      <div>
        <div className="text-sm text-primary-on-primary">
          Tags selecionadas
        </div>
        <div className="flex items-center gap-2 flex-wrap mt-1 border-b border-checked pb-2 max-h-17 overflow-auto">
          <AnimatePresence>
            {selectedTags.map((tag) => (
              <motion.div
                key={tag.id}
                style={{ backgroundColor: tag.color, color: getTextColor(tag.color) }}
                className="text-xs text-white rounded-full px-2 py-1 flex items-center gap-1 justify-between"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  title={tag.title}
                  className="max-w-14 truncate flex-1"
                >
                  {tag.title}
                </span>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => handleToggleTag(tag)}
                >
                  <FiXCircle
                    size={12}
                    className="hover:opacity-70"
                    style={{ color: getTextColor(tag.color) }}
                  />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="text-sm text-primary-on-primary mt-2">
          Tags disponíveis
        </div>
        <div className="flex items-center gap-2 flex-wrap mt-1 max-h-17 overflow-auto pr-1">
          {availableTags.map((tag) => (
            <motion.div
              key={tag.id}
              title={tag.title}
              onClick={() => handleToggleTag(tag)}
              style={{ backgroundColor: tag.color, color: getTextColor(tag.color) }}
              className="text-xs rounded-full px-2 py-1 max-w-20 truncate"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {tag.title}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};