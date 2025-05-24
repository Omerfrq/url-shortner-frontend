import { Skeleton } from '@/components/ui/skeleton';

export const LinkRowSkeleton = () => {
  return (
    <div className='flex items-center justify-between p-4 border-b last:border-b-0'>
      <div className='flex items-center gap-2'>
        <div className='flex items-center'>
          {/* Avatar skeleton */}
          <Skeleton className='h-6 w-6 rounded-full mr-2' />
          {/* Short URL skeleton */}
          <Skeleton className='h-4 w-32' />
          {/* Copy button skeleton */}
          <Skeleton className='h-6 w-6 ml-1' />
        </div>
        {/* Arrow */}
        <span className='text-gray-300'>→</span>
        {/* Destination skeleton */}
        <Skeleton className='h-4 w-28' />
        {/* Time skeleton */}
        <Skeleton className='h-4 w-8' />
      </div>
      <div className='flex items-center gap-4'>
        {/* Clicks skeleton */}
        <Skeleton className='h-4 w-16' />
        {/* Menu button skeleton */}
        <Skeleton className='h-8 w-8' />
      </div>
    </div>
  );
};
