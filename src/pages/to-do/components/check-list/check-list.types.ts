import { Task } from '@/stores/todo-store';

export type CheckListProps = {
  title: string;
  items: Task[];
  isChecked: boolean;
}
