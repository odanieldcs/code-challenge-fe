import { describe, it, expect, beforeEach, vi } from 'vitest';

import { Tag } from '@/stores/tag-store';

import { tagService } from './tag-service';

const STORAGE_KEY = '@toDo/tags';

const mockTags: Tag[] = [
  { id: '1', title: 'Tag1', color: '#4691E8' },
  { id: '2', title: 'Tag2', color: '#DDE4F1' },
];

describe('tagService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('fetches tags successfully', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTags));

    const tags = await tagService.getTags();

    expect(tags).toEqual(mockTags);
  });

  it('adds a tag successfully', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTags));

    const newTagName = 'New Tag';
    const updatedTags = await tagService.addTag(newTagName);

    expect(updatedTags).toHaveLength(3);
    expect(updatedTags[2].title).toBe(newTagName);
    expect(updatedTags[2].color).toBe('#4691E8');
    expect(updatedTags[2].id).toBeDefined();
  });

  it('updates a tag successfully', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTags));

    const updatedTag: Tag = { id: '1', title: 'Updated Tag', color: '#FF7F7F' };
    const updatedTags = await tagService.updateTag('1', updatedTag);

    expect(updatedTags).toHaveLength(2);
    expect(updatedTags[0]).toEqual(updatedTag);
  });

  it('removes a tag successfully', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTags));

    const updatedTags = await tagService.removeTag('1');

    expect(updatedTags).toHaveLength(1);
    expect(updatedTags[0].id).toBe('2');
  });

  it('returns an empty array if no tags are found', async () => {
    const tags = await tagService.getTags();

    expect(tags).toEqual([]);
  });
});
