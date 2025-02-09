import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useTagStore } from '@/stores/tag-store';

import { TagList } from './index';

vi.mock('@/stores/tag-store', () => ({
  useTagStore: vi.fn(),
}));

vi.mock('../tag-item', () => ({
  TagItem: vi.fn(({ title, color }) => (
    <div data-testid="tag-item">
      <span>{title}</span>
      <span>{color}</span>
    </div>
  )),
}));

describe('TagList', () => {
  const mockTags = [
    { id: '1', title: 'Tag1', color: '#4691E8' },
    { id: '2', title: 'Tag2', color: '#DDE4F1' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useTagStore as any).mockReturnValue({
      tags: mockTags,
    });
  });

  it('renders the tag list', () => {
    render(
      <MemoryRouter>
        <TagList />
      </MemoryRouter>
    );

    const tagItems = screen.getAllByTestId('tag-item');
    expect(tagItems).toHaveLength(mockTags.length);
  });

  it('renders the "Voltar para TODO List" link', () => {
    render(
      <MemoryRouter>
        <TagList />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link', { name: 'Voltar para TODO List' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});