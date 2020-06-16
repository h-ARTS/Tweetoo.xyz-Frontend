import axios from 'axios';
import { useMutation, queryCache } from 'react-query';

function updateLike(oldData, mutation) {
  if (oldData == null) return;

  if (!mutation.isLiked) {
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
    mutation => {
      return mutation.isLiked
        ? axios.put(`/api/tweet/${mutation.tweet._id}/unlike`)
        : axios.put(`/api/tweet/${mutation.tweet._id}/like`);
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
          return updateLike(old, mutation);
        });

        return previousTweet;
      },
      onSettled: (data, error, variables) => {
        queryCache.invalidateQueries(['tweet', variables.tweet._id]);
        queryCache.invalidateQueries('liked-tweets');
      }
    }
  );

  return mutateLike;
}
