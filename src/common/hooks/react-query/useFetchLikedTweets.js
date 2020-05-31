import axios from 'axios';
import { useQuery } from 'react-query';
import isLikedPipe from '../../utils/isLikedPipe';

export default function useFetchLikedTweets() {
  const { status, data } = useQuery(
    'liked-tweets',
    async () => {
      const response = await axios.get('/api/tweets');

      let tweets = await isLikedPipe(response.data);

      return tweets
        .filter(tweet => tweet.isLiked === true)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    { retry: 4, refetchOnMount: true }
  );

  return { status, data };
}
