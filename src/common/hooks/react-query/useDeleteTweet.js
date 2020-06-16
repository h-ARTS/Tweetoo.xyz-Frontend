import axios from 'axios';
import { useMutation, queryCache } from 'react-query';

export default function useDeleteTweet() {
  const [mutate] = useMutation(
    mutation => axios.delete(`/api/tweet/${mutation.tweetId}`),
    {
      onSettled: (data, error, { tweetId }) => {
        queryCache.invalidateQueries('tweets');
        queryCache.removeQueries(['tweet', tweetId]);
      }
    }
  );

  return mutate;
}
