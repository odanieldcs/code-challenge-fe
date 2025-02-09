import { Tag } from '@/stores/tag-store';

const STORAGE_KEY = '@toDo/tags';

const fakeApiDelay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const tagService = {
  async getTags(fromService?: boolean): Promise<Tag[]> {
    if (!fromService) await fakeApiDelay();
    const tags = localStorage.getItem(STORAGE_KEY);
    return tags ? JSON.parse(tags) : [];
  },

  async addTag(tagName: string): Promise<Tag[]> {
    const tags = await tagService.getTags(true);

    const updatedTags = [...tags, {
      title: tagName,
      color: '#4691E8',
      id: Math.floor(10000 + Math.random() * 90000).toString(),
    }];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTags)); 
    return updatedTags;
  },

  async updateTag(id: string, newTag: Tag) {
    const tags = await tagService.getTags(true);
    const updatedTags = tags.map((tag) =>
      tag.id === id ? newTag : tag,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTags));
    return updatedTags;
  },

  async removeTag(id: string) {
    const tags = await tagService.getTags(true);
    const updatedTags = tags.filter((tag) => tag.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTags));
    return updatedTags;
  },
};
