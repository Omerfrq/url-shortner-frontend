import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatUrl, isValidUrl } from '@/lib/utils';
import { toast } from 'sonner';
import { useCreateLink } from '@/hooks/server/useCreateLink';

// Define the Zod schema for URL validation
const urlSchema = z.object({
  url: z
    .string()
    .min(1, 'URL is required')
    .refine((url) => isValidUrl(url), {
      message:
        'Please enter a valid URL with a domain extension (e.g., .com, .net)',
    }),
});

// Infer the type from the schema
type FormValues = z.infer<typeof urlSchema>;

export default function UrlShortenerForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: '',
    },
  });

  const mutation = useCreateLink();

  const onSubmit = (data: FormValues) => {
    // Use toast.promise with the mutation
    toast.promise(
      mutation.mutateAsync(
        {
          originalUrl: formatUrl(data.url),
          domain: window.origin,
        },
        {
          onSuccess: () => {
            reset();
          },
        }
      ),
      {
        description: `We are shortening`,
        position: 'top-right',
        loading: 'Shortening your URL...',
        success: 'URL shortened successfully!',
        error: (err) =>
          err.message || 'Failed to shorten URL. Please try again.',
      }
    );
  };

  return (
    <div className='w-full max-w-3xl mx-auto text-left -z-0'>
      <form className='w-full pt-10' onSubmit={handleSubmit(onSubmit)}>
        <div className=' flex flex-col items-start  rounded-xl border border-neutral-200 bg-background px-2 pb-2 drop-shadow-md transition-all focus-within:ring ring-primary/30 focus-within:border-primary focus-within:ring-primary/30 sm:flex-row sm:items-center sm:pb-0 sm:pl-4 sm:pr-3'>
          <label className='flex w-full grow p-1 items-center sm:w-auto'>
            <span className='sr-only'>Destination URL</span>
            <Link className='text-foreground size-5' />

            <input
              placeholder='Shorten any link...'
              autoComplete='off'
              className=' block h-12  w-full rounded-r-xl border-0 px-2 text-base placeholder:text-neutral-400 focus:border-0 focus:border-neutral-800 focus:outline-none focus:ring-0 focus:ring-neutral-800 sm:h-14 sm:px-3'
              {...register('url')}
            />
          </label>
          <div className='flex w-full shrink-0 items-center justify-center pt-1 sm:w-auto sm:pl-1 sm:pt-0'>
            <Button
              className='w-full'
              type='submit'
              disabled={mutation.isPending || !!errors.url?.message}
            >
              {mutation.isPending ? 'Shortening...' : 'Shorten link'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
