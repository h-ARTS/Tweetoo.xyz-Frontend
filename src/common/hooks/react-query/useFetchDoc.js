import { useQuery } from 'react-query';
import axios from 'axios';
import isLikedPipe from '../../utils/isLikedPipe';
import isRetweetPipe from '../../utils/isRetweetPipe';
import isBookmarkPipe from '../../utils/isBookmarkPipe';

export default function useFetchDoc(tweet) {
  async function fetchDoc(key, _id) {
    const response = tweet.hasOwnProperty('tweetId')
      ? await axios.get(`/api/reply/?id=${_id}`)
      : await axios.get(`/api/tweet/?id=${_id}`);

    let filteredTweets = await isLikedPipe([response.data]);
    filteredTweets = await isBookmarkPipe([response.data]);
    filteredTweets = isRetweetPipe(filteredTweets);

    return filteredTweets[0];
  }

  const queryName = tweet.hasOwnProperty('tweetId') ? 'reply' : 'tweet';
  const { status, data, error, refetch } = useQuery(
    [queryName, tweet._id],
    fetchDoc
  );

  return { status, data, error, refetch };
}
