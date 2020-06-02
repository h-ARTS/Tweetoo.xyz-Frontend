import axios from 'axios';
import { useQuery } from 'react-query';
import isLikedPipe from '../../utils/isLikedPipe';
import isRetweetPipe from '../../utils/isRetweetPipe';
import isBookmarkPipe from '../../utils/isBookmarkPipe';

export default function useFetchReplies(tweetId) {
  async function fetchReplies() {
    const response = await axios.get(`/api/reply/${tweetId}`);

    let filteredReplies = await isLikedPipe(response.data);
    filteredReplies = await isBookmarkPipe(filteredReplies);
    filteredReplies = isRetweetPipe(filteredReplies);

    return filteredReplies.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  const { status, data } = useQuery('replies', fetchReplies, {
    retry: 4,
    refetchOnMount: true
  });

  return { status, data };
}
