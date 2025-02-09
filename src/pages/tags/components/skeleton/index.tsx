import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonPage = () => {
  return (
    <div className="p-[29px] gap-2">
      <Skeleton
        count={1}
        className="h-[60px] mb-8"
      />
      <Skeleton
        count={3}
        className="h-[54px]"
      />
    </div>
  );
};
