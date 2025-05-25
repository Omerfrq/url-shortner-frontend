import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { QUERY_KEYS } from './const';
import { AxiosErrorValidate } from '@/lib/utils';
import type { ShortUrl } from '@/types/link';

const fetchUrls = async () => {
  try {
    const response = await api.get<{ links: ShortUrl[] }>('/urls');
    return response.data?.links;
  } catch (err) {
    throw AxiosErrorValidate(err);
  }
};

export const useGetUserLinks = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FETCH_USER_LINKS],
    queryFn: fetchUrls,
    refetchInterval: 1000 * 60, // 5 minutes
  });
};
