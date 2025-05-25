import UrlShortenerForm from '@/components/links/form';
import { Links } from '@/components/links/links';

export const Home = () => {
  return (
    <div className=' space-y-10'>
      <div className='max-w-lg flex items-center justify-center flex-col h-[50vh] mt-20 mx-auto text-center space-y-4'>
        <h1 className='text-3xl leading-7 sm:text-4xl sm:leading-5 font-medium'>
          Short links with super powers
        </h1>
        <p className='text-muted-foreground font-light text-base sm:text-xl'>
          Smi is the modern link management platform for entrepreneurs,
          creators, and growth teams
        </p>
        <UrlShortenerForm />
      </div>

      <Links />
    </div>
  );
};
