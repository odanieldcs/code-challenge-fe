import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TagInput } from './index';
import { Tag } from '@/stores/tag-store';

const allTags: Tag[] = [
  { id: '1', title: 'Tag1', color: '#4691E8' },
  { id: '2', title: 'Tag2', color: '#DDE4F1' },
  { id: '3', title: 'Tag3', color: '#FF7F7F' },
  { id: '4', title: 'Tag4', color: '#220529' },
];

describe('TagInput Component', () => {
  it('renders selected tags', () => {
    const selectedTags = [allTags[0]];
    render(<TagInput allTags={allTags} selectedTags={selectedTags} setSelectedTags={() => {}} />);
    const selectedTagElement = screen.getByText('Tag1');
    expect(selectedTagElement).toBeInTheDocument();
  });

  it('renders available tags', () => {
    const selectedTags = [allTags[0]];
    render(<TagInput allTags={allTags} selectedTags={selectedTags} setSelectedTags={() => {}} />);
    const availableTagElement = screen.getByText('Tag2');
    expect(availableTagElement).toBeInTheDocument();
  });

  it('calls setSelectedTags when a tag is clicked', () => {
    const setSelectedTagsMock = vi.fn();
    const selectedTags = [allTags[0]];
    render(<TagInput allTags={allTags} selectedTags={selectedTags} setSelectedTags={setSelectedTagsMock} />);
    const availableTagElement = screen.getByText('Tag2');
    fireEvent.click(availableTagElement);
    expect(setSelectedTagsMock).toHaveBeenCalled();
  });

  it('removes a tag when the remove button is clicked', () => {
    const setSelectedTagsMock = vi.fn();
    const selectedTags = [allTags[0]];
    render(<TagInput allTags={allTags} selectedTags={selectedTags} setSelectedTags={setSelectedTagsMock} />);
    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);
    expect(setSelectedTagsMock).toHaveBeenCalled();
  });

  it('displays a warning when trying to select more than 3 tags', () => {
    const setSelectedTagsMock = vi.fn();
    const selectedTags = [allTags[0], allTags[1], allTags[2]];
    render(<TagInput allTags={allTags} selectedTags={selectedTags} setSelectedTags={setSelectedTagsMock} />);
    const availableTagElement = screen.getByText('Tag4');
    fireEvent.click(availableTagElement);
    expect(setSelectedTagsMock).not.toHaveBeenCalled();
  });
});
