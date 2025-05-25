import type { Visit } from '@/types/link';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../ui/table';

export const LinkEvents = ({ events }: { events?: Visit[] }) => {
  if (events?.length === 0) {
    return (
      <div className='text-center mt-6'>
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
    <div className={'mt-6 space-y-6 border rounded-md'}>
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
          {events?.map((visit) => (
            <TableRow key={visit._id}>
              <TableCell>
                {new Date(visit.timestamp).toLocaleString()}
              </TableCell>
              <TableCell className='capitalize'>{visit.browser}</TableCell>
              <TableCell className='capitalize'>{visit.os}</TableCell>
              <TableCell className='capitalize'>{visit.deviceType}</TableCell>
              <TableCell>{visit.referrer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
