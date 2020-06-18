import axios from 'axios';
import { useMutation, queryCache } from 'react-query';

export default function useDeleteReply() {
  const [mutate] = useMutation(
    mutation => axios.delete(`/api/reply/?replyId=${mutation.replyId}`),
    {
      onSettled: (data, error, { replyId }) => {
        queryCache.invalidateQueries('replies');
        queryCache.removeQueries(['reply', replyId]);
      }
    }
  );

  return mutate;
}
