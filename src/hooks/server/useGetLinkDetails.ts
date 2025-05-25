import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { QUERY_KEYS } from './const';
import { AxiosErrorValidate } from '@/lib/utils';
import type { ShortUrlDetails } from '@/types/link';

const fetchUrl = async (id: string) => {
  try {
    const response = await api.get<{ link: ShortUrlDetails }>(`/urls/${id}`);
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
