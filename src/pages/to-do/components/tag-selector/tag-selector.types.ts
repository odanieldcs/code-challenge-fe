import { Tag } from '@/stores/tag-store';

export type TagSelectorProps = {
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
};
