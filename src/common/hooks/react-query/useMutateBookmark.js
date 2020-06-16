import axios from 'axios';
import { useMutation, queryCache } from 'react-query';

function updateBookmark(oldData, mutation) {
  if (oldData == null) return;

  if (!mutation.isBookmark) mutation.tweet.isBookmark = true;
  else mutation.tweet.isBookmark = false;

  return mutation.tweet;
}

export default function useMutateBookmark() {
  const [mutateBookmark] = useMutation(
    mutation => {
      return mutation.isBookmark
        ? axios.delete(`/api/bookmarks?tweetId=${mutation.tweet._id}`)
        : axios.post('/api/bookmarks', { tweetId: mutation.tweet._id });
    },
    {
      onMutate: mutation => {
        queryCache.cancelQueries(['tweet', mutation.tweet._id]);

        const previousTweet = queryCache.getQueryData([
          'tweet',
          mutation.tweet._id
        ]);

        queryCache.setQueryData(['tweet', mutation.tweet._id], old => {
          return updateBookmark(old, mutation);
        });

        return previousTweet;
      },
      onSettled: (data, error, variables) => {
        queryCache.invalidateQueries(['tweet', variables.tweet._id]);
        queryCache.invalidateQueries('bookmarks');
      }
    }
  );

  return mutateBookmark;
}
