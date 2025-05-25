import { useGetUserLinks } from '@/hooks/server/useGetUserLinks';
import { LinkRow } from './link-row';
import { LinkRowSkeleton } from './link-row-loading';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export const Links = () => {
  const { data: links, isPending } = useGetUserLinks();

  const [parent] = useAutoAnimate();

  if (isPending) {
    return (
      <div className=' border rounded-lg mb-10 w-full mx-auto bg-background'>
        <LinkRowSkeleton />
        <LinkRowSkeleton />
        <LinkRowSkeleton />
        <LinkRowSkeleton />
      </div>
    );
  }

  if (!isPending && links?.length === 0) {
    return null;
  }

  return (
    <div
      ref={parent}
      className=' border rounded-lg mb-10 mx-auto bg-background'
    >
      {links?.map((link) => (
        <LinkRow key={link.id} link={link} />
      ))}
    </div>
  );
};
