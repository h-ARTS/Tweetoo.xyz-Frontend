import axios from 'axios';
import { useQuery } from 'react-query';

export default function useFetchUser(handle) {
  const { status, data, error, refetch } = useQuery(
    ['user', handle],
    async () => {
      const response = await axios.get(`/api/user/${handle}`);

      return response.data;
    },
    { retry: 4, refetchOnMount: true }
  );

  return { status, data, error, refetch };
}
