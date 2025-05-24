import { Link, Outlet } from 'react-router-dom';

const Navigation = () => {
  return (
    <header className='sticky top-0 bg-background border-b backdrop-blur-md  dark:bg-background/80 z-10'>
      <div className='max-w-7xl mx-auto flex h-16 items-center p-3 lg:p-6 justify-between'>
        <Link to='/' className='flex items-center gap-2'>
          <span className='font-bold'>Company</span>
        </Link>
        <div className='flex items-center gap-4'>Avatar</div>
      </div>
    </header>
  );
};

export const Layout = () => {
  return (
    <div className='relative isolate'>
      <Navigation />
      <div className='flex max-w-7xl w-full mx-auto flex-1 flex-col gap-4 p-3 lg:p-6 '>
        <div>
          <svg
            aria-hidden='true'
            className='absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-primary/10'
          >
            <defs>
              <pattern
                x='50%'
                y={-1}
                id='0787a7c5-978c-4f66-83c7-11c213f99cb7'
                width={200}
                height={200}
                patternUnits='userSpaceOnUse'
              >
                <path d='M.5 200V.5H200' fill='none' />
              </pattern>
            </defs>
            <rect
              fill='url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)'
              width='100%'
              height='100%'
              strokeWidth={0}
            />
          </svg>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
