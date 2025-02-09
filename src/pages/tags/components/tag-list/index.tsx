import { Link } from 'react-router-dom';
import { HiChevronLeft } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

import { useTagStore } from '@/stores/tag-store';

import { TagItem } from '../tag-item';

export const TagList = () => {
  const { tags } = useTagStore();

  return (
    <div className="mt-8">
      <div className="overflow-y-auto h-[calc(100vh-360px)] pr-2">
        <AnimatePresence>
          {tags.map(item => (
            <motion.div
              key={item.id}
              exit={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 10 }}
            >
              <TagItem
                id={item.id}
                key={item.id}
                title={item.title}
                color={item.color}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <Link
        to="/"
        className="mt-8 flex items-center gap-1 text-base text-checked hover:text-check-hover font-bold"
      >
        <HiChevronLeft size={30} />
        Voltar para TODO List
      </Link>
    </div>
  );
};