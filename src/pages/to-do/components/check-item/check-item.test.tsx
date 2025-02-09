import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Tag } from '@/stores/tag-store';
import { useTodoStore } from '@/stores/todo-store';

import { CheckItem } from './index';

vi.mock('@/stores/todo-store', () => ({
  useTodoStore: vi.fn(),
}));

vi.mock('@/components/input', () => ({
  Input: vi.fn(({ value, onChange }) => (
    <input value={value} onChange={(e) => onChange(e.target.value)} />
  )),
}));

vi.mock('@/components/checkbox', () => ({
  Checkbox: vi.fn(({ checked, toggleCheckbox }) => (
    <input type="checkbox" checked={checked} onChange={toggleCheckbox} />
  )),
}));

vi.mock('@/pages/to-do/components/tag-selector', () => ({
  TagSelector: vi.fn(({ selectedTags, setSelectedTags }) => (
    <div data-testid="tag-selector">
      {selectedTags.map((tag: Tag) => (
        <span key={tag.id}>{tag.title}</span>
      ))}
      <button onClick={() => setSelectedTags([])}>Clear Tags</button>
    </div>
  )),
}));

describe('CheckItem', () => {
  const mockToggleTask = vi.fn();
  const mockUpdateTask = vi.fn();
  const mockRemoveTask = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTodoStore as any).mockReturnValue({
      toggleTask: mockToggleTask,
      updateTask: mockUpdateTask,
      removeTask: mockRemoveTask,
    });
  });

  const defaultProps = {
    id: '1',
    title: 'Test Task',
    isChecked: false,
    tags: [{ id: '1', title: 'Tag1', color: '#4691E8' }],
  };

  it('calls toggleTask when the checkbox is clicked', () => {
    render(<CheckItem {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockToggleTask).toHaveBeenCalledWith('1');
  });

  it('calls updateTask when the title is changed', () => {
    render(<CheckItem {...defaultProps} />);
    const input = screen.getByDisplayValue('Test Task');
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    expect(mockUpdateTask).toHaveBeenCalledWith('1', { id: '1', title: 'Updated Task', completed: false, tags: defaultProps.tags });
  });

  it('calls updateTask when tags are updated', () => {
    render(<CheckItem {...defaultProps} />);
    const clearTagsButton = screen.getByText('Clear Tags');
    fireEvent.click(clearTagsButton);
    expect(mockUpdateTask).toHaveBeenCalledWith('1', { id: '1', title: 'Test Task', completed: false, tags: [] });
  });
});