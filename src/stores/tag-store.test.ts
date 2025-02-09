import toast from 'react-hot-toast';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';

import { tagService } from '@/services/tag-service';

import { useTagStore } from './tag-store';

vi.mock('@/services/tag-service');
vi.mock('react-hot-toast');

describe('useTagStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const { setState } = useTagStore;
    setState({ tags: [], tagInput: '', loading: false });
  });

  it('fetches tags successfully', async () => {
    const mockTags = [
      { id: '1', title: 'Tag1', color: '#4691E8' },
      { id: '2', title: 'Tag2', color: '#DDE4F1' },
    ];

    (tagService.getTags as Mock).mockResolvedValue(mockTags);

    const { fetchTags } = useTagStore.getState();

    await fetchTags();

    const { tags, loading } = useTagStore.getState();

    expect(tags).toEqual(mockTags);
    expect(loading).toBe(false);
  });

  it('adds a tag successfully', async () => {
    const mockTags = [
      { id: '1', title: 'Tag1', color: '#4691E8' },
      { id: '2', title: 'Tag2', color: '#DDE4F1' },
    ];
    (tagService.addTag as Mock).mockResolvedValue(mockTags);

    const { addTag } = useTagStore.getState();

    await addTag('New Tag');

    const { tags } = useTagStore.getState();

    expect(tags).toEqual(mockTags);
    expect(toast.loading).toHaveBeenCalledWith('Salvando...');
  });

  it('updates a tag successfully', async () => {
    const mockTags = [
      { id: '1', title: 'Updated Tag', color: '#4691E8' },
      { id: '2', title: 'Tag2', color: '#DDE4F1' },
    ];
    (tagService.updateTag as Mock).mockResolvedValue(mockTags);

    const { updateTag } = useTagStore.getState();

    await updateTag('1', { id: '1', title: 'Updated Tag', color: '#4691E8' });

    const { tags } = useTagStore.getState();

    expect(tags).toEqual(mockTags);
  });

  it('removes a tag successfully', async () => {
    const mockTags = [
      { id: '2', title: 'Tag2', color: '#DDE4F1' },
    ];
    (tagService.removeTag as Mock).mockResolvedValue(mockTags);

    const { removeTag } = useTagStore.getState();

    await removeTag('1');

    const { tags } = useTagStore.getState();

    expect(tags).toEqual(mockTags);
    expect(toast.success).toHaveBeenCalledWith('Tag excluída com sucesso!', { id: undefined });
  });

  it('updates tag input', () => {
    const { updateTagInput } = useTagStore.getState();

    updateTagInput('New Tag Input');

    const { tagInput } = useTagStore.getState();

    expect(tagInput).toBe('New Tag Input');
  });
});