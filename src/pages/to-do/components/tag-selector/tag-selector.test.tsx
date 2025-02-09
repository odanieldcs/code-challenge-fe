import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Tag, useTagStore } from '@/stores/tag-store';

import { TagSelector } from './index';

vi.mock('@/stores/tag-store', () => ({
  useTagStore: vi.fn(),
}));

vi.mock('@/components/tag-input', () => ({
  TagInput: vi.fn(({ selectedTags }) => (
    <div data-testid="tag-input">
      {selectedTags.map((tag: Tag) => (
        <span key={tag.id}>{tag.title}</span>
      ))}
    </div>
  )),
}));

describe('TagSelector', () => {
  const mockTags = [
    { id: '1', title: 'Tag1', color: '#4691E8' },
    { id: '2', title: 'Tag2', color: '#DDE4F1' },
  ];

  const defaultProps = {
    selectedTags: [],
    setSelectedTags: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useTagStore as any).mockReturnValue({
      tags: mockTags,
    });
  });

  it('renders the TagSelector component', () => {
    render(
      <MemoryRouter>
        <TagSelector {...defaultProps} />
      </MemoryRouter>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens the tag selector when the button is clicked', () => {
    render(
      <MemoryRouter>
        <TagSelector {...defaultProps} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
  });

  it('displays "Nenhuma tag criada ainda" when there are no tags', () => {
    (useTagStore as any).mockReturnValue({
      tags: [],
    });

    render(
      <MemoryRouter>
        <TagSelector {...defaultProps} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('Nenhuma tag criada ainda')).toBeInTheDocument();
  });

  it('renders the "Criar mais tags" link', () => {
    render(
      <MemoryRouter>
        <TagSelector {...defaultProps} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const linkElement = screen.getByRole('link', { name: 'Criar mais tags' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/tags');
  });
});
