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

export const LinkDetails = ({ link }: { link: ShortUrl }) => {
  const { data: details } = useGetLinkDetails({ id: link.id });

  const logs = details?.visits || [];

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
          {logs?.map((visit) => (
            <TableRow>
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
