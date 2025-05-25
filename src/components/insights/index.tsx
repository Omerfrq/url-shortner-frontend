import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import type { Visit } from '@/types/link';

function getBrowserStats(visits: Visit[]) {
  const browserCounts: Record<string, number> = {};

  for (const visit of visits) {
    // Extract the browser name (ignore version)
    const browser = visit.browser;
    browserCounts[browser] = (browserCounts[browser] || 0) + 1;
  }

  const browsers = Object.entries(browserCounts).map(([browser, count]) => ({
    browser,
    count,
  }));

  return browsers;
}

function getOSStats(visits: Visit[]) {
  const osCounts: Record<string, number> = {};

  for (const visit of visits) {
    const os = visit.os.split(' ')[0]; // Ignore version
    osCounts[os] = (osCounts[os] || 0) + 1;
  }

  const osList = Object.entries(osCounts).map(([os, count]) => ({
    os,
    count,
  }));

  return osList;
}

function getVisitCountByPlatform(visits: Visit[]) {
  const counts: Record<string, number> = {};

  for (const visit of visits) {
    const platform = visit.platform;
    counts[platform] = (counts[platform] || 0) + 1;
  }

  return Object.entries(counts).map(([platform, count]) => ({
    platform,
    count,
  }));
}

function getReferrerStats(visits: Visit[]) {
  const referrerCounts: Record<string, number> = {};

  for (const visit of visits) {
    const ref = visit.referrer || 'Direct'; // Default to "Direct" if no referrer
    referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
  }

  const referrerList = Object.entries(referrerCounts).map(
    ([referrer, count]) => ({
      referrer,
      count,
    })
  );

  return referrerList;
}

const tabs = [
  {
    name: 'Devices',
  },
  {
    name: 'Browsers',
  },
  {
    name: 'OS',
  },
  {
    name: 'Referrer',
  },
];

export const Insights = ({ visits }: { visits?: Visit[] }) => {
  const [currentTab, setCurrentTab] = useState('Devices');

  const platforms =
    visits && visits?.length >= 1 ? getVisitCountByPlatform(visits) : [];

  const browserStats =
    visits && visits?.length >= 1 ? getBrowserStats(visits) : [];

  const osStats = visits && visits?.length >= 1 ? getOSStats(visits) : [];

  const referrerStats =
    visits && visits.length >= 1 ? getReferrerStats(visits) : [];
  return (
    <Card className='px-4 pt-1 min-h-96'>
      <CardContent className='p-0'>
        <div className='border-b border-primary/10'>
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

        {currentTab === 'Devices' ? (
          <div className='mt-6 space-y-3'>
            {platforms?.map((platform) => (
              <div className='py-2 px-6 rounded-md font-semibold text-sm flex justify-between bg-green-100'>
                <div className='flex items-center'>
                  <span>{platform.platform}</span>
                </div>
                <div>{platform.count}</div>
              </div>
            ))}
          </div>
        ) : currentTab === 'Browsers' ? (
          <div className='mt-6 space-y-3'>
            {browserStats?.map((platform) => (
              <div className='py-2 px-6 rounded-md font-semibold text-sm flex justify-between bg-blue-50'>
                <div className='flex items-center'>
                  <span>{platform.browser}</span>
                </div>
                <div>{platform.count}</div>
              </div>
            ))}
          </div>
        ) : currentTab === 'OS' ? (
          <div className='mt-6 space-y-3'>
            {osStats?.map((platform) => (
              <div className='py-2 px-6 rounded-md font-semibold text-sm flex justify-between bg-orange-100'>
                <div className='flex items-center'>
                  <span>{platform.os}</span>
                </div>
                <div>{platform.count}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className='mt-6 space-y-3'>
            {referrerStats?.map((stat) => (
              <div className='py-2 px-6 rounded-md font-semibold text-sm flex justify-between bg-red-100/90'>
                <div className='flex items-center'>
                  <span>{stat.referrer}</span>
                </div>
                <div>{stat.count}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
