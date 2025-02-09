import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

import { useTodoStore } from '@/stores/todo-store';
import { CheckListProps } from '@/pages/to-do/components/check-list/check-list.types';

import { CheckList } from './index';

vi.mock('@/stores/todo-store', () => ({
  useTodoStore: vi.fn(),
}));

vi.mock('../check-item', () => ({
  CheckItem: vi.fn(({ title }) => (
    <div data-testid="check-item">
      <span>{title}</span>
    </div>
  )),
}));

describe('CheckList', () => {
  const mockUpdateCompletedTasks = vi.fn();
  const mockUpdateImcompleteTasks = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTodoStore as any).mockReturnValue({
      updateCompletedTasks: mockUpdateCompletedTasks,
      updateImcompleteTasks: mockUpdateImcompleteTasks,
    });
  });

  const defaultProps = {
    title: 'Test List',
    items: [
      {
        id: '1',
        tags: [],
        title: 'Task 1',
        completed: false,
      },
      {
        id: '2',
        tags: [],
        title: 'Task 2',
        completed: false,
      },
    ],
    isChecked: false,
  } as CheckListProps;

  it('renders the CheckList component', () => {
    render(<CheckList {...defaultProps} />);
    expect(screen.getByText('Test List')).toBeInTheDocument();
    expect(screen.getAllByTestId('check-item')).toHaveLength(defaultProps.items.length);
  });

  it('does not render anything if items are empty', () => {
    render(<CheckList {...defaultProps} items={[]} />);
    expect(screen.queryByText('Test List')).not.toBeInTheDocument();
  });
});
