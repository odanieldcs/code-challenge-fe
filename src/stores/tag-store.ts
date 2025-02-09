import { create } from 'zustand';
import toast from 'react-hot-toast';

import { tagService } from '@/services/tag-service';
import { fakeApiDelay } from '@/services/to-do-service';

export type Tag = {
  id: string;
  title: string;
  color: string;
};

type TagStore = {
  tags: Tag[];
  loading: boolean;
  tagInput: string;
  fetchTags: () => Promise<void>;
  updateTagInput: (value: string) => void;
  removeTag: (id: string) => Promise<void>;
  addTag: (tagName: string) => Promise<void>;
  updateTag: (id: string, newTag: Tag) => Promise<void>;
};

export const useTagStore = create<TagStore>((set) => ({
  tags: [],
  completedTags: [],
  incompleteTags: [],
  tagInput: '',
  loading: false,

  updateTagInput: (value: string) => set({ tagInput: value }),

  fetchTags: async () => {
    set({ loading: true });
    const tags = await tagService.getTags();
    set({
      tags,
      loading: false,
    });
  },

  addTag: async (tagName) => {
    const loadingToast = toast.loading('Salvando...');
    const updatedTags = await tagService.addTag(tagName);
    set({
      tags: updatedTags,
    });

    await fakeApiDelay();

    toast.success('Tag adicionada com sucesso!', { id: loadingToast });
  },

  updateTag: async (id, newTag: Tag) => {
    if (!newTag.title) return;

    const updatedTags = await tagService.updateTag(id, newTag);
    set({
      tags: updatedTags,
    });
  },

  removeTag: async (id) => {
    const loadingToast = toast.loading('Salvando...');
    const updatedTags = await tagService.removeTag(id);
    set({
      tags: updatedTags,
    });

    await fakeApiDelay();
    toast.success('Tag excluída com sucesso!', { id: loadingToast });
  },
}));
