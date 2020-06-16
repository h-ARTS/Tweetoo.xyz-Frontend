import axios from 'axios';
import { useMutation, queryCache } from 'react-query';

export default function useCreateTweet() {
  const [mutate] = useMutation(postBody => axios.post('/api/tweet', postBody), {
    onSuccess: () => {
      queryCache.invalidateQueries('tweets');
    }
  });

  return mutate;
}
