import axios from 'axios';
import { useMutation, queryCache } from 'react-query';

function updateRetweet(oldData, mutation) {
  if (oldData == null) return;

  if (mutation.type === 'like') {
    mutation.tweet.isRetweet = true;
    mutation.tweet.retweetCount++;
  } else {
    mutation.tweet.isRetweet = false;
    mutation.tweet.retweetCount--;
  }

  return mutation.tweet;
}

export default function useMutateRetweet() {
  const [mutateRetweet] = useMutation(
    mutation => {
      return mutation.type === 'retweet'
        ? axios.post(`/api/tweet/${mutation.tweet._id}/retweet`)
        : axios.delete(`/api/tweet/${mutation.tweet._id}/undoretweet`);
    },
    {
      // TODO: Figure out how to mutate without jumping numbers in the UI
      onMutate: mutation => {
        queryCache.cancelQueries(['tweet', mutation.tweet._id]);

        const previousTweet = queryCache.getQueryData([
          'tweet',
          mutation.tweet._id
        ]);

        queryCache.setQueryData(['tweet', mutation.tweet._id], old => {
          return updateRetweet(old, mutation);
        });

        return previousTweet;
      },
      onSettled: (data, error, variables) => {
        queryCache.refetchQueries(['tweet', variables.tweet._id]);
      }
    }
  );

  return mutateRetweet;
}
