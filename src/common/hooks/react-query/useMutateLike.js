import axios from 'axios';
import { useMutation, queryCache } from 'react-query';

export default function useMutateLike() {
  const [mutateLike] = useMutation(
    mutation => {
      return axios.put(`/api/tweet/${mutation.tweet._id}/${mutation.type}`);
    },
    {
      onMutate: mutation => {
        queryCache.cancelQueries('tweetsMedia');

        const previousTweetsMedia = queryCache.getQueryData('tweetsMedia');

        queryCache.setQueryData('tweetsMedia', old => {
          if (old == null) return;
          const filtered = old.filter(tweet => tweet._id === mutation._id);

          if (mutation.type === 'like') {
            mutation.tweet.isLiked = true;
            mutation.tweet.likeCount++;
          } else {
            mutation.tweet.isLiked = false;
            mutation.tweet.likeCount--;
          }

          return [...filtered, mutation.tweet];
        });

        return previousTweetsMedia;
      },
      onSettled: () => {
        queryCache.refetchQueries('tweetsMedia');
      }
    }
  );

  return mutateLike;
}
