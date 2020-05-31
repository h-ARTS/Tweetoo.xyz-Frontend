import axios from 'axios';
import { useQuery } from 'react-query';

export default function useFetchMediaTweets(handle) {
  const { status, data } = useQuery('media-tweets', async () => {
    const response = await axios.get('/api/tweets');

    return response.data
      .filter(tweet => tweet.tweetImages.length > 0 && tweet.handle === handle)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  });

  return { status, data };
}
