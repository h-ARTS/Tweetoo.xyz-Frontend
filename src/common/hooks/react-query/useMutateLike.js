import axios from 'axios';
import { useMutation, queryCache } from 'react-query';

function updateLike(oldData, mutation) {
  if (oldData == null) return;

  if (mutation.type === 'like') {
    mutation.tweet.isLiked = true;
    mutation.tweet.likeCount++;
  } else {
    mutation.tweet.isLiked = false;
    mutation.tweet.likeCount--;
  }

  return mutation.tweet;
}

export default function useMutateLike() {
  const [mutateLike] = useMutation(
    mutation => axios.put(`/api/tweet/${mutation.tweet._id}/${mutation.type}`),
    {
      // TODO: Figure out how to mutate without jumping numbers in the UI
      onMutate: mutation => {
        queryCache.cancelQueries(['tweet', mutation.tweet._id]);

        const previousTweet = queryCache.getQueryData([
          'tweet',
          mutation.tweet._id
        ]);

        queryCache.setQueryData(['tweet', mutation.tweet._id], old => {
          return updateLike(old, mutation);
        });

        return previousTweet;
      },
      onSettled: (data, error, variables) => {
        queryCache.refetchQueries(['tweet', variables.tweet._id]);
      }
    }
  );

  return mutateLike;
}
