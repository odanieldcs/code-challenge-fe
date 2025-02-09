import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoPricetagsOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { useFloating, autoUpdate } from '@floating-ui/react';

import { useTagStore } from '@/stores/tag-store';
import { TagInput } from '@/components/tag-input';

import { TagSelectorProps } from './tag-selector.types';

export const TagSelector = ({
  selectedTags,
  setSelectedTags,
}: TagSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { tags } = useTagStore();

  const {
    refs,
    floatingStyles,
  } = useFloating({
    open: isOpen,
    whileElementsMounted: autoUpdate,
    onOpenChange(isOpen) {
      setIsOpen(isOpen);
    },
    placement: 'top-end',
  });

  return (
    <div className="hidden group-hover:block cursor-pointer">
      <button
        type="button"
        ref={refs.setReference}
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoPricetagsOutline size={16} className="text-primary-on-primary hover:text-secondary-hover" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <div
            className="mt-2 w-56"
            ref={refs.setFloating}
            style={floatingStyles}
          >
            <motion.div
              transition={{ duration: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              initial={{ opacity: 0, scale: 0.7 }}
              className="flex flex-col items-center bg-primary shadow-lg p-4 rounded-md gap-2"
            >
              {(selectedTags.length > 0 || tags.length > 0) && (
                <TagInput
                  allTags={tags}
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />
              )}

              {(selectedTags.length === 0 && tags.length === 0) && (
                <p className="text-primary-on-primary text-lg font-semibold mt-4">
                  Nenhuma tag criada ainda
                </p>
              )}

              <Link
                to="/tags"
                className="bg-secondary hover:bg-secondary-hover text-white p-2 rounded-full text-xs w-full text-center mt-2"
              >
                Criar mais tags
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};