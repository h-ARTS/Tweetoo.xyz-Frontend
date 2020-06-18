import axios from 'axios';
import { useMutation, queryCache } from 'react-query';

export default function useMutateMarkAllRead() {
  const [mutate] = useMutation(
    mutation => axios.put('/api/notifications', { read: true }),
    {
      onMutate: mutation => {
        queryCache.cancelQueries('notifications');

        let updated;
        const notifications = queryCache.getQueryData('notifications');

        if (!notifications) return;

        updated = notifications.map(notify => {
          notify.read = true;
          return notify;
        });

        return updated;
      },
      onSettled: (data, error, variables) => {
        queryCache.invalidateQueries('notifications');
      }
    }
  );

  return mutate;
}
