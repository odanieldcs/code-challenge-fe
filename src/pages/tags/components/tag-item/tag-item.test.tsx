import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { useTagStore } from '@/stores/tag-store';

import { TagItem } from './index';

vi.mock('@/stores/tag-store', () => ({
  useTagStore: vi.fn(),
}));

vi.mock('@/components/input', () => ({
  Input: vi.fn(({ value, onChange }) => (
    <input value={value} onChange={(e) => onChange(e.target.value)} />
  )),
}));

vi.mock('@/components/color-picker', () => ({
  ColorPicker: vi.fn(({ value, onChange }) => (
    <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
  )),
}));

describe('TagItem', () => {
  const mockUpdateTag = vi.fn();
  const mockRemoveTag = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTagStore as any).mockReturnValue({
      updateTag: mockUpdateTag,
      removeTag: mockRemoveTag,
    });
  });

  it('renders the tag item', () => {
    render(<TagItem id="1" title="Tag1" color="#4691E8" />);
    expect(screen.getByDisplayValue('Tag1')).toBeInTheDocument();
  });

  it('calls updateTag when the title is changed', () => {
    render(<TagItem id="1" title="Tag1" color="#4691E8" />);
    const input = screen.getByDisplayValue('Tag1');
    fireEvent.change(input, { target: { value: 'New Tag' } });
    expect(mockUpdateTag).toHaveBeenCalledWith('1', { id: '1', title: 'New Tag', color: '#4691E8' });
  });

  it('calls removeTag when the delete button is clicked', () => {
    render(<TagItem id="1" title="Tag1" color="#4691E8" />);
    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);
    expect(mockRemoveTag).toHaveBeenCalledWith('1');
  });
});