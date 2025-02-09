import { Tag } from '@/stores/tag-store';

export type CheckItemProps = {
  id: string;
  tags: Tag[];
  title: string;
  isChecked: boolean;
}
