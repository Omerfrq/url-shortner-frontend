import { useGetLinkDetails } from '@/hooks/server/useGetLinkDetails';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const tabs = [{ name: 'Events' }, { name: 'Preview' }, { name: 'Insights' }];

import { Insights } from '../insights';
import { MetaTagPreview } from '../meta-tags/preview';
import { LinkEvents } from '../events/link-events';
import type { ShortUrl } from '@/types/link';

export const LinkDetails = ({ link }: { link: ShortUrl }) => {
  const { data: details, isPending } = useGetLinkDetails({ id: link.id });
  const [currentTab, setCurrentTab] = useState('Events');

  if (isPending) {
    return (
      <div className='mt-6 space-y-6 border rounded-md'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Browser</TableHead>
              <TableHead>OS</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Referrer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className='h-4 w-24' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-20' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-20' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-20' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-32' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div>
      <div className='border-b border-gray-200'>
        <nav aria-label='Tabs' className='-mb-px flex space-x-8'>
          {tabs.map((tab) => (
            <button
              type='button'
              key={tab.name}
              onClick={() => setCurrentTab(tab.name)}
              className={cn(
                'border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap',
                currentTab === tab.name
                  ? 'border-primary text-primary'
                  : 'border-transparent text-primary hover:border-muted'
              )}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      {currentTab === 'Events' ? (
        <LinkEvents events={details?.visits} />
      ) : currentTab === 'Preview' ? (
        <div className='my-10 w-full lg:max-w-sm mx-auto'>
          <MetaTagPreview metaTags={details?.metaTags} />
        </div>
      ) : currentTab === 'Insights' ? (
        <div className='mt-10  gap-4'>
          <Insights visits={details?.visits} />
        </div>
      ) : null}
    </div>
  );
};
