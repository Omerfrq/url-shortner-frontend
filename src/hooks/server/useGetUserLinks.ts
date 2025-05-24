import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { QUERY_KEYS } from './const';
import { AxiosErrorValidate } from '@/lib/utils';

export interface ShortUrl {
  id: string;
  shortcode: string;
  domain: string;
  deviceId: string;
  originalUrl: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
  shortUrl: string;
  metaTags: {
    title?: string;
    description?: string;
    favicon?: string;
    ogImage?: string;
  };
}

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
