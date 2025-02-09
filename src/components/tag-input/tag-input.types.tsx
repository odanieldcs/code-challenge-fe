import { Tag } from '@/stores/tag-store';

export type TagInputProps = {
  allTags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
}
