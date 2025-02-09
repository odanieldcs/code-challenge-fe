import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

import { Input } from '@/components/input';
import { useTagStore } from '@/stores/tag-store';

import { TagList } from './components/tag-list';
import { SkeletonPage } from './components/skeleton';

const notifyWarning = () => toast.error('Você não pode adicionar uma tag vazia');

const TagsPage = () => {
  const {
    loading,
    tags,
    addTag,
    tagInput,
    fetchTags,
    updateTagInput,
  } = useTagStore();

  useEffect(() => {
    fetchTags();
  }, []);

  const handleAddTag = () => {
    if (!tagInput) {
      notifyWarning();
      return;
    }
    addTag(tagInput);
    updateTagInput('');
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-background p-4 sm:p-0">
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[1280px] h-auto bg-white overflow-hidden rounded-[20px] drop-shadow transition-all duration-300 ease-in-out">
        <div className="bg-primary w-full h-[96px] text-primary-on-primary flex items-center gap-4 px-4 sm:px-[30px] text-xl sm:text-2xl font-bold rounded-t-[20px]">
          <IoMdCheckmarkCircleOutline size={36} className="text-success"/>
          Tag List
        </div>
        {!loading && (
          <div className="p-4 sm:p-[29px] flex flex-col">
            <Input
              size="lg"
              value={tagInput}
              variant="outlined"
              className="w-full"
              handleEnter={handleAddTag}
              onChange={value => updateTagInput(value)}
              placeholder="+ Adicione uma tag a lista. Pressione Enter para salvar."
            />
            {!tags.length && (
              <div className="flex-1 min-h-[300px] flex items-center justify-center">
                <p className="text-primary-on-primary text-lg font-semibold mt-4">
                  Nenhuma tag adicionada ainda
                </p>
              </div>
            )}
            <TagList />
          </div>
        )}
        {loading && <SkeletonPage />}
      </div>
      <Toaster
        reverseOrder={false}
        position="bottom-right"
      />
    </div>
  );
}

export default TagsPage;