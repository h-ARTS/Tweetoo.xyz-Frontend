import axios from 'axios';
import { useQuery } from 'react-query';

export default function useFetchNotifications() {
  async function fetchNotifications() {
    const notifications = await axios.get('/api/notifications');

    return notifications.data;
  }

  const { status, data, error } = useQuery(
    'notifications',
    fetchNotifications,
    {
      refetchInterval: 10000
    }
  );

  return { status, data, error };
}
