import axios from 'axios';
import { useQuery } from 'react-query';

export default function useFetchUserTweets(userTweets) {
  const { status, data } = useQuery(
    'user-tweets',
    async () => {
      const response = await axios.get('/api/tweets');

      return response.data
        .filter(function(tweet) {
          return this.find(t => t.tweetId === tweet._id);
        }, userTweets)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    { retry: 4, refetchOnMount: true }
  );

  return { status, data };
}
