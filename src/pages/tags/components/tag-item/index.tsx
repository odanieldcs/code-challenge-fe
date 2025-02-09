import { IoMdTrash } from 'react-icons/io';

import { Input } from '@/components/input';
import { useTagStore } from '@/stores/tag-store';
import { ColorPicker } from '@/components/color-picker';

import { TagItemProps } from './tag-item.types';

export const TagItem = ({
  id,
  title,
  color,
}: TagItemProps) => {
  const {
    updateTag,
    removeTag,
  } = useTagStore();

  return (
    <div className="group flex items-center justify-between h-[60px] border-b border-separator hover:bg-input pr-1">
      <div className="flex flex-1 items-center gap-[15px] pl-2">
        <ColorPicker
          value={color}
          onChange={newColor => updateTag(id, { id, title, color: newColor })}
        />
        <Input
          size="sm"
          value={title}
          className="flex-1"
          variant="transparent"
          onChange={newValue => updateTag(id, { id, title: newValue, color })}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => removeTag(id)}
          className="hidden group-hover:block cursor-pointer"
        >
          <IoMdTrash size={21} className="text-danger hover:text-danger-hover" />
        </button>
      </div>
    </div>
  )
};