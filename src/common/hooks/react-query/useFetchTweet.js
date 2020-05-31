import { useQuery } from 'react-query';
import axios from 'axios';
import isLikedPipe from '../../utils/isLikedPipe';
import isRetweetPipe from '../../utils/isRetweetPipe';
import isBookmarkPipe from '../../utils/isBookmarkPipe';

export default function useFetchTweet(_id) {
  async function fetchTweet(key, _id) {
    const response = await axios.get(`/api/tweet/?id=${_id}`);

    let filteredTweets = await isLikedPipe([response.data]);
    filteredTweets = await isBookmarkPipe([response.data]);
    filteredTweets = isRetweetPipe(filteredTweets);

    return filteredTweets[0];
  }

  const { status, data, error, refetch } = useQuery(['tweet', _id], fetchTweet);

  return [status, data, error, refetch];
}
