import type { ShortUrl } from '@/hooks/server/useGetUserLinks';
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

import React from 'react';
import { Devices } from '../charts/devices';

interface MetaTags {
  title?: string;
  description?: string;
  favicon?: string;
  ogImage?: string;
}

const MetaTagPreview: React.FC<{ metaTags?: MetaTags }> = ({ metaTags }) => {
  if (!metaTags) {
    return (
      <div className='text-center'>
        <h3 className='mt-2 text-sm font-semibold text-gray-900'>
          No Preview Available!
        </h3>
      </div>
    );
  }

  return (
    <div className='max-w-xl mx-auto border rounded-2xl overflow-hidden shadow-lg bg-white'>
      <div className='relative h-48 w-full bg-gray-200'>
        <img
          src={metaTags.ogImage}
          alt='Open Graph'
          className='w-full h-full object-cover'
        />
      </div>

      <div className='p-4'>
        <div className='flex items-center space-x-2 mb-2'>
          <img src={metaTags.favicon} alt='favicon' className='w-5 h-5' />
          <span className='text-xs text-gray-500'>omerfarooq.net</span>
        </div>

        <h2 className='text-lg font-semibold text-gray-900'>
          {metaTags.title}
        </h2>

        <p className='text-sm text-gray-600 mt-1'>{metaTags.description}</p>
      </div>
    </div>
  );
};

export const LinkDetails = ({ link }: { link: ShortUrl }) => {
  const { data: details, isPending } = useGetLinkDetails({ id: link.id });
  const [currentTab, setCurrentTab] = useState('Events');

  const logs = details?.visits || [];

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

  if (!isPending && logs?.length === 0) {
    return (
      <div className='text-center'>
        <h3 className='mt-2 text-sm font-semibold text-gray-900'>
          No Events Yet!
        </h3>
        <p className='mt-1 text-sm text-gray-500'>
          Events will show up when the shortlink is clicked.
        </p>
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
        <div className={'mt-6 space-y-6 border rounded-md'}>
          {logs?.length === 0 ? (
            <div className='text-center'>
              <h3 className='mt-2 text-sm font-semibold text-gray-900'>
                No Events Yet!
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Events will show up when the shortlink is clicked.
              </p>
            </div>
          ) : (
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
                {logs?.map((visit) => (
                  <TableRow key={visit._id}>
                    <TableCell>
                      {new Date(visit.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell className='capitalize'>
                      {visit.browser}
                    </TableCell>
                    <TableCell className='capitalize'>{visit.os}</TableCell>
                    <TableCell className='capitalize'>
                      {visit.deviceType}
                    </TableCell>
                    <TableCell>{visit.referrer}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      ) : currentTab === 'Preview' ? (
        <div className='my-10 w-full lg:max-w-sm mx-auto'>
          <MetaTagPreview metaTags={details?.metaTags} />
        </div>
      ) : currentTab === 'Insights' ? (
        <div className='mt-10  gap-4'>
          <Devices data={details} />
        </div>
      ) : null}
    </div>
  );
};
