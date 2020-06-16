import axios from 'axios';
import { useMutation, queryCache } from 'react-query';

export default function useCreateReply() {
  const [mutate] = useMutation(
    ({ fullText, tweetId }) =>
      axios.post(`/api/reply/?tweetId=${tweetId}`, {
        fullText
      }),
    {
      onSuccess: () => queryCache.invalidateQueries('replies')
    }
  );

  return mutate;
}
