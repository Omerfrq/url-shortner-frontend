import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { AxiosErrorValidate } from '@/lib/utils';
import { QUERY_KEYS } from './const';

interface CreateLinkSchema {
  originalUrl: string;
  domain: string;
}

const createLink = async (body: CreateLinkSchema) => {
  try {
    const response = await api.post('/urls', body);
    return response.data;
  } catch (err) {
    throw AxiosErrorValidate(err);
  }
};

export const useCreateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateLinkSchema) => createLink(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FETCH_USER_LINKS],
      });
    },
  });
};
