import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonPage = () => {
  return (
    <div className="p-[29px] gap-2">
      <Skeleton count={1} className="h-[60px]"/>
      <Skeleton count={1} className="h-[15px] mt-8"/>
      <Skeleton count={2} className="h-[60px]"/>
      <Skeleton count={1} className="h-[15px] mt-8"/>
      <Skeleton count={3} className="h-[60px]"/>
    </div>
  );
};
