import toast from 'react-hot-toast';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { useTagStore } from '@/stores/tag-store';

import TagsPage from './index';

vi.mock('@/stores/tag-store', () => ({
  useTagStore: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
    success: vi.fn(),
    loading: vi.fn(),
  },
  Toaster: () => <div data-testid="toaster" />,
}));

vi.mock('@/components/input', () => ({
  Input: vi.fn(({ value, onChange, handleEnter, placeholder }) => (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
    />
  )),
}));

vi.mock('./components/tag-list', () => ({
  TagList: () => <div data-testid="tag-list" />,
}));

vi.mock('./components/skeleton', () => ({
  SkeletonPage: () => <div data-testid="skeleton-page" />,
}));

describe('TagsPage', () => {
  const mockFetchTags = vi.fn();
  const mockAddTag = vi.fn();
  const mockUpdateTagInput = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTagStore as any).mockReturnValue({
      tags: [],
      tagInput: '',
      loading: false,
      addTag: mockAddTag,
      fetchTags: mockFetchTags,
      updateTagInput: mockUpdateTagInput,
    });
  });

  it('renders the TagsPage component', () => {
    render(
      <MemoryRouter>
        <TagsPage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('+ Adicione uma tag a lista. Pressione Enter para salvar.')).toBeInTheDocument();
    expect(screen.getByTestId('tag-list')).toBeInTheDocument();
  });

  it('calls fetchTags on mount', () => {
    render(
      <MemoryRouter>
        <TagsPage />
      </MemoryRouter>
    );

    expect(mockFetchTags).toHaveBeenCalled();
  });

  it('displays a warning when trying to add an empty tag', () => {
    render(
      <MemoryRouter>
        <TagsPage />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText('+ Adicione uma tag a lista. Pressione Enter para salvar.');
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(toast.error).toHaveBeenCalledWith('Você não pode adicionar uma tag vazia');
  });

  it('adds a tag when Enter is pressed and input is not empty', () => {
    (useTagStore as any).mockReturnValue({
      tags: [],
      loading: false,
      addTag: mockAddTag,
      tagInput: 'New Tag',
      fetchTags: mockFetchTags,
      updateTagInput: mockUpdateTagInput,
    });

    render(
      <MemoryRouter>
        <TagsPage />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText('+ Adicione uma tag a lista. Pressione Enter para salvar.');
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockAddTag).toHaveBeenCalledWith('New Tag');
    expect(mockUpdateTagInput).toHaveBeenCalledWith('');
  });

  it('renders the SkeletonPage when loading is true', () => {
    (useTagStore as any).mockReturnValue({
      tags: [],
      tagInput: '',
      loading: true,
      addTag: mockAddTag,
      fetchTags: mockFetchTags,
      updateTagInput: mockUpdateTagInput,
    });

    render(
      <MemoryRouter>
        <TagsPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('skeleton-page')).toBeInTheDocument();
  });
});