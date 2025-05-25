import { Copy, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { formatDistanceToNowStrict } from 'date-fns';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LinkDetails } from './link-details';
import { toast } from 'sonner';
import type { ShortUrl } from '@/types/link';

export function LinkRow({ link }: { link: ShortUrl }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const copyToClipboard = async (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(`${link.shortUrl}`);
    toast.success('Copied to clipboard');
  };

  const handleViewAnalytics = () => {
    setIsAnalyticsOpen(true);
  };

  const fallbackLetter = link.shortUrl.split('/')[1]?.[0]?.toUpperCase() || 'D';

  return (
    <>
      {isMobile ? (
        <Drawer open={isAnalyticsOpen} onOpenChange={setIsAnalyticsOpen}>
          <DrawerContent className='  h-[90vh]'>
            <div className='lg:max-w-md overflow-auto w-full mx-auto px-4'>
              <DrawerHeader className='md:pt-10 border-b px-0'>
                <DrawerTitle>
                  Analytics for {isMobile ? link.shortcode : link.shortUrl}
                </DrawerTitle>
                <DrawerDescription>
                  Detailed analytics and insights for your shortened link
                </DrawerDescription>
              </DrawerHeader>
              <div className='pb-8'>
                <LinkDetails link={link} />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet open={isAnalyticsOpen} onOpenChange={setIsAnalyticsOpen}>
          <SheetContent
            side='right'
            className='w-[800px] sm:max-w-[800px] overflow-y-auto '
          >
            <SheetHeader className='border-b'>
              <SheetTitle>Analytics for {link.originalUrl}</SheetTitle>
              <SheetDescription>
                Detailed analytics and insights for your shortened link
              </SheetDescription>
            </SheetHeader>
            <div className='p-4'>
              <LinkDetails link={link} />
            </div>
          </SheetContent>
        </Sheet>
      )}
      <div
        onClick={handleViewAnalytics}
        className='flex items-center justify-between p-3 md:p-4 hover:bg-primary-foreground border-b last:border-b-0'
      >
        <div className='flex items-center gap-2'>
          <div className='flex items-center'>
            <Avatar className='size-6 md:size-8 mr-2'>
              <AvatarImage src={link.metaTags.favicon} alt='Profile' />
              <AvatarFallback>{fallbackLetter}</AvatarFallback>
            </Avatar>
            <a
              onClick={(e) => e.stopPropagation()}
              target='_blank'
              href={link.shortUrl}
              className='font-semibold text-base hover:border-b-2 border-foreground'
            >
              {isMobile ? link.shortcode : link.shortUrl}
            </a>
            <Button
              variant='ghost'
              size='icon'
              className='h-6 w-6 ml-4 hidden md:block'
              onClick={copyToClipboard}
            >
              <Copy className='h-3.5 w-3.5' />
              <span className='sr-only'>Copy link</span>
            </Button>
          </div>
          <span className='text-gray-500'>→</span>

          <span className='text-gray-500 max-w-18 truncate lg:max-w-96'>
            {link.originalUrl}
          </span>
        </div>
        <div className='flex items-center gap-4 '>
          <div className='md:flex items-center gap-1 hidden'>
            <span className='text-sm text-gray-500 border px-2 py-1 rounded-md'>
              {link.clicks} {link.clicks > 1 ? 'clicks' : 'click'}
            </span>
          </div>
          <span className='text-muted-foreground hidden mb:block text-sm font-medium'>
            {formatDistanceToNowStrict(link.createdAt)}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <MoreVertical className='h-4 w-4' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={copyToClipboard}>
                Copy link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleViewAnalytics}>
                View analytics
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
