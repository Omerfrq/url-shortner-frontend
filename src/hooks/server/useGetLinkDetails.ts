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
  visits: {
    timestamp: Date;
    country?: string;
    city?: string;
    referrer?: string;
    deviceType?: string;
    browser?: string;
    os?: string;
    platform?: string;
    ip?: string;
    id: string;
  }[];
}

const fetchUrl = async (id: string) => {
  try {
    const response = await api.get<{ link: ShortUrl }>(`/urls/${id}`);
    return response.data?.link;
  } catch (err) {
    throw AxiosErrorValidate(err);
  }
};

export const useGetLinkDetails = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FETCH_USER_LINK_DETAILS, id],
    queryFn: () => fetchUrl(id),
  });
};
