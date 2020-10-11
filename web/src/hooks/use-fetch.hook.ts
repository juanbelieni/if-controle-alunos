import useSWR from 'swr';

import api from '../services/api.service';

export default function useFetch<T>(
  path: string,
  serializeData: (responseData: any) => T = (responseData) => responseData,
): [T | undefined, boolean, () => Promise<boolean>] {
  const { data, isValidating, revalidate } = useSWR(
    path,
    async (path): Promise<T> => {
      const response = await api.get(path);
      return serializeData(response.data) as T;
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  );

  return [data, isValidating, revalidate];
}
